/**
 * Returns value stored in environment variable with the given 'name'.
 * Throws error if no such variable or if variable undefined; thus ensuring type-safety.
 *
 * @param name - Name of variable to fetch from this process's environment.
 */
export function env(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: '${name}'.`);
  }

  return value;
}
