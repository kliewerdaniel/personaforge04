import React from 'react';
import { useNotificationStore, type Notification } from '../store/notificationStore';

const NotificationToast: React.FC<{ notification: Notification }> = ({ notification }) => {
  const removeNotification = useNotificationStore((state) => state.removeNotification);

  const bgColorClass = {
    success: 'bg-success',
    error: 'bg-error',
    warning: 'bg-warning',
    info: 'bg-primary', // Using primary color for general info
  }[notification.type];

  return (
    <div
      className={`relative p-md rounded-md shadow-lg text-white flex items-center justify-between space-x-md
        ${bgColorClass} animate-slideInFromRight`}
      role="alert"
    >
      <span>{notification.message}</span>
      <button
        onClick={() => removeNotification(notification.id)}
        className="ml-auto text-white opacity-75 hover:opacity-100 focus:outline-none"
        aria-label="Close"
      >
        &times;
      </button>
    </div>
  );
};

const NotificationContainer: React.FC = () => {
  const notifications = useNotificationStore((state) => state.notifications);

  return (
    <div className="fixed bottom-md right-md z-50 space-y-sm">
      {notifications.map((notification) => (
        <NotificationToast key={notification.id} notification={notification} />
      ))}
    </div>
  );
};

export default NotificationContainer;
