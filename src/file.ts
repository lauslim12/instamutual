import fs from 'node:fs';
import path from 'node:path';

/**
 * Represents the type used as the output.
 */
type Output = {
  count: { followers: number; following: number; unfollowers: number };
  data: { followers: string[]; following: string[]; unfollowers: string[] };
};

/**
 * Declares a path from root. Concatenates it with `newPaths` to get
 * a normalized path aimed to a certain point in the filesystem.
 *
 * @param newPaths - New paths to be concatenated with the root path.
 * @returns Normalized path from the root.
 */
function declarePathFromRoot(...newPaths: string[]) {
  return path.join(__dirname, '..', ...newPaths);
}

/**
 * Creates an output data based on your unfollowers.
 *
 * @param unfollowers - Your unfollowers's usernames. This is an array.
 * @param followers - Your followers in a set format.
 * @param following - Your following in a set format.
 * @returns An object of type `Output`.
 */
export function createOutputData(
  unfollowers: string[],
  followers: Set<string>,
  following: Set<string>,
) {
  return {
    count: {
      followers: followers.size,
      following: following.size,
      unfollowers: unfollowers.length,
    },
    data: {
      followers: [...followers],
      following: [...following],
      unfollowers,
    },
  };
}

/**
 * Writes an output to a JSON file in `out` folder in the root of the project.
 * It will throw an error on insufficient file permissions.
 *
 * @param output - Output data that is ready to be processed.
 * @param name - Desired name of the output file.
 */
export function writeOutputToFile(output: Output, name: string | undefined) {
  const filename = name ? name : 'output.json';
  const outputPath = declarePathFromRoot('out', filename);
  const outputFile = JSON.stringify(output, null, 2);

  fs.writeFileSync(outputPath, outputFile);
}

/**
 * Reads an input from a JSON file. The file is assumed to be a valid JSON
 * and will throw an error if the parsing fails.
 *
 * @param filename - The filename of the input.
 */
export function readInputFromFile(filename: string) {
  const file = fs.readFileSync(filename, 'utf-8');
  return JSON.parse(file);
}

/**
 * Gets a file with a default fallback in case `name` is `undefined`. Used in conjunction with
 * environment variables to provide sensible defaults.
 *
 * @param name - Filename, usually fetched from environment variable so it could be `undefined`.
 * @param fallback - Default fallback if `name` does not exist.
 * @returns A normalized path of the file with the default filename if `name` happens to be `undefined`.
 */
export function getFileWithDefault(name: string | undefined, fallback: string) {
  const filename = name ? name : fallback;
  return declarePathFromRoot('input', filename);
}
