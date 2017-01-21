export const getTimestampFromStr = text => {
  const newDate = new Date(text);
  newDate.setDate(newDate.getDate() + 1);
  return newDate.getTime() / 1000;
};
