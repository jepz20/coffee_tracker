const defaultOptions = {
  strokeWidth: 1,
  stroke: '#5D4037',
  strokeOpacity: '0.8',
  fill: '#6CC8C1',
  fillOpacity: '0.3',
};
const defaultState = {
  defaultCenter: [13.936027, -87.343609],
  center: [13.936027, -87.343609],
  zoom: 17,
  defaultZoom: 17,
  bounds: [],
  markers: {},
  possibleColors: [
    '#C62828', '#6A1B9A', '#E8EAF6',
  ],
  coordinates: {
    coords:
    [
      [
        { lat: 13.938102, lng: -87.344736 },
        { lat: 13.936898, lng: -87.342255 },
        { lat: 13.933626, lng: -87.343429 },
        { lat: 13.934186, lng: -87.345340 },
        { lat: 13.938102, lng: -87.344736 },
      ],
      [
        { lat: 13.938102, lng: -87.344736 },
        { lat: 13.936898, lng: -87.342255 },
        { lat: 13.934186, lng: -87.345340 },
        { lat: 13.938102, lng: -87.344736 },
      ],
      [
        { lat: 13.938102, lng: -87.344736 },
        { lat: 13.936898, lng: -87.342255 },
        { lat: 13.933626, lng: -87.343429 },
        { lat: 13.938102, lng: -87.344736 },
      ],
    ],
    options: defaultOptions,
  },
};

export default function(state=defaultState, action) {
  const { key, geolocationData } = action;
  let markers =  { ...state.markers };
  switch (action.type) {
    case 'SET_GEOLOCATION_DETAIL':
      return geolocationData;
    case 'UPDATE_EMPLOYEES':
      markers[key].totalEmployees++;
      return { ...state, markers };
    case 'CENTER_CHANGE':
      const { center } = action;
      return { ...state, center };
    case 'SELECTED_KEY_CHANGE':
      markers[key].selected = !markers[key].selected;
      return { ...state, markers };
    case 'BOUNDS_CHANGED':
      return { ...state, center: action.center, zoom: action.zoom, bounds: action.bounds };
    default:
      return state;
  }
};
