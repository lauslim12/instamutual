import fs from 'fs';
import type { AccountFollowingFeedResponseUsersItem } from 'instagram-private-api';
import path from 'path';

/**
 * Represents the type used as the output.
 */
type Output = {
  count: number;
  unfollowers: AccountFollowingFeedResponseUsersItem[];
  usernames: string[];
};

/**
 * Creates an output data based on your unfollowers.
 *
 * @param unfollowers - Your unfollowers
 * @returns An object of type 'Output'
 */
export function createOutputData(
  unfollowers: AccountFollowingFeedResponseUsersItem[]
): Output {
  const count = unfollowers.length;
  const usernames = unfollowers.map(({ username }) => username);

  return { count, unfollowers, usernames };
}

/**
 * Writes an output to a JSON file in 'out' folder in the root of the project.
 *
 * @param output - Output data that is ready to be processed
 */
export function writeOutputToFile(output: Output) {
  const outputPath = path.join(__dirname, '..', 'out', 'output.json');
  const outputFile = JSON.stringify(output, null, 2);

  fs.writeFileSync(outputPath, outputFile);
}
