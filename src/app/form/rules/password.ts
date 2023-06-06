import i18n from 'app/internationalization/';
import { z } from 'zod';

const password = (fieldName: string) =>
  z
    .string({
      required_error: `${i18n.t('formErrors.{{name}} cannot be empty', {
        name: fieldName,
      })}`,
    })
    .min(1)
    .regex(
      /.*[A-Z].*/,
      `${i18n.t(
        'formErrors.{{name}} must contain at least one capital letter',
        {
          name: fieldName,
        }
      )}`
    )
    .regex(
      /\d/,
      `${i18n.t('formErrors.{{name}} must contain at least one number', {
        name: fieldName,
      })}`
    );

export default password;
