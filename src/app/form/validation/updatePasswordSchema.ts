import i18n from 'app/internationalization/';
import { z } from 'zod';

import { password as passwordRule } from '../rules';

const updatePasswordSchema = z
  .object({
    current_password: z.string().nonempty({
      message: `${i18n.t('formErrors.Please enter your current password')}`,
    }),
    password: passwordRule('Password'),
    password_confirmation: z.string(),
  })
  .refine(
    ({
      password,
      password_confirmation: passwordConfirmation,
    }: {
      password: string;
      password_confirmation: string;
    }) => password === passwordConfirmation,
    {
      path: ['password_confirmation'],
      message: `${i18n.t('formErrors.Passwords do not match')}`,
    }
  );

export default updatePasswordSchema;
