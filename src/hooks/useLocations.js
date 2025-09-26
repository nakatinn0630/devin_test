import { useState, useEffect } from 'react';
import { LocationDataService } from '../services/firebaseService';

export const useLocations = (user) => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const locationService = new LocationDataService();

  useEffect(() => {
    if (user) {
      loadLocations();
    }
  }, [user]);

  const loadLocations = async () => {
    setLoading(true);
    try {
      const userLocations = await locationService.getUserSavedLocations(user.uid);
      setLocations(userLocations);
    } catch (error) {
      console.error('Error loading locations:', error);
    } finally {
      setLoading(false);
    }
  };

  const addLocation = async (location) => {
    try {
      const id = await locationService.saveNewLocation({
        ...location,
        userId: user.uid
      });
      setLocations(prev => [...prev, { ...location, id }]);
      return id;
    } catch (error) {
      console.error('Error adding location:', error);
      throw error;
    }
  };

  return {
    locations,
    loading,
    addLocation,
    refreshLocations: loadLocations
  };
};
