import React, { useState, useRef } from "react";
import { LoadScript, Autocomplete } from "@react-google-maps/api";

const libraries = ["places"];

const AddressInput = () => {
  const [autocomplete, setAutocomplete] = useState(null);
  const [address, setAddress] = useState({
    street: "",
    apartment: "",
    province: "",
    country: "",
  });

  const inputRef = useRef(null);

  const handlePlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      const addressComponents = place.address_components;

      // Helper function to get the address component of a specific type
      const getAddressComponent = (type) => {
        const component = addressComponents?.find((c) =>
          c.types.includes(type)
        );
        return component ? component.long_name : "";
      };

      setAddress({
        street: `${getAddressComponent("street_number")} ${getAddressComponent(
          "route"
        )}`.trim(),
        apartment: getAddressComponent("subpremise"),
        province: getAddressComponent("administrative_area_level_1"),
        country: getAddressComponent("country"),
      });
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  const onLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  return (
    <LoadScript
         googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
         libraries={libraries}
    >
      <div className="space-y-2">
        <Autocomplete onLoad={onLoad} onPlaceChanged={handlePlaceChanged}>
          <input
            type="text"
            placeholder="Enter a location"
            ref={inputRef}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </Autocomplete>

        <input
          type="text"
          value={address.apartment}
          onChange={(e) => setAddress({ ...address, apartment: e.target.value })}
          placeholder="Apartment Number"
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />

        <div className="flex space-x-2">
          <input
            type="text"
            value={address.province}
            onChange={(e) =>
              setAddress({ ...address, province: e.target.value })
            }
            placeholder="Province"
            className="w-1/2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            type="text"
            value={address.country}
            onChange={(e) =>
              setAddress({ ...address, country: e.target.value })
            }
            placeholder="Country"
            className="w-1/2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>
    </LoadScript>
  );
};

export default AddressInput;
