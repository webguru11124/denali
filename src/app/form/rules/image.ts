import i18n from 'app/internationalization/';
import { z } from 'zod';

const validImageTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];

const image = () =>
  z
    .instanceof(File)
    .refine(
      (data) => validImageTypes.includes(data.type),
      `${i18n.t('formErrors.Uploaded file is not an image')}`
    );

export default image;
