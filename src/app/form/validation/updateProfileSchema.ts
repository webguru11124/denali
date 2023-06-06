import i18n from 'app/internationalization/';
import { z } from 'zod';

import * as rules from '../rules';

const updateProfileSchema = z.object({
  first_name: z
    .string()
    .min(1, { message: `${i18n.t('formErrors.Your name must be longer')}` }),
  last_name: z
    .string()
    .min(1, { message: `${i18n.t('formErrors.Last name must be longer')}` }),
  phone: rules.phone(),
  translation_language: z
    .string({
      required_error: `${i18n.t(
        'formErrors.Please select default translation language'
      )}`,
    })
    .min(1),
});

export default updateProfileSchema;
