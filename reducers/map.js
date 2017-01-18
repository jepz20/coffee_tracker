const defaultOptions = {
  strokeWidth: 1,
  stroke: '#5D4037',
  strokeOpacity: '0.8',
  fill: '#6CC8C1',
  fillOpacity: '0.3',
};
const defaultState = {
  defaultCenter: [13.936027, -87.343609],
  defaultZoom: 16,
  bounds: [],
  markers: {},
  loaded: false,
  hasData: true,
  possibleColors: [
    '#C62828', '#6A1B9A', '#E8EAF6', '#00838F', '#00796B',
  ],
  options: defaultOptions,
};

export default function(state=defaultState, action) {
  const { mapDetails } = action;
  switch (action.type) {
    case 'BOUNDS_CHANGED':
      return { ...state, center: action.center, zoom: action.zoom, bounds: action.bounds };
    case 'SET_MAP_DETAIL':
      if (!mapDetails) {
        return { ...state, hasData: false, loaded: true };
      }

      const { coordinates, center, zoom } = mapDetails;
      return { ...state, coordinates, center, zoom, loaded: true, hasData: true };
    default:
      return state;
  }
};
