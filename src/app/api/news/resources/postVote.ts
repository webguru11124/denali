import { request } from '../../request';

interface PostVoteRequest {
  pollId: number;
  answerId: number;
}

const postVote = ({ pollId, answerId }: PostVoteRequest) =>
  request().patch(`/api/v1/polls/${pollId}/answers/${answerId}/vote`);

export default postVote;
