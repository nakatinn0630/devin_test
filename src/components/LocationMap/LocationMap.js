import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const defaultCenter = {
  lat: 35.6762,
  lng: 139.6503
};

export const LocationMap = ({ currentPosition, savedLocations, onLocationAdd }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [newLocationName, setNewLocationName] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [clickedPosition, setClickedPosition] = useState(null);

  const center = currentPosition || defaultCenter;

  const onMapClick = useCallback((event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setClickedPosition({ lat, lng });
    setShowAddDialog(true);
  }, []);

  const handleAddLocation = () => {
    if (newLocationName.trim() && clickedPosition && onLocationAdd) {
      onLocationAdd({
        name: newLocationName,
        latitude: clickedPosition.lat,
        longitude: clickedPosition.lng,
        type: 'other'
      });
      setNewLocationName('');
      setShowAddDialog(false);
      setClickedPosition(null);
    }
  };

  const handleCancelAdd = () => {
    setNewLocationName('');
    setShowAddDialog(false);
    setClickedPosition(null);
  };

  return (
    <div className="location-map">
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ''}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          onClick={onMapClick}
        >
          {/* Current position marker */}
          {currentPosition && (
            <Marker
              position={currentPosition}
              icon={{
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                  <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="8" fill="#4285F4" stroke="#fff" stroke-width="2"/>
                  </svg>
                `),
                scaledSize: new window.google.maps.Size(20, 20)
              }}
              title="現在地"
            />
          )}

          {/* Saved locations markers */}
          {savedLocations.map((location) => (
            <Marker
              key={location.id}
              position={{ lat: location.latitude, lng: location.longitude }}
              onClick={() => setSelectedLocation(location)}
              title={location.name}
            />
          ))}

          {/* Clicked position marker for adding new location */}
          {clickedPosition && (
            <Marker
              position={clickedPosition}
              icon={{
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                  <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="8" fill="#FF5722" stroke="#fff" stroke-width="2"/>
                  </svg>
                `),
                scaledSize: new window.google.maps.Size(20, 20)
              }}
            />
          )}

          {/* Info window for selected location */}
          {selectedLocation && (
            <InfoWindow
              position={{ lat: selectedLocation.latitude, lng: selectedLocation.longitude }}
              onCloseClick={() => setSelectedLocation(null)}
            >
              <div>
                <h3>{selectedLocation.name}</h3>
                <p>タイプ: {selectedLocation.type}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>

      {/* Add location dialog */}
      {showAddDialog && (
        <div className="add-location-dialog">
          <div className="dialog-content">
            <h3>新しい地点を追加</h3>
            <input
              type="text"
              placeholder="地点名を入力"
              value={newLocationName}
              onChange={(e) => setNewLocationName(e.target.value)}
            />
            <div className="dialog-buttons">
              <button onClick={handleAddLocation}>追加</button>
              <button onClick={handleCancelAdd}>キャンセル</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
