import React, { useState } from 'react';
import './style/LeftPanel.css'; // Create a separate CSS file for styling if needed
import CheckMark from './CheckMarks';

const LeftPanel = ({ onCalculate }) => {
  const [selectedCity, setSelectedCity] = useState('Mardin'); // Initial selected city
  const [isSubmitted, setIsSubmitted] = useState(false);
  const cities = ['Istanbul', 'Ankara','İzmir','Mardin','Çorum'];

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleSubmit = () => {
    onCalculate({ city: selectedCity });
    setIsSubmitted(!isSubmitted); // Toggle state on submit
  };

  return (
    <div className='left-panel'>
      <h3>Customize Your Search!</h3>
      <select value={selectedCity} onChange={handleCityChange}>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
      <CheckMark />
      <button className='calculate-button' onClick={handleSubmit}>
        Calculate
      </button>
    </div>
  );
};

export default LeftPanel;
