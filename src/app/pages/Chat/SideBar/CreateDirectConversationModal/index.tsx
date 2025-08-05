import styled from '@emotion/styled';
import {
  Modal,
  Input,
  BaseModalHeading,
  Spinner,
  Button,
} from 'app/components';
import { useChatTranslation } from 'app/internationalization/hooks';
import { FC, useState } from 'react';
import { toast } from 'react-toastify';
import SearchIcon from 'remixicon-react/SearchLineIcon';
import { useDebounce } from 'use-debounce';

import {
  useLazyAvailableParticipants,
  useCreateDirectConversationMutation,
} from '../../hooks';

import UserSelect from './UserSelect';

interface CreateDirectConversationModalProps {
  onClose: VoidFunction;
}

const ModalContainer = styled.div`
  .modal_content {
    width: 586px;
  }
`;

const CreateDirectConversationModal: FC<CreateDirectConversationModalProps> = ({
  onClose,
}) => {
  const [filterValue, setFilterValue] = useState('');
  const [debouncedFilterValue] = useDebounce(filterValue, 500);
  const { t } = useChatTranslation();
  const { participants, hasMore, loadMore, isLoading } =
    useLazyAvailableParticipants({ query: debouncedFilterValue });
  const { mutate, isLoading: isConversationCreating } =
    useCreateDirectConversationMutation();

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const handleOnCreate = () => {
    if (!selectedUserId) return;

    mutate(
      { participantId: selectedUserId },
      {
        onSuccess: () => {
          toast.success(t('New direct chat created'));
          onClose();
        },
        onError: () => {
          toast.error(t('Something went wrong, please try again'));
        },
      }
    );
  };

  return (
    <ModalContainer>
      <Modal
        heading={
          <BaseModalHeading onClose={onClose} title={t('New Direct Chat')} />
        }
        onClose={onClose}
      >
        <div className="mb-4">
          <Input
            icon={<SearchIcon />}
            value={filterValue}
            onChange={(e) => {
              setFilterValue(e.target.value);
            }}
            name="query"
            placeholder={`${t('Search members...')}`}
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : (
          <UserSelect
            selectedUserId={selectedUserId}
            hasMore={hasMore}
            onUserClick={(id: number) => {
              setSelectedUserId(id === selectedUserId ? null : id);
            }}
            isCreatingChat={isConversationCreating}
            loadMore={loadMore}
            users={participants || []}
          />
        )}
        <div className="flex mt-6">
          <Button
            disabled={!selectedUserId || isConversationCreating}
            variant="primary"
            onClick={handleOnCreate}
            className="rounded-lg px-2"
            type="submit"
          >
            {t('Create direct chat')}
          </Button>
        </div>
      </Modal>
    </ModalContainer>
  );
};

export default CreateDirectConversationModal;
