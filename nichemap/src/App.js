import React, { useState } from 'react';
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
    backgroundColor: '#f0f0f0', // Adjust background color as needed
  };

  const mapStyle = {
    flex: '4',
    width: '90%',
    backgroundColor: '#ffffff', // Adjust background color as needed
  };

  return (
    <>
    <Navbar />
    <div style={containerStyle}>
      <Resizable
        defaultSize={{ width: '33%', height: '100%' }}
        minWidth={100}
        maxWidth={'66%'}
      >
      <div style={leftPanelStyle}>
      <LeftPanel />
      </div>
      </Resizable>
      <div style={mapStyle}>
      <LeafMap/>
      </div>
    
    </div>
    </>
  );
}

export default App;
