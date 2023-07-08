/**
 * Returns value stored in environment variable with the given 'name'.
 * Throws error if no such variable or if variable undefined; thus ensuring type-safety.
 *
 * @param name - Name of variable to fetch from this process's environment
 */
export function env(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: '${name}'.`);
  }

  return value;
}

/**
 * Strips `undefined` values from an array to prevent unexpected behaviors.
 *
 * @param array - A generic list of strings that can contain `undefined`.
 * @returns An array of strings without `undefined`.
 */
export function stripUndefinedFromArray(array: (string | undefined)[]) {
  return array.filter((data): data is string => typeof data !== undefined);
}
