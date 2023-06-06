import i18n from 'app/internationalization/';
import { z } from 'zod';

const chatGroupNameSchema = (maxTitleLength: number) =>
  z.object({
    name: z
      .string()
      .min(1, `${i18n.t('formErrors.Enter group name')}`)
      .max(
        maxTitleLength,
        `${i18n.t(
          'formErrors.Group name cannot be longer than {{maxLength}} symbols',
          {
            maxLength: maxTitleLength,
          }
        )}`
      ),
  });

export default chatGroupNameSchema;
