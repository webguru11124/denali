import i18n from 'app/internationalization/';
import { z } from 'zod';

const MIN_LENGTH = 5;

const newPostSchema = z.object({
  content: z.string().min(MIN_LENGTH, {
    message: `${i18n.t(
      'formErrors.Post must contain at least {{minLength}} characters'
    )}`,
  }),
});

export default newPostSchema;
