import i18n from 'app/internationalization/';
import { z } from 'zod';

const validMediaTypes = ['video'];

const videosSchema = z.array(
  z
    .instanceof(File)
    .refine(
      (data) => validMediaTypes.includes(data.type.split('/')[0]),
      `${i18n.t('formErrors.Uploaded file is not a video')}`
    )
);

export default videosSchema;
