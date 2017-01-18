const defaultState = {
  activeTab: 0,
  tabs: [
    {
      label: 'Map',
      icon: 'fa fa-map',
      index: 0,
      route: 'map',
    }, {
      label: 'Budget',
      icon: 'fa fa-money',
      index: 1,
      route: 'budget',
    }, {
      label: 'Events',
      icon: 'fa fa-clock-o',
      index: 2,
      route: 'events',
    }, {
      label: 'Graphs',
      icon: 'fa fa-bar-chart',
      index: 3,
      route: 'graphs',
    },
  ],
};

export default function(state=defaultState, action) {
  const { tabs, activeTab } = action;
  switch (action.type) {
    case 'SET_ACTIVE_TAB':
      return {
        ...state,
        activeTab,
      };
    case 'SET_ACTIVE_TAB_FROM_ROUTE':
      const { route } = action;
      let activeTab = 0;
      if (state.tabs) {
        let match = state.tabs.filter(tab => tab.route == action.route);
        if (match && match.length > 0) activeTab = match[0].index;
      };

      return {
        ...state,
        activeTab,
      };
    default:
      return state;
  }
};
