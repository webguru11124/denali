import { request } from '../../request';
import { CommentData } from '../types';

const commentPost = (id: number, data: CommentData) =>
  request().post(`/api/v1/socialFeed/${id}/comments`, data);

export default commentPost;
