import { cx } from '@emotion/css';
import useGetAudiencesQuery from 'app/api/audiences/hooks/useAudiencesQuery';
import { Audience } from 'app/api/audiences/types';
import { Button, Modal } from 'app/components';
import { useArticlesTranslation } from 'app/internationalization/hooks';
import { actions, selectors } from 'app/store/editor';
import { Audience as ReducerAudience } from 'app/store/editor/types';
import {
  actions as modalActions,
  selectors as modalSelectors,
} from 'app/store/modal';
import { ModalTypes } from 'app/store/modal/types';
import dayjs from 'dayjs';
import { Add } from 'iconsax-react';
import noop from 'lodash/noop';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import CloseLineIcon from 'remixicon-react/CloseLineIcon';

import getChannelTitle from '../../utils/getChannelTitle';
import ChannelTag from '../ChannelTag';

import AudiencesDropdown from './components/AudiencesDropdown';
import ModalFooter from './components/ModalFooter';
import ScheduleSummary from './components/ScheduleSummary';
import SelectedAudiences from './components/SelectedAudiences';

interface PublishModalProps {
  isLoading: boolean;
  submitDisabled: boolean;
  articlePublishDate?: string | null;
  articleArchiveDate?: string | null;
  publish: VoidFunction;
  schedule: VoidFunction;
  cancelSchedule: VoidFunction;
  onClose: VoidFunction;
  toggleScheduleModal: VoidFunction;
}

const PublishModal = ({
  isLoading,
  submitDisabled,
  articleArchiveDate,
  articlePublishDate,
  publish,
  schedule,
  cancelSchedule,
  onClose,
  toggleScheduleModal,
}: PublishModalProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data, isLoading: isLoadingAudiences } = useGetAudiencesQuery({
    page: 1,
    query: searchQuery,
    enabled: searchQuery !== '',
  });

  const { t } = useArticlesTranslation();

  const dispatch = useDispatch();
  const selected = useSelector(selectors.getSelectedAudiences);
  const selectedChannel = useSelector(selectors.getSelectedChannel);
  const openModal = useSelector(modalSelectors.getOpenedModals);

  const publishDate = useSelector(selectors.getPublishDate);
  const archiveDate = useSelector(selectors.getArchiveDate);

  const audiences: Audience[] = useMemo(() => data ?? [], [data]);

  const addAudience = (audience: Audience) => {
    dispatch(
      actions.addAudience({
        id: audience.id,
        name: audience.name,
        members: audience.usersCount ?? 0,
      })
    );
  };

  const removeAudience = (audience: ReducerAudience) => {
    dispatch(actions.removeAudience(audience.id));
  };

  return (
    <Modal
      onClose={
        openModal.modalType === ModalTypes.CREATE_AUDIENCE_MODAL ||
        openModal.modalType === ModalTypes.SCHEDULE_MODAL
          ? noop
          : onClose
      }
      className="w-[730px] overflow-visible overflow-y-visible"
      overflow
    >
      <div className="relative h-full">
        <button
          className="h-10 w-10 flex justify-center items-center rounded bg-white shadow-atobi text-grayscale-secondary absolute right-0 top-0"
          onClick={onClose}
        >
          <CloseLineIcon />
        </button>
        <div className="flex flex-col h-full">
          <div className="mb-4">
            <label
              className="block font-bold text-grayscale-primary"
              htmlFor="audience"
            >
              {t('Add Audience')}
            </label>
            <span className="text-xs text-grayscale-secondary">
              {t('Who should this article be published to?')}
            </span>

            <div className="flex items-center w-full mt-4">
              <AudiencesDropdown
                audiences={audiences}
                onSearch={(val) => setSearchQuery(val)}
                addAudience={addAudience}
                isLoading={isLoadingAudiences}
              />
              <Button
                className="!w-[170px] h-12 ml-3.5 bg-hover-blue text-focus rounded-xl text-sm border-transparent"
                onClick={() =>
                  dispatch(
                    modalActions.showModal({
                      modalType: ModalTypes.CREATE_AUDIENCE_MODAL,
                      modalProps: {
                        selectedLocations: [],
                        selectedProfessions: [],
                      },
                    })
                  )
                }
              >
                <Add /> {t('Create Audience')}
              </Button>
            </div>
          </div>

          {selected.length > 0 && (
            <SelectedAudiences
              selectedAudiences={selected}
              removeAudience={removeAudience}
            />
          )}

          {selectedChannel && (
            <div className={cx({ 'mt-4': selected.length > 0 })}>
              <span className="block font-bold text-grayscale-primary mb-2">
                Channel
              </span>
              <ChannelTag>{getChannelTitle(selectedChannel)}</ChannelTag>
            </div>
          )}

          <ScheduleSummary
            publishDate={publishDate ?? articlePublishDate}
            archiveDate={archiveDate ?? articleArchiveDate}
          />

          <ModalFooter
            isPublished={
              articlePublishDate ? dayjs(articlePublishDate) < dayjs() : false
            }
            isLoading={isLoading}
            submitDisabled={submitDisabled}
            selected={selected}
            selectedChannel={selectedChannel}
            publishDate={articlePublishDate}
            publish={() => publish()}
            schedule={() => schedule()}
            cancelSchedule={() => cancelSchedule()}
            toggleScheduleModal={() => toggleScheduleModal()}
          />
        </div>
      </div>
      <ReactTooltip place="bottom" effect="solid" class="react-tooltip" />
    </Modal>
  );
};

export default PublishModal;
