const formatChildCountTitle = (childCount: number) => {
  if (childCount === 1) return `${childCount} Page`;

  return `${childCount} Pages`;
};

export default formatChildCountTitle;
