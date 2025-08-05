import { Response } from 'app/api/types';

import { request } from '../../request';
import { ArticleCollaborator } from '../types';

const getArticleCollaborators = (role: string, permissions: string) =>
  request().get<Response<Array<ArticleCollaborator>>>(`/api/v1/users`, {
    params: {
      role,
      permissions,
    },
  });

export { getArticleCollaborators };
export default getArticleCollaborators;
