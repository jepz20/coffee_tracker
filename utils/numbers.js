export const formatNumber = value => {
  try {
    parseInt(value);
  } catch (_) {
    return value;
  }

  if (value) {
    return parseInt(value).toFixed(2).replace(/./g, function (c, i, a) {
      return i && c !== '.' && ((a.length - i) % 3 === 0) ? ',' + c : c;
    });
  }

  return value;
};
