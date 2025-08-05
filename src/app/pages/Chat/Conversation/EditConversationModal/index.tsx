import { css } from '@emotion/css';
import styled from '@emotion/styled';
import { Modal, BaseModalHeading, PageLoader } from 'app/components';
import { useChatTranslation } from 'app/internationalization/hooks';
import { FC, ReactElement, useState, useMemo } from 'react';

import { useSettings } from '../../hooks';
import { TabValue, SettingsModalFlow } from '../../types';

import About from './About';
import AddNewMembers from './AddNewMembers';
import DeleteFlowModalHeading from './DeleteFlowModalHeading';
import DeleteThreadConfirmation from './DeleteThreadConfirmation';
import Members from './Members';
import Settings from './Settings';
import Tabs from './Tabs';

interface EditConversationModalProps {
  onClose: () => void;
  participantsAmount: number;
  participantsIds: Array<number>;
  conversationName: string;
  isAdmin: boolean;
}

const ModalContainer = styled.div`
  .modal_content_container {
    display: flex;
    flex-direction: column;
  }

  .modal_content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
`;

interface ModalConfig {
  heading: () => ReactElement;
  content: () => ReactElement;
  heightProps: string;
}

const EditConversationModal: FC<EditConversationModalProps> = ({
  onClose,
  conversationName,
  participantsAmount,
  participantsIds,
  isAdmin,
}) => {
  const [flow, setFlow] = useState<SettingsModalFlow>(
    SettingsModalFlow.default
  );

  const { t } = useChatTranslation();

  const { data: settings } = useSettings();

  const tabs = useMemo(() => {
    if (!isAdmin) {
      return [
        {
          label: t('Members {{count}}', {
            count: participantsAmount,
          }),
          id: TabValue.members,
          render: () => (
            <Members
              isAdmin={isAdmin}
              onDisplayAddMembersFlow={() =>
                setFlow(SettingsModalFlow.addNewMember)
              }
            />
          ),
        },
      ];
    }

    return [
      {
        label: t('About'),
        id: TabValue.about,
        render: () => (
          <About
            maxNameLength={settings?.maxTopicLength || 0}
            conversationName={conversationName}
          />
        ),
      },
      {
        label: t('Members {{count}}', {
          count: participantsAmount,
        }),
        id: TabValue.members,
        render: () => (
          <Members
            isAdmin={isAdmin}
            onDisplayAddMembersFlow={() =>
              setFlow(SettingsModalFlow.addNewMember)
            }
          />
        ),
      },
      {
        label: t('Settings'),
        id: TabValue.settings,
        render: () => (
          <Settings
            onShouldDisplayDeleteFlow={() =>
              setFlow(SettingsModalFlow.deleteThread)
            }
          />
        ),
      },
    ];
  }, [
    isAdmin,
    participantsAmount,
    settings?.maxTopicLength,
    conversationName,
    t,
  ]);

  const [selectedTabId, setSelectedTabId] = useState<TabValue>(tabs[0].id);

  if (!settings) {
    return <PageLoader />;
  }

  const getModalConfig = (): ModalConfig => {
    switch (flow) {
      case SettingsModalFlow.default:
        return {
          heightProps: 'height: 577px',
          heading: () => (
            <BaseModalHeading title={t('Group Settings')} onClose={onClose} />
          ),
          content: () => (
            <Tabs
              onClick={(id) => setSelectedTabId(id)}
              selectedTabId={selectedTabId}
              tabs={tabs}
            />
          ),
        };
      case SettingsModalFlow.deleteThread:
        return {
          heightProps: 'height: 235px',
          heading: () => <DeleteFlowModalHeading onClose={onClose} />,
          content: () => (
            <DeleteThreadConfirmation
              onCancel={() => setFlow(SettingsModalFlow.default)}
            />
          ),
        };
      case SettingsModalFlow.addNewMember:
        return {
          heightProps: 'min-height: 650px',
          heading: () => (
            <BaseModalHeading
              onBack={() => setFlow(SettingsModalFlow.default)}
              title={t('Add Members')}
              onClose={onClose}
            />
          ),
          content: () => (
            <AddNewMembers
              onMembersAdded={() => setFlow(SettingsModalFlow.default)}
              currentMembersIds={participantsIds}
            />
          ),
        };
      default:
        throw new Error(`[EditConversationModal]: unknown flow ${flow}`);
    }
  };

  const modalConfig = getModalConfig();

  return (
    <ModalContainer
      className={css`
        .modal_content_container {
          ${modalConfig.heightProps};
        }
      `}
    >
      <Modal width="md" heading={modalConfig.heading()} onClose={onClose}>
        {modalConfig.content()}
      </Modal>
    </ModalContainer>
  );
};

export default EditConversationModal;
