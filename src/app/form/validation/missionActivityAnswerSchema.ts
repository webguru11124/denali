import i18n from 'app/internationalization/';
import { z } from 'zod';

const missionActivityAnswerSchema = z.object({
  answer: z
    .string()
    .min(1, { message: `${i18n.t('formErrors.Answer cannot be empty')}` }),
});

export default missionActivityAnswerSchema;
