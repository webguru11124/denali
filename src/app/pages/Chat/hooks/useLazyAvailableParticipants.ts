import { useState, useMemo } from 'react';

import useAvailableParticipants from './useAvailableParticipants';

interface Props {
  query: string;
  membersToExcludeIds?: Array<number>;
}

const useLazyAvailableParticipants = ({
  query,
  membersToExcludeIds,
}: Props) => {
  const { data, isLoading, isFetching, isError } =
    useAvailableParticipants(query);

  const [loadedParticipantsAmount, setLoadedParticipantsAmount] = useState(10);

  const loadedParticipants = useMemo(() => {
    if (!data) return [];

    if (!membersToExcludeIds) return data.slice(0, loadedParticipantsAmount);

    const filteredMembers = data.filter(
      ({ id: participantId }) => !membersToExcludeIds.includes(participantId)
    );

    return filteredMembers.slice(0, loadedParticipantsAmount);
  }, [data, loadedParticipantsAmount, membersToExcludeIds]);

  const loadMore = () => setLoadedParticipantsAmount((prev) => prev + 10);

  const getHasMore = () => {
    if (!data) return false;

    return loadedParticipants.length < data.length;
  };
  return {
    participants: loadedParticipants,
    loadMore,
    hasMore: getHasMore(),
    isLoading,
    isFetching,
    isError,
  };
};

export default useLazyAvailableParticipants;
