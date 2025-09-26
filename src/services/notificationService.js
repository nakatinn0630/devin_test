export class ArrivalNotificationService {
  async sendArrivalNotification(location) {
    if (!('Notification' in window)) {
      console.warn('このブラウザは通知をサポートしていません');
      return false;
    }

    if (Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') return false;
    }

    if (Notification.permission === 'granted') {
      const notification = new Notification('到着通知 🎉', {
        body: `「${location.name}」に到着しました！`,
        icon: '/icons/icon-192x192.png',
        badge: '/icons/badge-72x72.png',
        tag: `arrival-${location.id}`,
        requireInteraction: true
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
      };

      return true;
    }

    return false;
  }

  async sendLocalNotification(location) {
    try {
      const { LocalNotifications } = await import('@capacitor/local-notifications');
      
      await LocalNotifications.schedule({
        notifications: [
          {
            id: Date.now(),
            title: '到着通知 🎉',
            body: `「${location.name}」に到着しました！`,
            schedule: { at: new Date(Date.now() + 1000) },
            sound: 'beep.wav',
            attachments: null,
            actionTypeId: '',
            extra: { locationId: location.id }
          }
        ]
      });
      return true;
    } catch (error) {
      console.error('ローカル通知エラー:', error);
      return false;
    }
  }
}
