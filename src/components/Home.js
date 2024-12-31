import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import '../assets/css/Home.css';

function Home() {
    return (
        <div className="home">
            <Navbar />
            <div className="explore-section">
                <b>The Microbialite Database!</b>
                <p>Exploring the Evidence of the Earliest Forms of Life</p>
                <div className="explore-options">
                    <div className="explore-option">
                        
                        <Link to="/explore-by-size" className="explore-button">Explore by size, morphology, or other traits</Link>
                    </div>
                    <div className="explore-option">
                        
                        <Link to="/explore-by-location" className="explore-button">Explore by location</Link>
                    </div>
                </div>
           </div>
        </div>
    );
}

export default Home;
