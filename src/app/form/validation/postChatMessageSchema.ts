import { z } from 'zod';

const postChatMessageSchema = z.object({
  text: z.string(),
});

export default postChatMessageSchema;
