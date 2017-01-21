const defaultState = [
  {
    name: `Fertilization`,
    id: 0,
  }, {
    name: `Pest Control`,
    id: 1,
  }, {
    name: `Harvest`,
    id: 2,
  },
];

export default function(state=defaultState, action) {
  switch (action.type) {
    case 'SET_EVENTS_TYPES':
      return action.eventTypes;
    default:
      return state;
  }
};
