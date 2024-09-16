// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ExploreBySize from './components/ExploreBySize';
import ExploreByLocation from './components/ExploreByLocation';
import AlterSchema from './components/AlterSchema';
import ProtectedRoute from './components/middleware/ProtectedRoute';
import Page from './components/TextPageTemplate';
import About from './components/About'




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore-by-size" element={<ExploreBySize />} />
        <Route path="/explore-by-location" element={<ExploreByLocation />} />
        <Route path="/api" element={<Page title={'API'} body={'API text'} />}/>
        <Route path="/help" element={<Page title={'HOW TO USE THIS DATABASE'} body={'Tutorial text'} />}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/teaching" element={<Page title={'TEACHING'} body={'Teaching text'} />}/>
       <Route
          path="/alter-schema"
          element={<ProtectedRoute element={AlterSchema} requiredRoles={['Admin']} />}
        />    
      </Routes>
    </Router>
  );
}

export default App;
