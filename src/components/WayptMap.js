import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'

const MapComponent = ({ waypoints }) => {
    const mapRef = useRef(null);

    useEffect(() => {
        if (mapRef.current === null) {
            mapRef.current = L.map('map').setView([0, 0], 2); // Default to a global view
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapRef.current);
        }

        // Define the custom icon
        const customIcon = L.icon({
            iconUrl: markerIcon2x,
            iconSize: [18, 31], // size of the icon
            iconAnchor: [19, 60], // point of the icon which will correspond to marker's location
            popupAnchor: [0, -60] // point from which the popup should open relative to the iconAnchor
        });

        // Clear existing markers
        mapRef.current.eachLayer(layer => {
            if (layer instanceof L.Marker) {
                mapRef.current.removeLayer(layer);
            }
        });

        // Add new markers for each waypoint
        waypoints.forEach(waypoint => {
            L.marker([waypoint.lat, waypoint.long], { icon: customIcon })
                .bindPopup(`<b>${waypoint.wayptname}</b><br/>${waypoint.sitename}`)
                .addTo(mapRef.current);
        });

    }, [waypoints]); // Re-run effect if waypoints change

    return <div id="map" style={{ height: '500px', width: '100%' }}></div>;
};

export default MapComponent;
