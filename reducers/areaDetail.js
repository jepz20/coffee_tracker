const defaultState = {
  show: false,
  info: {
    text: 'hola',
    textomas: 'junigatsu',
  },
};

export default function(state=defaultState, action) {
  switch (action.type) {
    case 'SET_ACTION_DETAIL':
      return { info: action.info, show: true };
    case 'HIDE_AREA_DETAIL':
      return { ...state, show: false };
    default:
      return state;
  }
};
