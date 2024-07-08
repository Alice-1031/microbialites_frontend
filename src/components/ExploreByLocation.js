import React from 'react';
import {useState, useEffect} from 'react';
import Navbar from './Navbar';
import MapComponent from './WayptMap';
import { fetchAllWaypoints } from '../services/api';

function ExploreByLocation() {

    const [waypoints, setWaypoints] = useState([]);

    useEffect(() => {
        const loadWaypoints = async () => {
            try {
                const fetchedWaypoints = await fetchAllWaypoints();
                setWaypoints(fetchedWaypoints);
            } catch (error) {
                console.error('Failed to fetch waypoints:', error);
            }
        };

        loadWaypoints();
    }, []);

  return (
    <div>
      <Navbar />
      <h1>Explore by Location</h1>
      <MapComponent waypoints={waypoints} />
      
    </div>
  );
}

export default ExploreByLocation;
