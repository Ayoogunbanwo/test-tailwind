import React, { useState, useRef } from "react";
import { LoadScript, Autocomplete } from "@react-google-maps/api";

const libraries = ["places"];

const AddressInput = ({ setAddress }) => {
  const [autocomplete, setAutocomplete] = useState(null);
  const inputRef = useRef(null);

  const handlePlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      const addressComponents = place.address_components;

      if (!addressComponents || addressComponents.length === 0) {
        console.error("Address components not found.");
        return;
      }

      const getAddressComponent = (type) => {
        const component = addressComponents.find((c) => c.types.includes(type));
        return component ? component.long_name : "";
      };

      const street = `${getAddressComponent("street_number")} ${getAddressComponent("route")}`.trim();
      const apartment = getAddressComponent("subpremise");
      const province = getAddressComponent("administrative_area_level_1");
      const country = getAddressComponent("country");

      setAddress({
        street,
        apartment,
        province,
        country,
      });
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  const onLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} libraries={libraries}>
      <div className="space-y-2">
        {/* Autocomplete for address input */}
        <Autocomplete onLoad={onLoad} onPlaceChanged={handlePlaceChanged}>
          <input
            type="text"
            placeholder="Enter a location"
            ref={inputRef}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </Autocomplete>
      </div>
    </LoadScript>
  );
};

export default AddressInput;
