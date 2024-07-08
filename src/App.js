// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ExploreBySize from './components/ExploreBySize';
import ExploreByLocation from './components/ExploreByLocation';
import AlterSchema from './components/AlterSchema';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore-by-size" element={<ExploreBySize />} />
        <Route path="/explore-by-location" element={<ExploreByLocation />} />
        <Route path="/alter-schema" element={<AlterSchema />} />
      </Routes>
    </Router>
  );
}

export default App;
