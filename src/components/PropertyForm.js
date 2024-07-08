import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { fetchLookupTables, addProperty } from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';

const PropertyForm = () => {
  const [lookupTables, setLookupTables] = useState([]);
  const [selectedLookupTable, setSelectedLookupTable] = useState(null);
  const [selectedStructureType, setSelectedStructureType] = useState(null);
  const [createNewLookup, setCreateNewLookup] = useState(false);

  const [formData, setFormData] = useState({
    propertyName: '',
    displayName: '',
    isRequired: false,
    isMultiValued: false,
    singleValuedDataType: '',
    newLookupTableName: '',
    initialData: [{ name: '', notes: '' }]
  });

  const structureTypes = [
    { value: 'Mega', label: 'Mega' },
    { value: 'Macro', label: 'Macro' },
    { value: 'Meso', label: 'Meso' },
    { value: 'Micro', label: 'Micro' }
  ];

  useEffect(() => {
    const loadLookupTables = async () => {
      try {
          const tables = await fetchLookupTables();
          setLookupTables(tables.map(table => ({ value: table.tableid, label: table.tablename })));
      } catch (error) {
          console.error('Failed to fetch lookup tables:', error);
      }
    };
    loadLookupTables();
  }, []);

  const handleStructureTypeChange = selectedOption => {
    setSelectedStructureType(selectedOption);
    setFormData({ ...formData, structureType: selectedOption.value });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSelectChange = selectedOption => {
    setSelectedLookupTable(selectedOption);
    setFormData(prev => ({ ...prev, lookupTableId: selectedOption.value }));
  };

  const handleInitialDataChange = (value, index, field) => {
    const updatedInitialData = [...formData.initialData];
    updatedInitialData[index][field] = value;
    setFormData({ ...formData, initialData: updatedInitialData });
  };

  const addInitialDataField = () => {
    setFormData(prev => ({
      ...prev,
      initialData: [...prev.initialData, { name: '', notes: '' }]
    }));
  };

  const removeInitialDataField = index => {
    setFormData(prev => ({
      ...prev,
      initialData: prev.initialData.filter((_, idx) => idx !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProperty(formData);
      alert('Property added successfully!');
      // Optionally reset form here
    } catch (error) {
      alert('Failed to add property: ' + error.message);
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Structure Type:</label>
          <Select
            value={selectedStructureType}
            onChange={handleStructureTypeChange}
            options={structureTypes}
            className="basic-single"
            classNamePrefix="select"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Property Name:</label>
          <input name="propertyName" value={formData.propertyName} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Display Name:</label>
          <input name="displayName" value={formData.displayName} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-check-label">
            <input name="isRequired" type="checkbox" checked={formData.isRequired} onChange={handleChange} className="form-check-input" />
            Is Required
          </label>
        </div>
        <div className="mb-3">
          <label className="form-check-label">
            <input name="isMultiValued" type="checkbox" checked={formData.isMultiValued} onChange={handleChange} className="form-check-input" />
            Is MultiValued
          </label>
        </div>
        {!formData.isMultiValued && (
          <div className="mb-3">
            <label className="form-label">Single Valued Data Type:</label>
            <input name="singleValuedDataType" value={formData.singleValuedDataType} onChange={handleChange} className="form-control" />
          </div>
        )}
        <div className="mb-3">
          <label className="form-label">Lookup Table:</label>
          <Select
            value={selectedLookupTable}
            onChange={handleSelectChange}
            options={lookupTables}
            className="basic-single"
            classNamePrefix="select"
          />
        </div>
        <div className="mb-3">
          <label className="form-check-label">
            <input name="createNewLookupTable" type="checkbox" checked={createNewLookup} onChange={() => {
               setCreateNewLookup(!createNewLookup);
               setFormData(prev => ({
                 ...prev,
                 newLookupTableName: !createNewLookup ? '' : null }));
            }} className="form-check-input" />
            Create New Lookup Table
          </label>
        </div>
        {createNewLookup && (
          <>
            <div className="mb-3">
              <label className="form-label">New Lookup Table Name:</label>
              <input name="newLookupTableName" value={formData.newLookupTableName || ''} onChange={handleChange} className="form-control" />
            </div>
            {formData.initialData.map((item, index) => (
              <div key={index} className="mb-3">
                <label className="form-label">Name:</label>
                <input
                  value={item.name}
                  onChange={e => handleInitialDataChange(e.target.value, index, 'name')}
                  className="form-control"
                />
                <label className="form-label">Notes:</label>
                <input
                  value={item.notes}
                  onChange={e => handleInitialDataChange(e.target.value, index, 'notes')}
                  className="form-control"
                />
                <button type="button" onClick={() => removeInitialDataField(index)} className="btn btn-danger mt-2">Remove</button>
              </div>
            ))}
            <button type="button" onClick={addInitialDataField} className="btn btn-secondary">Add More Data</button>
          </>
        )}
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default PropertyForm;

