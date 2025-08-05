import { request } from '../../request';
import { SocialPostResponse } from '../types';

const getSocialPost = (postId: number) =>
  request().get<SocialPostResponse>(`/api/v1/socialFeed/${postId}`);

export default getSocialPost;
