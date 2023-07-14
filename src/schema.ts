import { z } from 'zod';

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
  .transform((arg) =>
    // Have to use type guard (not type assertion) to tell TypeScript that this is really a string.
    // https://www.benmvp.com/blog/filtering-undefined-elements-from-array-typescript/
    arg.filter((data): data is string => typeof data !== undefined),
  );

export const followingSchema = z
  .object({ relationships_following: relationshipSchema })
  .transform((schema) => schema.relationships_following);
