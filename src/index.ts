import path from 'node:path';

import { z } from 'zod';

import { createOutputData, readInputFromFile, writeOutputToFile } from './file';
import { stripUndefinedFromArray } from './utils';

export const relationshipSchema = z
  .array(
    z
      .object({ string_list_data: z.array(z.object({ value: z.string() })) })
      .transform(({ string_list_data }) => {
        // In an unlikely scenario that the data is not there, mark it as undefined.
        // We will strip it separately in the next step.
        if (!string_list_data[0]) {
          return undefined;
        }

        return string_list_data[0].value;
      }),
  )
  .transform(stripUndefinedFromArray);

export const followingSchema = z
  .object({ relationships_following: relationshipSchema })
  .transform((schema) => schema.relationships_following);

const FOLLOWERS_FILE_PATH = path.join(
  __dirname,
  '..',
  'input',
  'followers_1.json',
);

const FOLLOWING_FILE_PATH = path.join(
  __dirname,
  '..',
  'input',
  'following.json',
);

/**
 * Driver code to run the whole project.
 *
 * @returns Output data
 */
async function main() {
  // Fetches all followers and following.
  const rawFollowers = readInputFromFile(FOLLOWERS_FILE_PATH);
  const rawFollowing = readInputFromFile(FOLLOWING_FILE_PATH);

  // Make sure the data type is according to our expectations.
  const parsedFollowers = relationshipSchema.parse(rawFollowers);
  const parsedFollowing = followingSchema.parse(rawFollowing);

  // Do a mapping algorithm to find people who do not follow back.
  const followers = new Set(parsedFollowers);
  const unfollowers = parsedFollowing.filter((value) => !followers.has(value));

  // Create a data aggregation.
  const output = createOutputData(unfollowers);

  // Write the results to JSON file.
  writeOutputToFile(output);

  // Return our output.
  return output;
}

/**
 * Simulates 'function main()' in most programming languages.
 */
if (require.main === module) {
  main()
    .then(() => {
      console.log('Program has finished running successfully.');
      process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
