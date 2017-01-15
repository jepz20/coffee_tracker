const defaultState = {
  showLogin: true,
  userInfo: {},
  logged: true,
  loginError: '',
};

export default function(state=defaultState, action) {
  switch (action.type) {
    case 'SET_CREATED_USER':
      if (action.userInfo.status == 'success') {
        return state;
      } else {
        return { ...state, loginError: action.userInfo.error.message };
      }

    case 'DO_LOGIN':
      if (action.userInfo.status == 'success') {
        return state;
      } else {
        return { ...state, loginError: action.userInfo.error.message };
      }

      return state;
    case 'SET_LOGIN_SCREEN':
      return { ...state, showLogin: true, loginError: '' };
    case 'SET_REGISTER_SCREEN':
      return { ...state, showLogin: false, loginError: '' };
    default:
      return state;
  }
};
