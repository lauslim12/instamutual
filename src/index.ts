import { IgApiClient } from 'instagram-private-api';

import { createOutputData, writeOutputToFile } from './file';
import { getMyFollowers, getMyFollowings, getUnfollowers } from './instagram';
import { env } from './utils';

/**
 * Driver code to run the whole project.
 *
 * @returns Output data
 */
async function main() {
  // Initialize Instagram client with username and password.
  const ig = new IgApiClient();
  ig.state.generateDevice(env('IG_USERNAME'));

  // Try to do all activities without logging in, if possible.
  await ig.simulate.preLoginFlow();
  await ig.account.login(env('IG_USERNAME'), env('IG_PASSWORD'));

  // If trying to search another account's followers and followings.
  const targetUserId = process.env.IG_TARGET
    ? (await ig.user.searchExact(process.env.IG_TARGET)).pk
    : ig.state.cookieUserId;

  // Fetches all of followers and followings.
  const followers = await getMyFollowers(ig, targetUserId);
  const followings = await getMyFollowings(ig, targetUserId);

  // Get all of unfollowers.
  const unfollowers = getUnfollowers(followers, followings);

  // Create data aggregation.
  const output = createOutputData(unfollowers);

  // Write to JSON file.
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
