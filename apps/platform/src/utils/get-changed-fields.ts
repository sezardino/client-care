export const getChangedFields = <T extends Record<string, unknown>>(
  original: T,
  updated: T,
  includeNewFields = false
): Partial<T> => {
  const changes: Partial<T> = {};

  for (const key in original) {
    if (original.hasOwnProperty(key)) {
      const originalValue = original[key];
      const updatedValue = updated[key];

      if (!areEqual(originalValue, updatedValue)) {
        changes[key] = updatedValue;
      }
    }
  }

  if (includeNewFields) {
    for (const key in updated) {
      if (updated.hasOwnProperty(key) && !(key in original)) {
        changes[key] = updated[key];
      }
    }
  }

  return changes;
};

const areEqual = (a: unknown, b: unknown): boolean => {
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((value, index) => areEqual(value, b[index]));
  }

  return a === b;
};
