import { z } from 'zod';

import { image } from '../rules';

const updateProfilePictureSchema = z.object({
  image: image(),
});

export default updateProfilePictureSchema;
