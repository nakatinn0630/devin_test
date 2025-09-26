import React, { useEffect, useState } from 'react';
import { LocationMap } from './components/LocationMap/LocationMap';
import { LocationList } from './components/LocationList/LocationList';
import { NotificationManager } from './components/NotificationManager/NotificationManager';
import { Auth } from './components/Auth/Auth';
import { useArrivalMonitor } from './hooks/useArrivalMonitor';
import { useLocations } from './hooks/useLocations';
import { LocationTrackingService } from './services/locationService';
import { onAuthStateChange } from './services/firebaseService';

import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trackingService] = useState(new LocationTrackingService());

  const { locations, addLocation } = useLocations(user);
  const {
    currentPosition,
    setCurrentPosition,
    arrivedLocations,
    resetArrivals
  } = useArrivalMonitor(locations);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      await trackingService.startLocationTracking(setCurrentPosition);
      
      onAuthStateChange((user) => {
        setUser(user);
        setLoading(false);
      });
    } catch (error) {
      console.error('初期化エラー:', error);
      setLoading(false);
    }
  };

  const handleLocationAdd = async (location) => {
    if (user) {
      try {
        await addLocation(location);
      } catch (error) {
        console.error('地点追加エラー:', error);
      }
    }
  };

  if (loading) {
    return <div className="loading">位置情報サービスを起動中...</div>;
  }

  if (!user) {
    return <Auth user={user} onUserChange={setUser} />;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>ArrivalNotify - 到着通知アプリ</h1>
        <Auth user={user} onUserChange={setUser} />
        <NotificationManager 
          arrivedLocations={arrivedLocations}
          onReset={resetArrivals}
        />
      </header>

      <main className="app-main">
        <LocationMap
          currentPosition={currentPosition}
          savedLocations={locations}
          onLocationAdd={handleLocationAdd}
        />
        
        <LocationList 
          locations={locations}
          currentPosition={currentPosition}
        />
      </main>
    </div>
  );
}

export default App;
