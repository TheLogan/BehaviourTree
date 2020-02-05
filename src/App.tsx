import React, { useState } from 'react';
import './App.css';
import { Engine } from './behaviour/Engine';
import Canvas from './Components/Canvas';
import { createMuiTheme, ThemeProvider, CssBaseline } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});


const App = () => {
  const [engine] = useState(new Engine());

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Canvas engine={engine} />
      </ThemeProvider>
    </div>
  );
}

export default App;
