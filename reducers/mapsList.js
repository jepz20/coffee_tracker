const defaultState = {
  loaded: false,
  hasData: true,
};

export default function(state=defaultState, action) {
  const { allMaps } = action;
  switch (action.type) {
    case 'SET_ALL_MAPS':
      return { ...state, allMaps, loaded: true };
    default:
      return state;
  }
};
