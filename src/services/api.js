// src/services/api.js
const baseURL = 'http://localhost:3000'; // Adjust if your backend URL is different

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
}

export const fetchLookupTables = async () => {
    const response = await fetch(`${baseURL}/properties/lookup-tables`); 
    if (!response.ok) throw new Error('Failed to fetch lookup tables');
    return response.json();
  };

