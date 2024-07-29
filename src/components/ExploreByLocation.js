import React from 'react';
import {useState, useEffect} from 'react';
import Navbar from './Navbar';
import MapComponent from './WayptMap';
import { fetchAllWaypoints } from '../services/api';
import { fetchFilteredWaypoints } from '../services/api';

function ExploreByLocation() {

    const [waypoints, setWaypoints] = useState([]);
    const [types, setTypes] = useState([]);
    const [ageRange, setAgeRange] = useState({ min: 0, max: 2147483647 });

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
        console.log("Age Range:", ageRange);

        const params = new URLSearchParams({
            minAge: ageRange.min,
            maxAge: ageRange.max
        });

        if (typeString) {
            params.append('types', typeString);
        }

        fetchFilteredWaypoints(params.toString())
            .then(data => {
                console.log("Filtered waypoints:", data);
                setWaypoints(data);
            })
            .catch(error => console.error('Failed to fetch filtered waypoints:', error));
    }, [types, ageRange]);

    const handleTypeChange = (typeId) => {
        setTypes(prev => {
            const newTypes = prev.includes(typeId) ? prev.filter(t => t !== typeId) : [...prev, typeId];
            console.log("Updated types:", newTypes);
            return newTypes;
        });
  };

  return (
      <div>
      <Navbar />
      <h1>Explore by Location</h1>
      <div>
          <label>Min Age: </label>
          <input type="number" value={ageRange.min} onChange={e => setAgeRange({ ...ageRange, min: Number(e.target.value) })} />
          <label>Max Age: </label>
          <input type="number" value={ageRange.max} onChange={e => setAgeRange({ ...ageRange, max: Number(e.target.value) })} />
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
