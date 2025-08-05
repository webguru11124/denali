import { request } from '../../request';
import { WikiArticleResponseProps } from '../types';

const getWikiArticle = (id: number) =>
  request().get<WikiArticleResponseProps>(`/api/v2/wikiPages/${id}`);

export default getWikiArticle;
