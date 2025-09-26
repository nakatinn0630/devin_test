import React from 'react';
import { useNotifications } from '../../hooks/useNotifications';

export const NotificationManager = ({ arrivedLocations, onReset }) => {
  const { permission, isSupported, requestPermission, isGranted } = useNotifications();

  const handleRequestPermission = async () => {
    await requestPermission();
  };

  const formatArrivalTime = (date) => {
    return new Date(date).toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="notification-manager">
      <div className="notification-status">
        {!isSupported && (
          <div className="notification-warning">
            このブラウザは通知をサポートしていません
          </div>
        )}
        
        {isSupported && !isGranted && (
          <div className="notification-permission">
            <p>到着通知を受け取るには通知の許可が必要です</p>
            <button onClick={handleRequestPermission} className="permission-button">
              通知を許可する
            </button>
          </div>
        )}
        
        {isGranted && (
          <div className="notification-enabled">
            ✅ 通知が有効になっています
          </div>
        )}
      </div>

      {arrivedLocations.length > 0 && (
        <div className="arrival-history">
          <div className="arrival-header">
            <h3>到着履歴</h3>
            <button onClick={onReset} className="reset-button">
              履歴をクリア
            </button>
          </div>
          <div className="arrival-list">
            {arrivedLocations.map((location, index) => (
              <div key={index} className="arrival-item">
                <div className="arrival-info">
                  <span className="arrival-name">{location.name}</span>
                  <span className="arrival-time">
                    {formatArrivalTime(location.arrivedAt)}
                  </span>
                </div>
                <div className="arrival-icon">🎉</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
