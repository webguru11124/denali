import { AvailableParticipant } from 'app/api/chat/types';

interface UserSelectHandlerSettings {
  maxParticipantCount: number;
  setValue: (
    callback: (prev: Array<AvailableParticipant>) => Array<AvailableParticipant>
  ) => void;
  onError: (error: 'max-exceeded' | undefined) => void;
}
const createUserSelectHandler =
  ({ maxParticipantCount, setValue, onError }: UserSelectHandlerSettings) =>
  (selectedValue: AvailableParticipant): void => {
    const getNextMembers = (
      previousParticipants: Array<AvailableParticipant>,
      selectedParticipant: AvailableParticipant
    ) => {
      const pluckedIds = previousParticipants.map((o) => o.id);
      if (pluckedIds.includes(selectedParticipant.id)) {
        return previousParticipants.filter(
          ({ id }) => id !== selectedParticipant.id
        );
      }

      return [...previousParticipants, selectedParticipant];
    };
    setValue((prevState) => {
      const nextMembers = getNextMembers(prevState, selectedValue);

      if (nextMembers.length >= maxParticipantCount) {
        onError('max-exceeded');
        return prevState;
      }

      onError(undefined);

      return nextMembers;
    });
  };

export default createUserSelectHandler;
