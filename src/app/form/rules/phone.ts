import i18n from 'app/internationalization/';
import { z } from 'zod';

const regExp = /^\+(?:[0-9]●?){6,14}[0-9]$/;

const phone = (message: string = i18n.t('formErrors.PhoneCountryPrefix')) =>
  z.string().regex(regExp, { message });

export default phone;
