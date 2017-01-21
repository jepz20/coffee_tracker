const defaultState = [
  {
    name: `One Time`,
    id: 0,
    repeat: false,
  }, {
    name: `Every X Days`,
    id: 1,
    repeat: true,
    unit: 'days',
  }, {
    name: `Every X Weeks`,
    id: 2,
    repeat: true,
    unit: 'weeks',
  }, {
    name: `Every X Months`,
    id: 3,
    repeat: true,
    unit: 'months',
  }, {
    name: `Every X Years`,
    id: 4,
    repeat: true,
    unit: 'years',
  },
];

export default function(state=defaultState, action) {
  switch (action.type) {
    case 'SET_EVENTS_FREQUENCUES':
      return action.eventFrequencies;
    default:
      return state;
  }
};
