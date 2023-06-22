import React, { useState } from 'react';

const Demoo = () => {
  const [dynamicValue, setDynamicValue] = useState('');

  const handleChange = (event) => {
    const inputValue = event.target.value;
    setDynamicValue(inputValue.slice(2)); // Ignore the first two letters
  };

  return (
    <div>
      <label>Input Field:</label>
      <input
        type="text"
        value={`AB${dynamicValue}`} // 'AB' are the static first two letters
        onChange={handleChange}
        maxLength={5}
      />
    </div>
  );
};

export default Demoo;
