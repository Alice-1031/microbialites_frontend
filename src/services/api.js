// src/services/api.js
import axios from 'axios';
const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3000'; // Adjust if your backend URL is different

/**
 * Utility function to get the token from localStorage
 */
const getToken = () => localStorage.getItem('token');

/**
 * calls addProperty API from PropertyController
 */

export const addProperty = async (propertyData) => {
    try {
        const token = getToken(); 
        const response = await fetch(`${baseURL}/properties/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Add the Bearer prefix
            },
            body: JSON.stringify(propertyData)
        });
        if (!response.ok) {
            throw new Error('HTTP status ' + response.status);
        }
        const text = await response.text();  // Get response as text
        console.log("Response received:", text);  // Log the plain text response
        return text;  // Return the text response
    } catch (error) {
        console.error('Failed to add property:', error);
        throw error;
    }
};

export const deleteProperty = async (propertyData) => {
    try {
        const token = getToken();
        const response = await fetch(`${baseURL}/properties/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Add the Bearer prefix
            },
            body: JSON.stringify(propertyData)
        });
        if (!response.ok) {
            throw new Error('HTTP status ' + response.status);
        }
        const text = await response.text();  // Get response as text
        console.log("Response received:", text);  // Log the plain text response
        return text;  // Return the text response
    } catch (error) {
        console.error('Failed to delete property:', error);
        throw error;
    }
};

/**
 * calls getLookupTables API from propertyController
 */


export const fetchLookupTables = async () => {
    const response = await fetch(`${baseURL}/properties/lookup-tables`); 
    if (!response.ok) throw new Error('Failed to fetch lookup tables');
    return response.json();
  };

/**
 * calls getAllWaypoints API from WaypointController
 */

  export const fetchAllWaypoints = async () => {
    try {
        const response = await fetch(`${baseURL}/waypoints/get`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('HTTP status ' + response.status);
        }
        return response.json(); // Return the JSON data
    } catch (error) {
        console.error('Failed to fetch waypoints:', error);
        throw error;
    }
};

export const fetchFilteredWaypoints = async (queryString) => {
    console.log("Query String:", queryString); // Log the query string for debugging
    const url = new URL(`${baseURL}/waypoints/filter?${queryString}`);
    console.log("API URL:", url.toString()); // Log the full API URL

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP status ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch filtered waypoints:', error);
        throw error;
    }
};


export const handleLogin = async (username,password) => {
    try {
        const response = await axios.post(`${baseURL}/users/login`, { username, password });
        const data = response.data;
        return{token:data.token, error: null };
    } catch (error) {
        console.error('Login failed:', error.response?.data?.message || error.message);
        return { token: null, error: error.response?.data?.message || error.message };
    }
};

