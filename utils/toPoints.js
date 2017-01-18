/*
 base on
 https://github.com/lucasmogari/google-map-react-example/blob/master/script/functions/toPoints.js
*/

const TILE_SIZE = 256;

const world2Screen = ({ x, y }, zoom) => {
  const scale = Math.pow(2, zoom);
  return {
    x: x * scale * TILE_SIZE,
    y: y * scale * TILE_SIZE,
  };
};

const latLng2World = _ref => {
  var lat = _ref.lat;
  var lng = _ref.lng;

  var sin = Math.sin(lat * Math.PI / 180);
  var x = lng / 360 + 0.5;
  var y = 0.5 - 0.25 * Math.log((1 + sin) / (1 - sin)) / Math.PI;

  y = y < -1
      ? -1 : y > 1 ? 1 : y;
  return { x, y };
};

export default function(lat, lng, zoom) {
  const coords = latLng2World({ lat, lng });
  return world2Screen(coords, zoom);
}
