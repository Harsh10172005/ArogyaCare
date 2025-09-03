
'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { hospitals } from '@/data/hospitals';

// Fix for default marker icon issue with webpack
const markerIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const HospitalMap = () => {
    const defaultPosition: [number, number] = [28.6139, 77.2090]; // Delhi coordinates

    return (
        <MapContainer center={defaultPosition} zoom={11} scrollWheelZoom={false} style={{ height: '400px', width: '100%', borderRadius: '0.5rem', marginBottom: '2rem', zIndex: 0 }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {hospitals.map(hospital => (
                <Marker key={hospital.id} position={[hospital.latitude, hospital.longitude]} icon={markerIcon}>
                    <Popup>
                        <b>{hospital.name}</b><br />
                        {hospital.address}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default HospitalMap;
