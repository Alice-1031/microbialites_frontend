// src/services/api.js
import axios from 'axios';
const baseURL = 'http://localhost:3000'; // Adjust if your backend URL is different

/**
 * calls addProperty API from PropertyController
 */

export const addProperty = async (propertyData) => {
    try {
        const response = await fetch(`${baseURL}/properties/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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
        const response = await fetch(`${baseURL}/properties/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
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

