import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoginModal from './loginModal';
import '../assets/css/Navbar.css';

function Navbar() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLoginSuccess = () => {
        console.log("Login successful");
        setIsAuthenticated(true);
        setShowLoginModal(false);  // Close the modal on successful login
    };

    const handleLogout = () => {
        console.log("Logging out");
        localStorage.removeItem('token');
        setIsAuthenticated(false);  // Reset authentication status
    };

    const toggleLoginModal = () => {
        console.log("Toggling login modal");
        setShowLoginModal(!showLoginModal);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container" >
    
                <div className="menu-icons" >
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/help">Help</Link>
                    <Link to="/teaching">Teaching</Link>
                    <Link to="/api">API</Link>
                    {isAuthenticated ? (
                        <>
                            <Link to="/alter-schema">Alter Schema</Link>
                            <button onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <button onClick={toggleLoginModal}>Login</button>
                    )}
                </div>
            </div>
            {showLoginModal && <LoginModal onLoginSuccess={handleLoginSuccess} />}

        </nav>
    );
}

export default Navbar;
