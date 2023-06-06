import i18n from 'app/internationalization/';
import { z } from 'zod';

const validationSchema = z.object({
  content: z.string().min(1, `${i18n.t('formErrors.Article cannot be empty')}`),
});

export default validationSchema;
