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
        console.log('proceed with login');
      } else {
        return { ...state, loginError: action.userInfo.error.message };
      }

    case 'DO_LOGIN':
      console.log(action.userInfo);
      if (action.userInfo.status == 'success') {
        return state;
      } else {
        return { ...state, loginError: action.userInfo.error.message };
      }

      return state;
    case 'TOGGLE_SHOW_LOGIN':
      let showLogin = !state.showLogin;
      return { ...state, showLogin, loginError: '' };
    default:
      return state;
  }
};
