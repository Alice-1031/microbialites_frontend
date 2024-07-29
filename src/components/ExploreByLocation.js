import React from 'react';
import {useState, useEffect} from 'react';
import Navbar from './Navbar';
import MapComponent from './WayptMap';
import { fetchAllWaypoints } from '../services/api';
import { fetchFilteredWaypoints,fetchPeriodNames } from '../services/api';
import '../assets/css/exploreLocation.css'

function ExploreByLocation() {

    const [waypoints, setWaypoints] = useState([]);
    const [types, setTypes] = useState([]);
    const [periodName, setPeriodName] = useState('');

    // Load all waypoints initially
    useEffect(() => {
      fetchAllWaypoints()
          .then(data => setWaypoints(data))
          .catch(error => console.error('Failed to fetch all waypoints:', error));

  }, []);

      // Update waypoints based on filters
      useEffect(() => {
        const typeString = Array.isArray(types) && types.length > 0 ? types.join(',') : '';
        console.log("Filtered types:", types);
        console.log("Period Name:", periodName);

        const params = new URLSearchParams();

        if (typeString) {
            params.append('types', typeString);
        }
        if (periodName) {
            params.append('period_name', periodName);
        }

        fetchFilteredWaypoints(params.toString())
            .then(data => {
                console.log("Filtered waypoints:", data);
                setWaypoints(data);
            })
            .catch(error => console.error('Failed to fetch filtered waypoints:', error));
    }, [types, periodName]);

    const handleTypeChange = (typeId) => {
        setTypes(prev => {
            const newTypes = prev.includes(typeId) ? prev.filter(t => t !== typeId) : [...prev, typeId];
            console.log("Updated types:", newTypes);
            return newTypes;
        });
    };

    const handlePeriodNameChange = (e) => {
        setPeriodName(e.target.value);
    };

  return (
      <div>
      <Navbar />
      <h1>Explore by Location</h1>
      <div>
      <label>Period Name: </label>
        <input type="text" value={periodName} onChange={handlePeriodNameChange} placeholder="Enter period name..." /> 
      </div>
      <div>
          <label><input type="checkbox" onChange={() => handleTypeChange(1)} checked={types.includes(1)} /> Stromatolite</label>
          <label><input type="checkbox" onChange={() => handleTypeChange(2)} checked={types.includes(2)} /> Thrombolite</label>
          <label><input type="checkbox" onChange={() => handleTypeChange(3)} checked={types.includes(3)} /> Dendrolite</label>
          <label><input type="checkbox" onChange={() => handleTypeChange(4)} checked={types.includes(4)} /> Leiolite</label>
          <label><input type="checkbox" onChange={() => handleTypeChange(5)} checked={types.includes(5)} /> MISS</label>
      </div>
      <MapComponent waypoints={waypoints} />
  </div>
  );
}

export default ExploreByLocation;
