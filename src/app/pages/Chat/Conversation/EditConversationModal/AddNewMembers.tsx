import { AvailableParticipant } from 'app/api/chat/types';
import { Button, PageLoader } from 'app/components';
import {
  useChatTranslation,
  useErrorTranslation,
} from 'app/internationalization/hooks';
import { FC, useState } from 'react';
import { toast } from 'react-toastify';
import { useDebounce } from 'use-debounce';

import { UserSelect } from '../../components';
import {
  useLazyAvailableParticipants,
  useAddParticipantsMutation,
  useThreadId,
  useSettings,
} from '../../hooks';

interface AddNewMembersProps {
  currentMembersIds: Array<number>;
  onMembersAdded: VoidFunction;
}

const AddNewMembers: FC<AddNewMembersProps> = ({
  currentMembersIds,
  onMembersAdded,
}) => {
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 500);
  const {
    participants,
    isLoading: isParticipantsLoading,
    hasMore,
    loadMore,
  } = useLazyAvailableParticipants({
    query: debouncedQuery,
    membersToExcludeIds: currentMembersIds,
  });
  const { t } = useChatTranslation();
  const { t: tError } = useErrorTranslation();
  const [selectedMembers, setSelectedMembers] = useState<
    Array<AvailableParticipant>
  >([]);
  const threadId = useThreadId();
  const { data: settings } = useSettings();
  const { mutate: addParticipants, isLoading } =
    useAddParticipantsMutation(threadId);

  if (!settings) {
    return <PageLoader />;
  }

  const totalMembersWithNewOnes =
    currentMembersIds.length + selectedMembers.length;

  return (
    <form
      className="flex-1 flex flex-col"
      onSubmit={(e) => {
        e.preventDefault();
        if (isLoading) return;

        addParticipants(
          {
            participants: selectedMembers,
          },
          {
            onSuccess: () => {
              toast.success(t('New members added'));
              onMembersAdded();
            },
            onError: () => {
              toast.error(tError('Something went wrong, please try again'));
            },
          }
        );
      }}
    >
      <div>Select Members</div>
      <div className="mt-1 mb-auto">
        <UserSelect
          options={participants || []}
          isLoading={isParticipantsLoading}
          inputValue={query}
          hasMore={hasMore}
          loadMore={loadMore}
          onInputValueChange={(value) => setQuery(value)}
          selectedOptions={selectedMembers}
          onOptionSelect={(val) => {
            setSelectedMembers((prevState) => {
              const pluckedIds = prevState.reduce<Array<number>>(
                (acc, { id }) => [...acc, id],
                []
              );
              if (pluckedIds.includes(val.id)) {
                return prevState.filter(({ id }) => id !== val.id);
              }

              if (totalMembersWithNewOnes >= settings.maxParticipantCount) {
                toast.error(
                  t('Group cannot have more than {{count}} members', {
                    count: settings.maxParticipantCount,
                  })
                );
                return prevState;
              }

              return [...prevState, val];
            });
          }}
        />
      </div>
      <div className="flex mt-6">
        <Button
          disabled={!selectedMembers.length || isLoading}
          variant="primary"
          className="rounded-lg px-2"
          type="submit"
        >
          {t('Save changes')}
        </Button>
      </div>
    </form>
  );
};

export default AddNewMembers;
