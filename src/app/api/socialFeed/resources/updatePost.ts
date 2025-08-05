import { request } from '../../request';
import { UpdatePostData } from '../types';

const updatePost = (
  id: number,
  { languageId, filesToAdd, filesToRemove, ...rest }: UpdatePostData
) =>
  request().put(`/api/v1/socialFeed/${id}`, {
    language_id: languageId,
    filesToAdd: JSON.stringify(filesToAdd),
    files_removed: JSON.stringify(filesToRemove),
    ...rest,
  });

export default updatePost;
