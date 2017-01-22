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

export const pad = (n, width=2, z=0) => {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};
