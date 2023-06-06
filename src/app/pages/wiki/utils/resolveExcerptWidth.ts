const resolveExcerptWidth = (screenSize: '2xl' | 'xl' | 'lg' | 'md' | 'sm') => {
  if (screenSize === '2xl') return 120;
  if (screenSize === 'xl') return 80;
  if (screenSize === 'lg') return 250;

  return 120;
};

export default resolveExcerptWidth;
