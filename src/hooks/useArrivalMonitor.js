import { useState, useEffect, useRef } from 'react';
import { ArrivalDetectionEngine } from '../services/arrivalDetection';
import { ArrivalNotificationService } from '../services/notificationService';

export const useArrivalMonitor = (savedLocations) => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [arrivedLocations, setArrivedLocations] = useState([]);
  
  const detectionEngine = useRef(new ArrivalDetectionEngine());
  const notificationService = useRef(new ArrivalNotificationService());

  const handleArrival = async (location) => {
    console.log(`到着検知: ${location.name}`);
    
    const success = await notificationService.current.sendArrivalNotification(location);
    
    if (success) {
      setArrivedLocations(prev => [...prev, {
        ...location,
        arrivedAt: new Date()
      }]);
    }
  };

  useEffect(() => {
    if (!savedLocations.length) return;

    const startMonitoring = async () => {
      try {
        if (!currentPosition) return;

        detectionEngine.current.startArrivalMonitoring(
          currentPosition,
          savedLocations,
          handleArrival
        );
      } catch (error) {
        console.error('到着監視エラー:', error);
      }
    };

    startMonitoring();

    return () => {
      detectionEngine.current.stopArrivalMonitoring();
    };
  }, [currentPosition, savedLocations]);

  const resetArrivals = () => {
    setArrivedLocations([]);
    detectionEngine.current.resetVisitedLocations();
  };

  return {
    currentPosition,
    setCurrentPosition,
    arrivedLocations,
    resetArrivals
  };
};
