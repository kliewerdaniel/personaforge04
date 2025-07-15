import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number; // in ms, 0 for persistent
}

interface NotificationState {
  notifications: Notification[];
  addNotification: (message: string, type?: Notification['type'], duration?: number) => void;
  removeNotification: (id: string) => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  addNotification: (message, type = 'info', duration = 3000) => {
    const id = uuidv4();
    const newNotification: Notification = { id, message, type, duration };
    set((state) => ({
      notifications: [...state.notifications, newNotification],
    }));

    if (duration > 0) {
      setTimeout(() => {
        get().removeNotification(id);
      }, duration);
    }
  },
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
}));
