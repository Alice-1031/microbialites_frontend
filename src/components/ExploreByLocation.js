import React from 'react';
import {useState, useEffect} from 'react';
import Navbar from './Navbar';
import MapComponent from './WayptMap';
import Sidebar from './sidebar';
import { fetchAllWaypoints } from '../services/api';
import { fetchFilteredWaypoints, fetchMegaThumbnails,fetchMegasAtWaypoint} from '../services/api';

function ExploreByLocation() {

    const [waypoints, setWaypoints] = useState([]);
    const [types, setTypes] = useState([]);
    const [periodName, setPeriodName] = useState('');
    const [selectedMegaids, setSelectedMegaids] = useState([]);

    // Load all waypoints initially
    useEffect(() => {
      fetchAllWaypoints()
          .then(data => setWaypoints(data))
          .catch(error => console.error('Failed to fetch all waypoints:', error));

  }, []);

    // Update waypoints based on filters
    useEffect(() => {
        if (types.length === 0 && !periodName) {
            // Load all waypoints when no filters are applied
            fetchAllWaypoints()
                .then(data => setWaypoints(data))
                .catch(error => console.error('Failed to fetch all waypoints:', error));
        } else {
            // Apply filters
            const typeString = types.join(',');
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
        }
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

    const handleWaypointClick = (megas, waypointId) => {
        if (!megas || megas.length === 0) { // case where no filters are selected and API called is fetchAllWaypoints instead of fetchFilteredWaypoints
            // First, fetch megas for this waypoint from the backend
            fetchMegasAtWaypoint(waypointId)
                .then(response => {
                    // After fetching megas, extract their IDs
                    const megaIds = response.megaIds
    
                   // Ensure the response contains an array before proceeding
                    if (Array.isArray(megaIds)) {
                        // Then, fetch the thumbnails for these megas
                        return fetchMegaThumbnails(megaIds);
                    } else {
                        throw new Error('API did not return an array for megaIds');
                    }
                })
                .then(fetchedThumbnails => {
                    // Finally, set the selected megaids with their thumbnails
                    setSelectedMegaids(fetchedThumbnails.map(mega => ({
                        megaid: mega.megaid,
                        thumbnailUrl: mega.thumbnailUrl, // Use the URL with the SAS token
                    })));
                })
                .catch(error => console.error('Failed to fetch megas or thumbnails:', error));
        } else {
            // Fetch thumbnail URLs for the given megas
            const megaIds = megas.map(mega => mega.megaid);
            fetchMegaThumbnails(megaIds)
                .then(fetchedThumbnails => {
                    setSelectedMegaids(fetchedThumbnails.map(mega => ({
                        megaid: mega.megaid,
                        typeIds: mega.type_ids,
                        thumbnailUrl: mega.thumbnailUrl, // Use the URL with the SAS token
                    })));
                })
                .catch(error => console.error('Failed to fetch thumbnails:', error));
        }
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
          <label><input type="checkbox" onChange={() => handleTypeChange(6)} checked={types.includes(6)} /> Oncolite</label>
      </div>
      <div style={{ display: 'flex' }}>
            <MapComponent waypoints={waypoints} onWaypointClick={handleWaypointClick} />
            <Sidebar megaids={selectedMegaids} />
     </div>
  </div>
  );
}

export default ExploreByLocation;
