import i18n from 'app/internationalization/';
import { z } from 'zod';

import { password as passwordRule } from '../rules';

const changePasswordSchema = z
  .object({
    password: passwordRule('Password'),
    passwordConfirmation: z.string(),
  })
  .refine(
    ({ password, passwordConfirmation }) => password === passwordConfirmation,
    {
      message: `${i18n.t('formErrors.Passwords do not match')}`,
      path: ['passwordConfirmation'],
    }
  );

export default changePasswordSchema;
