import { request } from '../../request';
import { SocialFeedResponse, GetSocialFeedRequest } from '../types';

const getSocialFeed = ({
  page,
  perPage = 10,
  languageId,
}: GetSocialFeedRequest) =>
  request().get<SocialFeedResponse>('/api/v1/socialFeed', {
    params: {
      page,
      per_page: perPage,
      language_id: languageId,
    },
  });

export default getSocialFeed;
