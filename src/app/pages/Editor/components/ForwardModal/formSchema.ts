import { z } from 'zod';

const schema = z.object({
  tennants: z.array(z.number()).min(1),
  comment: z.string(),
});

type FormFields = z.infer<typeof schema>;

export { schema };
export type { FormFields };
