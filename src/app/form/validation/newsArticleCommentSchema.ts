import i18n from 'app/internationalization/';
import { z } from 'zod';

const newsArticleCommentSchema = z.object({
  comment: z
    .string()
    .min(1, { message: `${i18n.t('formErrors.Please leave a comment')}` }),
});

export default newsArticleCommentSchema;
