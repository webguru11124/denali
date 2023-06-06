import { SuccessModalProps } from 'app/components/SuccessModal';
import { AudienceModalProps } from 'app/pages/Audiences/components/Modals/AudienceModal/AudienceModal';
import { ChannelModalProps } from 'app/pages/Editor/components/ChannelModal/ChannelModal';
import { CollaboratorsModalProps } from 'app/pages/Editor/components/CollaboratorsModal/ColllaboratorsModal';
import { ForwardModalProps } from 'app/pages/Editor/components/ForwardModal';
import { DeleteSharedArticleModalProps } from 'app/pages/Editor/components/ForwardModal/DeleteSharedArticleModal';
import { ScheduleModalProps } from 'app/pages/Editor/components/ScheduleModal';

export interface SaveAlert {
  message: string | null;
}

export enum ModalTypes {
  SUCCESS_MODAL = 'success_modal',
  COLLABORATORS_MODAL = 'collaborators_modal',
  LANGUAGES_MODAL = 'languages_modal',
  CREATE_AUDIENCE_MODAL = 'create_audience_modal',
  SHARE_SUCCESS_MODAL = 'share_success_modal',
  FORWARD_MODAL = 'forward_modal',
  DELETE_SHARED_ARTICLE_MODAL = 'delete_shared_article_modal',
  ADD_CHANNEL_MODAL = 'add_channel_modal',
  SCHEDULE_MODAL = 'schedule_modal',
}

export interface Modals {
  modalType: ModalTypes | null;
  modalProps:
    | SuccessModalProps
    | DeleteSharedArticleModalProps
    | CollaboratorsModalProps
    | AudienceModalProps
    | ForwardModalProps
    | ScheduleModalProps
    | ChannelModalProps
    | { articleOwner: number };
}

export interface State {
  saveAlert: SaveAlert;
  modalsOpened: number;
  modals: Modals;
}
