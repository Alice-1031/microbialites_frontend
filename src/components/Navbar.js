import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDecodedToken, hasRole } from './middleware/authUtils';
import LoginModal from './loginModal';
import '../assets/css/Navbar.css';

function Navbar() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [roles, setRoles] = useState([]);
    const [showLoginModal, setShowLoginModal] = useState(false);

    useEffect(() => {
        const decodedToken = getDecodedToken();
        if (decodedToken) {
            setIsAuthenticated(true);
            setRoles(decodedToken.roles || []);
        }
    }, []);

    const handleLoginSuccess = () => {
        console.log("Login successful");
        const decodedToken = getDecodedToken();
        if (decodedToken) {
            setIsAuthenticated(true);
            setRoles(decodedToken.roles || []);
        }
        setShowLoginModal(false);  // Close the modal on successful login
    };

    const handleLogout = () => {
        console.log("Logging out");
        localStorage.removeItem('token');
        setIsAuthenticated(false);  // Reset authentication status
        setRoles([]);
    };

    const handleLoginCancel = () => {
        setShowLoginModal(false);
    }

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
                            {hasRole(roles, 'Admin') && <Link to="/alter-schema">Alter Schema</Link>}
                            <button onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <button onClick={toggleLoginModal}>Login</button>
                    )}
                </div>
            </div>
            {showLoginModal && <LoginModal onLoginSuccess={handleLoginSuccess} onLoginCancel={handleLoginCancel} />}

        </nav>
    );
}

export default Navbar;
