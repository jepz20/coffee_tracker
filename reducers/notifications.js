import { hashHistory } from 'react-router';
const defaultState = {
  supported: true,
  permitted: true,
  verified: false,
  notifications: {
    news: {
      initialized: false,
      lastNotification: {},
    },
  },
};

export default function(state=defaultState, action) {
  switch (action.type) {
    case 'SET_NOTIFICATION_PERMISSIONS':

      if (!('Notification' in window)) {
        return { ...state, supported: false, verified: true };
      }

      if (Notification.permission === 'granted') {
        return { ...state, supported: true, verified: true, permitted: true };
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
          if (permission === 'granted') {
            return { ...state, supported: true, verified: true, permitted: false };
          } else {
            return { ...state, supported: true, verified: true, permitted: false };
          }
        });
      } else {
        return { ...state, supported: true, verified: true, permitted: false };
      }

    case 'SEND_NOTIFICATION_NEWS':
      const { notifications } = state;
      if (!notifications.news.initialized) {
        notifications.news.initialized = true;
        notifications.news.lastNotification = action.newsItem;
        return { ...state, notifications };
      } else {
        if (action.newsItem.id == notifications.news.lastNotification.id) {
          return state;
        }
        notifications.news.lastNotification = action.newsItem;
        if (window.Notification) {
          if (state.supported && state.verified && state.permitted) {
            const n = new Notification('A News was added!', {
              body: action.newsItem.title,
              icon: '/images/icon-48.png',
            });
            n.onclick = () => {
              window.open().close();
              window.focus();
              if (hashHistory.getCurrentLocation().pathname != '/news') {
                hashHistory.push('/news');
              }

              n.close();
            };
          }
        }

        return { ...state, notifications };
      }

    default:
      return state;
  }
};
