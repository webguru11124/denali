import { AvailableParticipant } from 'app/api/chat/types';
import { Alert, Button, PageLoader } from 'app/components';
import { useChatTranslation } from 'app/internationalization/hooks';
import { FC, useState } from 'react';

import { UserSelect } from '../../components';
import { useSettings } from '../../hooks';

import createUserSelectHandler from './createUserSelectHandler';

interface AddMembersStepProps {
  onSubmit: (memberIds: Array<number>) => void;
  onQueryChange: (val: string) => void;
  queryValue: string;
  participants: Array<AvailableParticipant>;
  isParticipantsLoading: boolean;
  isSubmitting: boolean;
  hasMore: boolean;
  loadMore: VoidFunction;
}

const AddMembersStep: FC<AddMembersStepProps> = ({
  onSubmit,
  queryValue,
  onQueryChange,
  participants,
  isParticipantsLoading,
  isSubmitting,
  hasMore,
  loadMore,
}) => {
  const [error, setError] = useState<string | undefined>();
  const { data: settings } = useSettings();
  const { t } = useChatTranslation();
  const [selectedMembers, setSelectedMembers] = useState<
    Array<AvailableParticipant>
  >([]);

  if (!settings) {
    return <PageLoader />;
  }

  const handleOptionSelect = createUserSelectHandler({
    maxParticipantCount: settings.maxParticipantCount,
    setValue: setSelectedMembers,
    onError: (errorType) => {
      const value =
        errorType === 'max-exceeded'
          ? t('Group cannot have more than {{count}} members', {
              count: settings.maxParticipantCount,
            })
          : undefined;
      setError(value);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(
          selectedMembers.reduce<Array<number>>(
            (acc, { id }) => [...acc, id],
            []
          )
        );
      }}
    >
      <div>
        {t('Add Members')}{' '}
        {selectedMembers.length ? `(${selectedMembers.length})` : null}
      </div>
      <div className="mt-1">
        <UserSelect
          hasMore={hasMore}
          loadMore={loadMore}
          options={participants}
          isLoading={isParticipantsLoading}
          inputValue={queryValue}
          onInputValueChange={onQueryChange}
          selectedOptions={selectedMembers}
          onOptionSelect={handleOptionSelect}
        />
      </div>
      {error && (
        <Alert className="mt-4" variant="error">
          {error}
        </Alert>
      )}
      <div className="flex mt-6">
        <Button
          disabled={!selectedMembers.length || isSubmitting}
          variant="primary"
          className="rounded-lg px-2"
          type="submit"
        >
          {t('Create group')}
        </Button>
      </div>
    </form>
  );
};

export default AddMembersStep;
