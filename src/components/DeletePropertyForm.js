import React, { useState } from 'react';
import { deleteProperty } from '../services/api'; // Adjust path as needed

const DeletePropertyForm = () => {
    const [propertyName, setPropertyName] = useState('');
    const [structureType, setStructureType] = useState('');
    const [deleteLkp, setDeleteLkp] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await deleteProperty({ propertyName, structureType, deleteLkp });
            alert('Property deleted successfully');
            setPropertyName('');
            setStructureType('');
            setDeleteLkp(false);
        } catch (error) {
            console.error('Error deleting property:', error);
            alert('Failed to delete property');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Property Name:</label>
                <input 
                    type="text" 
                    value={propertyName} 
                    onChange={(e) => setPropertyName(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <label>Structure Type:</label>
                <input 
                    type="text" 
                    value={structureType} 
                    onChange={(e) => setStructureType(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <label>Delete Lookup Table:</label>
                <input 
                    type="checkbox" 
                    checked={deleteLkp} 
                    onChange={(e) => setDeleteLkp(e.target.checked)} 
                />
            </div>
            <button type="submit">Delete Property</button>
        </form>
    );
};

export default DeletePropertyForm;
