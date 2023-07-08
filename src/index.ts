import { z } from 'zod';

import {
  createOutputData,
  getFileWithDefault,
  readInputFromFile,
  writeOutputToFile,
} from './file';
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

/**
 * Driver code to run the whole project.
 *
 * @returns Output data
 */
async function main() {
  // Get optional values from environment variables.
  const { FOLLOWING_FILENAME, FOLLOWERS_FILENAME, OUTPUT_FILENAME } =
    process.env;

  // Set the paths for inputs.
  const followersPath = getFileWithDefault(
    FOLLOWERS_FILENAME,
    'followers_1.json',
  );
  const followingPath = getFileWithDefault(
    FOLLOWING_FILENAME,
    'following.json',
  );

  // Fetches all followers and following.
  const rawFollowers = readInputFromFile(followersPath);
  const rawFollowing = readInputFromFile(followingPath);

  // Make sure the data type is according to our expectations.
  const parsedFollowers = relationshipSchema.parse(rawFollowers);
  const parsedFollowing = followingSchema.parse(rawFollowing);

  // Do a mapping algorithm to find people who do not follow back.
  const followers = new Set(parsedFollowers);
  const unfollowers = parsedFollowing.filter((value) => !followers.has(value));

  // Create a data aggregation.
  const output = createOutputData(unfollowers);

  // Write the results to JSON file.
  writeOutputToFile(output, OUTPUT_FILENAME);

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
