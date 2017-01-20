const defaultState = {
  propertyDetail: {},
  loading: true,
};

export default function(state=defaultState, action) {
  switch (action.type) {
    case 'SET_PROPERTY_DETAIL':
      return {
        ...state,
        propertyDetail: action.propertyDetail,
        loading: false,
      };
    default:
      return state;
  }
};
