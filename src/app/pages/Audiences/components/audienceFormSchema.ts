import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1),
  locations: z.array(z.number()).min(1),
  professions: z.array(z.number()),
});

type FormFields = z.infer<typeof schema>;

export { schema };
export type { FormFields };
