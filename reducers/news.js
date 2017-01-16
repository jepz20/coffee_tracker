const defaultState = {
  newsFeed: {},
  lastQueryKey: -1,
  hasMoreItems: false,
  loading: false,
  firstLoad: true,
  resetLastQuery: true,
};

export default function(state=defaultState, action) {
  switch (action.type) {
    case 'SET_NEWS_FEED':
      let newsFeed = { ...state.newsFeed };
      let lastQueryKey = state.lastQueryKey;
      let hasMoreItems = true;
      let resetLastQuery = state.resetLastQuery;

      if (state.lastQueryKey == action.newsKey) {
        hasMoreItems = false;
      };

      if (state.resetLastQuery) {
        lastQueryKey = action.newsKey;
        resetLastQuery = false;
      };

      newsFeed[action.newsKey] = action.newsItem;
      return {
        ...state, newsFeed,
        lastQueryKey, hasMoreItems,
        resetLastQuery,
        loading: false, firstLoad: false,
      };
    case 'SET_RESET_LAST_QUERY':
      console.log('CALLING WAS NEEDED');
      return { ...state, resetLastQuery: true, loading: true };
    default:
      return state;
  }
};
