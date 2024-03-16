import './style/CheckMarks.css'; 
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee,faStore,faBasketball, faBus,faLocation } from '@fortawesome/free-solid-svg-icons'


function Slider() {
    const [sliderValue, setSliderValue] = useState(0);
  
    const handleChange = (event) => {
      setSliderValue(event.target.value);
    };
  
    return (
      <div className="slider-container">
        <input
          type="range"
          min={0} // Adjust min and max values as needed
          max={100}
          value={sliderValue}
          onChange={handleChange}
        />
      </div>
    );
  }
  

export default function CheckMark(){


    return(
        <div>
        <div className='buttons-container'>
            <button className='iconButton'>
                <FontAwesomeIcon icon={faStore} size='2x' />
            </button>
            <Slider />
        </div>
        <div className='buttons-container'>
            <button className='iconButton'>
                <FontAwesomeIcon icon={faBasketball} size='2x'/>
            </button>
            <Slider />
        </div>
        <div className='buttons-container'>
            <button className='iconButton'>
                <FontAwesomeIcon icon={faBus} size='2x' />
            </button>
            <Slider />
        </div>
        <div className='buttons-container'>
            <button className='iconButton'>
                <FontAwesomeIcon icon={faLocation} size='2x' />
            </button>
            <Slider />
        </div>
        </div>
    )
}