import React, { useState, useEffect } from 'react';
import './App.css';
import { Engine } from './behaviour/Engine';
import { Canvas } from './Components/Canvas';


const App = () => {
  const [engine, setEngine] = useState(new Engine());

  return (
    <div className="App">
      <Canvas engine={engine} />
    </div>
  );
}

export default App;
