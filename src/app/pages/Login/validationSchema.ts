import i18n from 'app/internationalization/';
import { z } from 'zod';

const loginEmailSchema = z.object({
  email: z.string().email(),
});

const loginPasswordSchema = z.object({
  password: z
    .string()
    .min(3, `${i18n.t('formErrors.Please enter your password')}`),
});

export { loginEmailSchema, loginPasswordSchema };
