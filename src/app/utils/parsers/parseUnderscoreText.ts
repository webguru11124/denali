const parseUnderscoreText = (text: string) => {
  return text
    .replace(/\.?([A-Z])/g, function (x, y: string) {
      return '_' + y.toLowerCase();
    })
    .replace(/^_/, '');
};
export default parseUnderscoreText;
