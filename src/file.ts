import fs from 'fs';
import path from 'path';

/**
 * Represents the type used as the output.
 */
type Output = { count: number; unfollowers: string[] };

/**
 * Creates an output data based on your unfollowers.
 *
 * @param unfollowers - Your unfollowers's usernames. This is an array.
 * @returns An object of type 'Output'.
 */
export function createOutputData(unfollowers: string[]) {
  return { count: unfollowers.length, unfollowers };
}

/**
 * Writes an output to a JSON file in 'out' folder in the root of the project.
 * It will throw an error on insufficient file permissions.
 *
 * @param output - Output data that is ready to be processed.
 */
export function writeOutputToFile(output: Output) {
  const outputPath = path.join(__dirname, '..', 'out', 'output.json');
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
