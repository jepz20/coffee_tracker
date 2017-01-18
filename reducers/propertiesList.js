const defaultState = {
  loading: true,
  hasData: true,
};

export default function(state=defaultState, action) {
  const { allProperties } = action;
  switch (action.type) {
    case 'SET_ALL_PROPERTIES':
      return { ...state, allProperties, loading: false };
    default:
      return state;
  }
};
