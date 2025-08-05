const tryParseJson = <T>(
  value: string
): { success: boolean; data: T | null } => {
  try {
    const data = JSON.parse(value);
    return { success: true, data };
  } catch (e) {
    return { success: false, data: null };
  }
};

export default tryParseJson;
