import { request } from '../../request';
import { ArticleSeenByTeamResponse } from '../types';

const getArticleSeenTeams = (articleId: number) =>
  request().get<ArticleSeenByTeamResponse>(
    `/api/v1/news-feed/${articleId}/seen/by-teams`
  );

export default getArticleSeenTeams;
