import React, { useState, useRef } from 'react';
import { LoadScript, Autocomplete } from '@react-google-maps/api';

const libraries = ['places'];

const AddressAutocomplete = () => {
  const [autocomplete, setAutocomplete] = useState(null);
  const [address, setAddress] = useState({
    street: '',
    apartment: '',
    province: '',
    country: '',
  });
  const inputRef = useRef(null);

  const handlePlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      const addressComponents = place.address_components;

      // Helper function to get the address component of a specific type
      const getAddressComponent = (type) => {
        const component = addressComponents.find(component =>
          component.types.includes(type)
        );
        return component ? component.long_name : '';
      };

      setAddress({
        street: getAddressComponent('route') + ' ' + getAddressComponent('street_number'),
        apartment: getAddressComponent('subpremise'),
        province: getAddressComponent('administrative_area_level_1'),
        country: getAddressComponent('country'),
      });

      console.log('Place:', place);
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  const onLoad = (autocompleteInstance) => {
    console.log('Autocomplete loaded:', autocompleteInstance);
    setAutocomplete(autocompleteInstance);
  };

  return (
    <LoadScript googleMapsApiKey="thetebebdhcbchcb" libraries={libraries}>
      <Autocomplete
        onLoad={onLoad}
        onPlaceChanged={handlePlaceChanged}
      >
        <input
          type="text"
          placeholder="Enter a location"
          ref={inputRef}
          style={{ width: '300px', height: '40px', padding: '10px' }}
        />
      </Autocomplete>
      <div>
        <p>Street Address: {address.street}</p>
        <p>Apartment Number: {address.apartment}</p>
        <p>Province: {address.province}</p>
        <p>Country: {address.country}</p>
      </div>
    </LoadScript>
  );
};

export default AddressAutocomplete;

