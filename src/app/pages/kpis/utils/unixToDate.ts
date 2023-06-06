const unixToDate = (unix?: number | null): Date | null => {
  if (unix) {
    return new Date(new Date(unix * 1000).toISOString().slice(0, 10));
  }
  return null;
};

export default unixToDate;
