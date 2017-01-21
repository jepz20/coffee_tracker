const defaultState = {
  detail: [],
  loading: true,
};

export default function(state=defaultState, action) {
  switch (action.type) {
    case 'SET_EXPENSE_DETAIL':
      return {
        ...state,
        detail: action.expenseDetail,
        loading: false,
      };
    default:
      return state;
  }
};
