import { request } from '../../request';
import { CreatePostData } from '../types';

const postSocialPost = ({ languageId, filesToAdd, ...rest }: CreatePostData) =>
  request().post('/api/v1/socialFeed', {
    ...rest,
    filesToAdd: JSON.stringify(filesToAdd),
    language_id: languageId,
  });

export default postSocialPost;
