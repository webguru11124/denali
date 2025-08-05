import { z } from 'zod';

export const MAX_TITLE_LENGTH = 21;

const schema = z.object({
  image: z.object({
    type: z.string(),
    url: z.string().min(2),
    name: z.string(),
    id: z.optional(z.string()),
  }),
  titles: z.array(
    z.object({
      isMain: z.boolean(),
      value: z.string().min(3).max(MAX_TITLE_LENGTH),
      code: z.string().min(2).max(2),
    })
  ),
  notify: z.boolean(),
});

type FormFields = z.infer<typeof schema>;

export { schema };
export type { FormFields };
