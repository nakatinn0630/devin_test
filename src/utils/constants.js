export const DEFAULT_THRESHOLD_DISTANCE = 100; // 100m
export const LOCATION_CHECK_INTERVAL = 30000; // 30 seconds
export const LOCATION_TRACKING_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 60000
};

export const NOTIFICATION_ICONS = {
  icon: '/icons/icon-192x192.png',
  badge: '/icons/badge-72x72.png'
};

export const LOCATION_TYPES = {
  FISHING: 'fishing',
  BAR: 'bar', 
  RESTAURANT: 'restaurant',
  OTHER: 'other'
};
