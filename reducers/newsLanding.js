const defaultState = {
  loading: true,
  newsDetail: {},
};

export default function(state=defaultState, action) {
  switch (action.type) {
    case 'RECEIVE_NEWS_LANDING_DETAIL':
      console.log('aqui!', action);
      return { newsDetail: action.newsDetail, loading: false };
    default:
      return state;
  }
}
