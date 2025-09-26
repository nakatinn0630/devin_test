export class LocationTrackingService {
  constructor() {
    this.watchId = null;
    this.currentPosition = null;
    this.onPositionUpdate = null;
  }

  async startLocationTracking(onUpdateCallback) {
    this.onPositionUpdate = onUpdateCallback;

    if (!navigator.geolocation) {
      throw new Error('位置情報サービスが利用できません');
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000
    };

    this.watchId = navigator.geolocation.watchPosition(
      (position) => this.handlePositionUpdate(position),
      (error) => this.handlePositionError(error),
      options
    );

    return this.getCurrentPosition();
  }

  handlePositionUpdate(position) {
    this.currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
      accuracy: position.coords.accuracy,
      timestamp: position.timestamp
    };

    if (this.onPositionUpdate) {
      this.onPositionUpdate(this.currentPosition);
    }
  }

  handlePositionError(error) {
    console.error('位置情報エラー:', error);
  }

  getCurrentPosition() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000
      });
    });
  }

  stopLocationTracking() {
    if (this.watchId) {
      navigator.geolocation.clearWatch(this.watchId);
      this.watchId = null;
    }
  }
}
