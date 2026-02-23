import React, { useState, useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import locationSearch from "../../assets/others/Location search.png";



delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Component to fly to a location
const FlyTo = ({ coord }) => {
    const map = useMap();
    useEffect(() => {
        if (coord) map.flyTo(coord, 14, { duration: 2 });
    }, [coord, map]);
    return null;
};

const Coverage = () => {
    const [serviceCenters, setServiceCenters] = useState([]);
    const [selectedCoord, setSelectedCoord] = useState(null);
    const position = [23.685, 90.3563];


    useEffect(() => {
        fetch('/serviceCenters.json')
            .then((res) => res.json())
            .then((data) => setServiceCenters(data))
            .catch((err) => console.error('Failed to load service centers:', err));
    }, []);


    const handleSearch = (e) => {
        e.preventDefault();
        const location = e.target.location.value.toLowerCase();
        const district = serviceCenters.find((c) =>
            c.district.toLowerCase().includes(location)
        );
        if (district) setSelectedCoord([district.latitude, district.longitude]);
        else alert('District not found');
    };

    return (
        <div className="my-2 ">
        
            <div className="h-60 flex items-center justify-between mb-10 px-10">
                <div className="flex-1 text-left">
                    <h2 className="text-4xl mb-6 text-center text-secondary">
                        We are available in 64 districts
                    </h2>
                    <form onSubmit={handleSearch} className="flex justify-center mb-2">
                        <label className="input input-bordered flex items-center gap-2 w-full max-w-md">
                            <input
                                type="search"
                                name="location"
                                placeholder="Search district"
                                className="grow p-2"
                            />
                        </label>
                    </form>



                </div>

                <div className="flex-1 flex justify-center">
                    <img
                        src={locationSearch}
                        className="max-h-60 w-auto object-contain"
                        alt=""
                    />
                </div>
            </div>


            {/* Map */}
            <div className="border w-full h-[800px] rounded-xl overflow-hidden">
                <MapContainer center={position} zoom={8} scrollWheelZoom className="h-full w-full">
                    <TileLayer
                        attribution='&copy; OpenStreetMap contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />


                    {selectedCoord && <FlyTo coord={selectedCoord} />}


                    {serviceCenters.map((center, index) => (
                        <Marker position={[center.latitude, center.longitude]} key={index}>
                            <Popup>
                                <strong>{center.district}</strong>
                                <br />
                                Service Area: {center.covered_area.join(', ')}
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
};

export default Coverage;