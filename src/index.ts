import {
  createOutputData,
  getFileWithDefault,
  readInputFromFile,
  writeOutputToFile,
} from './file';
import { followingSchema, relationshipSchema } from './schema';

/**
 * Driver code to run the whole project.
 *
 * @returns Output data.
 */
function main() {
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

  // Do a mapping algorithm to find people who do not follow back in `unfollowers` variable.
  const followers = new Set(parsedFollowers);
  const following = new Set(parsedFollowing);
  const unfollowers = parsedFollowing.filter((value) => !followers.has(value));

  // Create a data aggregation.
  const output = createOutputData(unfollowers, followers, following);

  // Write the results to JSON file.
  writeOutputToFile(output, OUTPUT_FILENAME);

  // Return our output.
  return output;
}

/**
 * Simulates 'function main()' in most programming languages.
 */
if (require.main === module) {
  try {
    main();
    console.log('Program has finished running successfully.');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
