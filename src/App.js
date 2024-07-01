// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './components/About';
import Explore from './components/Explore';
import Home from './components/Home';
import PropertyForm from './components/PropertyForm';


/*function App() {
  return (
    <div className="App">
      <PropertyForm />
    </div>
  );
}*/

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/alter-schema" element={<PropertyForm />} />
      </Routes>
    </Router>
  );
}

export default App;
