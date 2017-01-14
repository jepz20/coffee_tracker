const defaultState = '/';

export default function(state=defaultState, action) {
  switch (action.type) {
    case 'SET_LAST_ROUTE':
      return action.route;
    default:
      return state;
  }
};
