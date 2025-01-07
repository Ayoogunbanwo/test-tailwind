import React, { useState, useRef } from "react";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import { 
  MapPin, 
  Home, 
  Building, 
  CircleUserRound, 
  Map,
  MailPlus,
  Globe 
} from "lucide-react";

const libraries = ["places"];

const FormField = ({ label, icon: Icon, value, readOnly = true, onChange }) => (
  <div className="mb-4">
    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
      <Icon className="w-4 h-4 mr-2 text-teal-500" />
      {label}
    </label>
    <input
      type="text"
      value={value || ""}
      readOnly={readOnly}
      onChange={onChange}
      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50"
    />
  </div>
);

const AddressInput = ({ setAddress }) => {
  const [autocomplete, setAutocomplete] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [basePostalCode, setBasePostalCode] = useState("");
  const [addressFields, setAddressFields] = useState({
    street: "",
    apartment: "",
    city: "",
    province: "",
    postalCode: "",
    country: "",
    formatted: ""
  });
  const inputRef = useRef(null);

  const handleApartmentChange = (e) => {
    const newApartment = e.target.value;
    const newAddressFields = {
      ...addressFields,
      apartment: newApartment,
      postalCode: basePostalCode // Always use the base postal code
    };
    
    setAddressFields(newAddressFields);
    setAddress({
      ...newAddressFields,
      formatted: `${addressFields.street}${newApartment ? ` Unit ${newApartment}, ` : ', '}${addressFields.city}, ${addressFields.province} ${basePostalCode}, ${addressFields.country}`
    });
  };

  const fetchBasePostalCode = async (lat, lng) => {
    try {
      // Create a new geocoder instance
      const geocoder = new window.google.maps.Geocoder();
      
      // Request without unit number
      const response = await new Promise((resolve, reject) => {
        geocoder.geocode({
          location: { lat, lng }
        }, (results, status) => {
          if (status === 'OK') {
            resolve(results);
          } else {
            reject(status);
          }
        });
      });

      // Find the postal code from the base address
      const baseAddress = response.find(result => 
        result.types.includes('street_address') || 
        result.types.includes('premise')
      );

      if (baseAddress) {
        const postalComponent = baseAddress.address_components.find(
          component => component.types.includes('postal_code')
        );
        return postalComponent ? postalComponent.long_name : "";
      }

      return "";
    } catch (error) {
      console.error('Error fetching base postal code:', error);
      return "";
    }
  };

  const handlePlaceChanged = async () => {
    if (!autocomplete) {
      setError("Address lookup service is not available");
      return;
    }

    try {
      const place = autocomplete.getPlace();
      
      if (!place.geometry) {
        setError("Please select an address from the dropdown");
        return;
      }

      const addressComponents = place.address_components;

      if (!addressComponents?.length) {
        setError("Invalid address selected");
        return;
      }

      const getAddressComponent = (type) => {
        const component = addressComponents.find((c) => c.types.includes(type));
        return component ? component.long_name : "";
      };

      const getShortAddressComponent = (type) => {
        const component = addressComponents.find((c) => c.types.includes(type));
        return component ? component.short_name : "";
      };

      // Get street address components
      const streetNumber = getAddressComponent("street_number");
      const route = getAddressComponent("route");
      const street = `${streetNumber} ${route}`.trim();
      
      // Get base postal code
      const postal = await fetchBasePostalCode(
        place.geometry.location.lat(),
        place.geometry.location.lng()
      );
      
      setBasePostalCode(postal);

      // Extract apartment/unit number from the formatted address if present
      const formattedAddress = place.formatted_address;
      const apartmentMatch = formattedAddress.match(/(#|Unit|Suite|Apt)\s*\d+/i);
      const apartment = apartmentMatch ? apartmentMatch[0] : "";

      const newAddressFields = {
        street,
        apartment,
        city: getAddressComponent("locality"),
        province: getShortAddressComponent("administrative_area_level_1"),
        postalCode: postal,
        country: getAddressComponent("country"),
        formatted: formattedAddress
      };

      setAddressFields(newAddressFields);
      setAddress({
        ...newAddressFields,
        coordinates: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        }
      });

      setError("");
    } catch (err) {
      setError("Failed to process the selected address");
      console.error("Place changed error:", err);
    }
  };

  const onLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <LoadScript 
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} 
        libraries={libraries}
      >
        <div className="mb-6">
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <MapPin className="w-4 h-4 mr-2 text-teal-500" />
            Search Address
          </label>
          <Autocomplete
            onLoad={onLoad}
            onPlaceChanged={handlePlaceChanged}
            restrictions={{ country: ["us", "ca"] }}
            fields={["address_components", "geometry", "formatted_address"]}
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Enter your address"
                ref={inputRef}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              {isLoading && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  <div className="w-5 h-5 border-t-2 border-teal-500 border-solid rounded-full animate-spin"></div>
                </div>
              )}
            </div>
          </Autocomplete>
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField 
            label="Street Address"
            icon={Home}
            value={addressFields.street}
          />
          <FormField 
            label="Apartment/Suite"
            icon={Building}
            value={addressFields.apartment}
            readOnly={false}
            onChange={handleApartmentChange}
          />
          <FormField 
            label="City"
            icon={CircleUserRound}
            value={addressFields.city}
          />
          <FormField 
            label="Province/State"
            icon={Map}
            value={addressFields.province}
          />
          <FormField 
            label="Postal Code"
            icon={MailPlus}
            value={addressFields.postalCode}
          />
          <FormField 
            label="Country"
            icon={Globe}
            value={addressFields.country}
          />
        </div>
      </LoadScript>
    </div>
  );
};

export default AddressInput;