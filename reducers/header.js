const defaultState = {
  drawerOpen: false,
  title: '',
  titleIcon: '',
  githubLink: '',
  menuItems: [],
};

export default function(state=defaultState, action) {
  const { title, titleIcon, githubProject, githubLink, activeTab } = action;
  switch (action.type) {
    case 'SET_HEADER_VALUES':
      return {
        ...state,
        ...action.values,
      };
    case 'TOGGLE_DRAWER_OPEN':
      return { ...state, drawerOpen: !state.drawerOpen };
    case 'CLOSE_DRAWER':
      return { ...state, drawerOpen: false };
    default:
      return state;
  }
};
