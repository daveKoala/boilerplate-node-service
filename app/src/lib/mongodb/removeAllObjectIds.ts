export const removeAllObjectIds = <T extends Record<string, unknown>>(
  obj: T
): T => {
  try {
    Object.keys(obj).forEach((key) => {
      if (['_id', '_updatedAt', '_createdAt'].some((i) => i === key)) {
        delete obj[key];
        return;
      }

      if (obj[key] && typeof obj[key] === 'object') {
        removeAllObjectIds(obj[key] as Record<string, unknown>);
      }
    });
    return obj;
  } catch (error) {
    return obj;
  }
};
