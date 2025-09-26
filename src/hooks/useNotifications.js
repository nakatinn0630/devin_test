import { useState, useEffect } from 'react';

export const useNotifications = () => {
  const [permission, setPermission] = useState(Notification.permission);
  const [isSupported, setIsSupported] = useState('Notification' in window);

  useEffect(() => {
    setIsSupported('Notification' in window);
    setPermission(Notification.permission);
  }, []);

  const requestPermission = async () => {
    if (!isSupported) return false;
    
    const result = await Notification.requestPermission();
    setPermission(result);
    return result === 'granted';
  };

  return {
    permission,
    isSupported,
    requestPermission,
    isGranted: permission === 'granted'
  };
};
