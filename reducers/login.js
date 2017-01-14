const defaultState = {
  showLogin: true,
  userInfo: {},
  loginError: '',
};

export default function(state=defaultState, action) {
  switch (action.type) {
    case 'SET_CREATED_USER':
      console.log(action.createdUserInfo);
      return state;
    case 'SET_USER_CREDENTIAL':
      console.log(action.userInfo);
      if (action.userInfo.status == 'success') {
        console.log('proceed with login');
      } else {
        return { ...state, loginError: action.userInfo.error.message };
      }

      return state;
    case 'TOGGLE_SHOW_LOGIN':
      let showLogin = !state.showLogin;
      return { ...state, showLogin };
    default:
      return state;
  }
};
