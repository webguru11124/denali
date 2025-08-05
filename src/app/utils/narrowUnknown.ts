const narrowUnknown = (value: unknown): string | undefined | null => {
  if (value === null) return null;
  if (typeof value === 'undefined') return value;
  if (typeof value === 'function') {
    const functionName = value.name || '(anonymous)';
    return `[function ${functionName}]`;
  }

  if (value instanceof Date) return value.toISOString();

  return String(value);
};

export { narrowUnknown };
export default narrowUnknown;
