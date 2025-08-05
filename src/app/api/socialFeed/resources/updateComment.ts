import { request } from '../../request';

interface Data {
  content: string;
}

const updateComment = (postId: number, commentId: number, data: Data) =>
  request().put(`/api/v1/socialFeed/${postId}/comments/${commentId}`, {
    ...data,
  });

export default updateComment;
