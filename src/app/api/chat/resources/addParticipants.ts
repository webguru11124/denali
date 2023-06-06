import { request } from '../request';

const addParticipants = (id: string, participantIds: Array<number>) =>
  request().patch(`/api/thread/${id}`, {
    participants: {
      addedIds: participantIds,
    },
  });

export default addParticipants;
