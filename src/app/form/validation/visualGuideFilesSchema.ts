import i18n from 'app/internationalization/';
import { z } from 'zod';

const validMediaTypes = ['image', 'video'];

const visualGuideFilesSchema = z.object({
  files: z.array(
    z.object({
      file: z
        .instanceof(File)
        .refine(
          (data) => validMediaTypes.includes(data.type.split('/')[0]),
          `${i18n.t('formErrors.Uploaded file is not an image of video')}`
        ),
      id: z.string(),
    })
  ),
});

export default visualGuideFilesSchema;
