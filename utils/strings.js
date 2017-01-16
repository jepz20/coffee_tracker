export const limitText = (text, size) => {
  if (text.length < size) {
    return text;
  };

  let limitedText = text.substring(0, size - 3);
  if (limitedText.length == size - 3) {
    limitedText = limitedText + '...';
  };

  return limitedText;
};
