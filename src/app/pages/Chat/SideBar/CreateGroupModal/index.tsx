import styled from '@emotion/styled';
import { Modal, BaseModalHeading, PageLoader } from 'app/components';
import { useChatTranslation } from 'app/internationalization/hooks';
import { FC, useState } from 'react';
import { useDebounce } from 'use-debounce';

import {
  useLazyAvailableParticipants,
  useCreateThreadMutation,
  useSettings,
} from '../../hooks';

import AddMembersStep from './AddMembersStep';
import EnterNameStep from './EnterNameStep';

interface CreateGroupModalProps {
  onClose: () => void;
}

const ContentContainer = styled.div`
  width: 450px;
`;

const ModalContainer = styled.div`
  .modal_content,
  .modal_content_container {
    overflow: visible;
  }
`;

const CreateGroupModal: FC<CreateGroupModalProps> = ({ onClose }) => {
  const [groupName, setGroupName] = useState('');
  const [participantsQuery, setParticipantsQuery] = useState('');
  const [debouncedParticipantQuery] = useDebounce(participantsQuery, 500);
  const { t } = useChatTranslation();
  const {
    participants,
    isFetching: isParticipantsLoading,
    hasMore,
    loadMore,
  } = useLazyAvailableParticipants({ query: debouncedParticipantQuery });
  const { mutate, isLoading: isSubmitting } = useCreateThreadMutation();
  const { data: settings } = useSettings();

  if (!settings) {
    return <PageLoader />;
  }

  return (
    <ModalContainer>
      <Modal
        heading={<BaseModalHeading onClose={onClose} title={t('New Group')} />}
        onClose={onClose}
      >
        <ContentContainer>
          {!groupName ? (
            <EnterNameStep
              maxNameLength={settings.maxTopicLength}
              onSubmit={({ name }) => setGroupName(name)}
            />
          ) : (
            <AddMembersStep
              hasMore={hasMore}
              loadMore={loadMore}
              participants={participants || []}
              queryValue={participantsQuery}
              isParticipantsLoading={isParticipantsLoading}
              onQueryChange={setParticipantsQuery}
              isSubmitting={isSubmitting}
              onSubmit={(memberIds) => {
                mutate(
                  {
                    topic: groupName,
                    participants: memberIds,
                  },
                  {
                    onSuccess: () => {
                      onClose();
                    },
                  }
                );
              }}
            />
          )}
        </ContentContainer>
      </Modal>
    </ModalContainer>
  );
};

export default CreateGroupModal;
