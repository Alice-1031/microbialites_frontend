import React from 'react';
import { Navigate } from 'react-router-dom';
import { getDecodedToken, hasRole } from './authUtils';

const ProtectedRoute = ({ element: Component, requiredRoles }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        alert('Please log in to access this page.');
        return <Navigate to="/" />;
    }

    try {
        const decodedToken = getDecodedToken(token);
        const userRoles = decodedToken.roles || [];

        // Check if the user has at least one of the required roles
        if (requiredRoles && !requiredRoles.some(role => hasRole(userRoles, role))) {
            alert('You do not have the necessary permissions to access this page.');
            return <Navigate to="/" />;
        }

        return <Component />;
    } catch (error) {
        alert('login error');
        return <Navigate to="/" />;
    }
};

export default ProtectedRoute;