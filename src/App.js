import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';

import './App.scss'

import Routes from './routes/index';

function App() {
  return (
    <>
      <Router>
        <Routes />
      </Router>
    </>
  );
};

export default App;