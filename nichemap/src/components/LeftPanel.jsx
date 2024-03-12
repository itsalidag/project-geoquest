// LeftPanel.js
import React, { useState } from 'react';
import './style/LeftPanel.css'; // Create a separate CSS file for styling if needed


const LeftPanel = ({ onCalculate }) => {
  const [selectedChecklists, setSelectedChecklists] = useState([]);

  const handleCheckboxChange = (value) => {
    const updatedChecklists = selectedChecklists.includes(value)
      ? selectedChecklists.filter((item) => item !== value)
      : [...selectedChecklists, value];

    setSelectedChecklists(updatedChecklists);
  };

  const handleCalculate = () => {
    // Pass the selected checklists to the parent component for calculation
    onCalculate(selectedChecklists);
  };

  return (
    <div className="left-panel">
      <h2>Quest</h2>
      <br/>
      <label>
        <input
          type="checkbox"
          value="open-spaces"
          onChange={() => handleCheckboxChange('open-spaces')}
        />
        Open Spaces
      </label>
      <br/>
      <label>
        <input
          type="checkbox"
          value="shopping"
          onChange={() => handleCheckboxChange('shopping')}
        />
        Shopping
      </label>
      <br/>
      <label>
        <input
          type="checkbox"
          value="parking"
          onChange={() => handleCheckboxChange('parking')}
        />
        Parking
      </label>
      <br/>
      <button className="calculate-button" onClick={handleCalculate}>
        Calculate
      </button>
    </div>
  );
};

export default LeftPanel;
