import type {
  AccountFollowersFeedResponseUsersItem,
  AccountFollowingFeedResponseUsersItem,
  Feed,
  IgApiClient,
} from 'instagram-private-api';

/**
 * Gets all items from feed. This is essential as the data is paginated.
 * This function unwraps the pagination and concats all data into one array.
 *
 * @param feed - A feed data
 * @returns Awaitable data to get an array with type 'T'
 */
export async function getAllItemsFromFeed<T>(feed: Feed<any, T>): Promise<T[]> {
  let items: any[] = [];

  do {
    items = items.concat(await feed.items());
  } while (feed.isMoreAvailable());

  return items;
}

/**
 * Gets all followers of an account.
 *
 * @param ig - Instagram API client
 * @param uid - Target user ID to be searched for
 * @returns All of your followers
 */
export async function getMyFollowers(
  ig: IgApiClient,
  uid: string | number
): Promise<AccountFollowersFeedResponseUsersItem[]> {
  const followersFeed = ig.feed.accountFollowers(uid);
  const allFollowers = await getAllItemsFromFeed(followersFeed);

  return allFollowers;
}

/**
 * Gets all followings of an account.
 *
 * @param ig - Instagram API client
 * @param uid - Target user ID to be searched for
 * @returns All of your followings
 */
export async function getMyFollowings(
  ig: IgApiClient,
  uid: string | number
): Promise<AccountFollowingFeedResponseUsersItem[]> {
  const followingsFeed = ig.feed.accountFollowing(uid);
  const allFollowings = await getAllItemsFromFeed(followingsFeed);

  return allFollowings;
}

/**
 * Gets the unfollowers of an account.
 * Unfollowers are people who do not follow you back.
 *
 * @param followers - All of the account's followers
 * @param followings - All of the account's followings
 * @returns All unfollowers of the account
 */
export function getUnfollowers(
  followers: AccountFollowersFeedResponseUsersItem[],
  followings: AccountFollowingFeedResponseUsersItem[]
) {
  const followersUsername = new Set(followers.map(({ username }) => username));
  const unfollowers = followings.filter(
    ({ username }) => !followersUsername.has(username)
  );

  return unfollowers;
}
