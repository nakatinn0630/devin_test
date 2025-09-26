import { calculateDistance } from '../utils/distanceCalculator';

export class ArrivalDetectionEngine {
  constructor(thresholdDistance = 100) { // 100m以内で到着と判定
    this.threshold = thresholdDistance;
    this.visitedLocations = new Set();
    this.checkInterval = null;
  }

  startArrivalMonitoring(currentPosition, savedLocations, onArrivalCallback) {
    this.stopArrivalMonitoring();
    
    this.checkInterval = setInterval(() => {
      this.checkArrivalProximity(currentPosition, savedLocations, onArrivalCallback);
    }, 30000); // 30秒間隔でチェック
  }

  stopArrivalMonitoring() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
  }

  async checkArrivalProximity(currentPosition, savedLocations, onArrivalCallback) {
    if (!currentPosition || !savedLocations.length) return;

    for (const location of savedLocations) {
      if (this.visitedLocations.has(location.id)) continue;

      const distance = calculateDistance(
        currentPosition.lat,
        currentPosition.lng,
        location.latitude,
        location.longitude
      );

      if (distance <= this.threshold) {
        this.visitedLocations.add(location.id);
        await onArrivalCallback(location);
      }
    }
  }

  resetVisitedLocations() {
    this.visitedLocations.clear();
  }
}
