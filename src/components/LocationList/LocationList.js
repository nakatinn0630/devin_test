import React from 'react';
import { calculateDistance } from '../../utils/distanceCalculator';

export const LocationList = ({ locations, currentPosition }) => {
  const getDistanceText = (location) => {
    if (!currentPosition) return '距離不明';
    
    const distance = calculateDistance(
      currentPosition.lat,
      currentPosition.lng,
      location.latitude,
      location.longitude
    );
    
    if (distance < 1000) {
      return `${Math.round(distance)}m`;
    } else {
      return `${(distance / 1000).toFixed(1)}km`;
    }
  };

  const getLocationTypeText = (type) => {
    const typeMap = {
      fishing: '釣り場',
      bar: 'バー',
      restaurant: 'レストラン',
      other: 'その他'
    };
    return typeMap[type] || 'その他';
  };

  return (
    <div className="location-list">
      <h2>登録地点一覧</h2>
      {locations.length === 0 ? (
        <p className="no-locations">登録された地点がありません。地図をクリックして地点を追加してください。</p>
      ) : (
        <div className="locations">
          {locations.map((location) => (
            <div key={location.id} className="location-item">
              <div className="location-info">
                <h3 className="location-name">{location.name}</h3>
                <p className="location-type">{getLocationTypeText(location.type)}</p>
                <p className="location-distance">現在地から: {getDistanceText(location)}</p>
              </div>
              <div className="location-coordinates">
                <small>
                  {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                </small>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
