import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar'
import LeftPanel from './components/LeftPanel';
import LeafMap from './components/LeafMap'
import { Resizable } from 'react-resizable';

function App() {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    height: '100vh', // Adjust this as needed
  };

  const leftPanelStyle = {
    flex: '1',
    width: '10%',
    backgroundColor: '#f0f0f0',
    height: '90vh' // Adjust background color as needed
  };

  const mapStyle = {
    flex: '4',
    width: '90%',
    backgroundColor: '#ffffff', // Adjust background color as needed
  };
  const [selectedData, setSelectedData] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false); // Shared state

  const handleCalculate = (data) => {
    setSelectedData(data.city);
    console.log(data.city);
    setIsSubmitted(!isSubmitted); 
  };

  return (
    <>
    <Navbar />
    <div style={containerStyle}>
    <div style={leftPanelStyle}>
      <LeftPanel onCalculate={handleCalculate} isSubmitted={isSubmitted} />
    </div>
    <div style={mapStyle}>
      <LeafMap selectedCity={selectedData} isSubmitted={isSubmitted} key={selectedData}/>
    </div>
    
    </div>
    </>
  );
}

export default App;
