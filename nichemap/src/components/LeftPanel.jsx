// LeftPanel.js
import React, { useState } from 'react';
import './style/LeftPanel.css'; // Create a separate CSS file for styling if needed
import CheckMark from './CheckMarks';


const LeftPanel = ({ onCalculate }) => {
    



  return(
    <div className='left-panel'>
      <h3>Customize Your Search!</h3>
      <CheckMark />
      <button className='calculate-button'>Calculate</button>

    </div>
    )};

export default LeftPanel;
