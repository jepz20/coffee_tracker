const defaultState = {
  detail: [],
  loading: true,
};

export default function(state=defaultState, action) {
  switch (action.type) {
    case 'SET_EXPENSES_CATEGORIES':
      return {
        ...state,
        detail: action.expensesCategories,
        loading: false,
      };
    default:
      return state;
  }
};
