/**
 * Exclude keys from object
 * @param obj
 * @param keys
 * @returns
 */
const exclude = <Type, Key extends keyof Type>(obj: Type, keys: Key[]): Omit<Type, Key> => {
  const result: Partial<Type> = { ...obj };
  keys.forEach(key => {
    delete result[key];
  });
  return result as Omit<Type, Key>;
};

export default exclude;
