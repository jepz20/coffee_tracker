const defaultState = {
  supported: true,
  permitted: true,
  verified: false,
  notifications: {},
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
    default:
      return state;
  }
};
