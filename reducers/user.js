const defaultState = {
  logged: -1,
  userInfo: {},
};

export default function(state=defaultState, action) {
  switch (action.type) {
    case 'SET_USER_INFO':
      return action.userInfo;
    default:
      return state;
  }
};
