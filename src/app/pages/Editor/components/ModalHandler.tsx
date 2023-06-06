import { SuccessModal } from 'app/components';
import AudienceModal from 'app/pages/Audiences/components/Modals/AudienceModal/AudienceModal';
import { selectors } from 'app/store/modal';
import { useSelector } from 'react-redux';

import ChannelModal from './ChannelModal/ChannelModal';
import CollaboratorsModal from './CollaboratorsModal/ColllaboratorsModal';
import ForwardModal from './ForwardModal';
import DeleteSharedArticleModal from './ForwardModal/DeleteSharedArticleModal';
import LanguagesModal from './LanguagesModal/LanguagesModal';
import ScheduleModal from './ScheduleModal';
import { SuccessModal as ShareSuccessModal } from './SuccessModal';

const ModalHandler = () => {
  const MODAL_COMPONENTS = {
    success_modal: SuccessModal,
    collaborators_modal: CollaboratorsModal,
    languages_modal: LanguagesModal,
    create_audience_modal: AudienceModal,
    share_success_modal: ShareSuccessModal,
    forward_modal: ForwardModal,
    delete_shared_article_modal: DeleteSharedArticleModal,
    add_channel_modal: ChannelModal,
    schedule_modal: ScheduleModal,
  };

  const { modalType, modalProps } = useSelector(selectors.getOpenedModals);
  if (!modalType) {
    return null;
  }

  const SpecificModal = MODAL_COMPONENTS[modalType];
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  return <SpecificModal {...(modalProps as any)} />;
};

export default ModalHandler;
