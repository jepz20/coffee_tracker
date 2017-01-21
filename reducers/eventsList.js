const defaultState = {
  detail: [],
  loading: true,
};

export default function(state=defaultState, action) {
  switch (action.type) {
    case 'SET_EVENTS_LIST':
      return {
        ...state,
        detail: action.expensesList,
        loading: false,
      };
    default:
      return state;
  }
};
