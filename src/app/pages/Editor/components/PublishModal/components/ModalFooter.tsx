import { cx } from '@emotion/css';
import { PageLoader } from 'app/components';
import { useArticlesTranslation } from 'app/internationalization/hooks';
import { selectors } from 'app/store/editor';
import { Audience as ReducerAudience } from 'app/store/editor/types';
import { Calendar, Send } from 'iconsax-react';
import { useSelector } from 'react-redux';
import { BasicChannelInfo } from 'submodules/common-ui/generated/api/gcs';

interface ModalFooterProps {
  selected: ReducerAudience[];
  isLoading: boolean;
  isPublished: boolean;
  submitDisabled: boolean;
  selectedChannel: BasicChannelInfo | null;
  publishDate?: string | null;
  publish: VoidFunction;
  schedule: VoidFunction;
  cancelSchedule: VoidFunction;
  toggleScheduleModal: VoidFunction;
}

const ModalFooter = ({
  isLoading,
  isPublished,
  submitDisabled,
  selected,
  selectedChannel,
  publishDate,
  publish,
  schedule,
  cancelSchedule,
  toggleScheduleModal,
}: ModalFooterProps) => {
  const { t } = useArticlesTranslation();
  const schedulePublishDate = useSelector(selectors.getPublishDate);
  const disabled = selected.length === 0 || !selectedChannel || submitDisabled;

  return (
    <div className="flex w-full items-center justify-center mt-8">
      {(schedulePublishDate || (publishDate && !isPublished)) && (
        <>
          {!isLoading && (
            <>
              <button
                className="flex items-center justify-center w-[176px] h-12 ml-3.5 rounded-xl text-sm border-transparent bg-hover-blue text-focus"
                onClick={cancelSchedule}
                disabled={isLoading}
              >
                <span>{t('Cancel scheduling')}</span>
              </button>

              <button
                className={cx(
                  'items-center justify-center w-[248px] h-12 ml-3.5 rounded-xl text-sm border-transparent',
                  {
                    hidden: Boolean(
                      !isPublished && publishDate && !schedulePublishDate
                    ),
                    flex: Boolean(schedulePublishDate),
                    'bg-gray-light text-grayscale-secondary': disabled,
                    'bg-focus text-white': !disabled,
                  }
                )}
                disabled={disabled}
                onClick={schedule}
              >
                <span>{t('Save schedule')}</span>
              </button>
            </>
          )}
          {isLoading && (
            <div className="w-[170px] h-12 ml-3.5">
              <PageLoader />
            </div>
          )}
        </>
      )}

      {((!schedulePublishDate && !publishDate) ||
        (!schedulePublishDate && publishDate && isPublished)) && (
        <>
          <button
            className={cx(
              'items-center justify-center w-[176px] h-12 ml-3.5 rounded-xl text-sm border-transparent',
              {
                hidden: isPublished,
                flex: !isPublished,
                'bg-grayscale-bg-dark text-grayscale-secondary':
                  selected.length === 0,
                'bg-hover-blue text-focus': selected.length > 0,
              }
            )}
            onClick={toggleScheduleModal}
            disabled={selected.length === 0}
          >
            <Calendar size={24} className="mr-[6px]" />
            <span>{t('Schedule')}</span>
          </button>

          {isLoading ? (
            <div className="w-[170px] h-12 ml-3.5">
              <PageLoader />
            </div>
          ) : (
            <button
              className={cx(
                'flex items-center justify-center w-[248px] h-12 rounded-xl text-sm border-transparent',
                {
                  'ml-3.5': !isPublished,
                  'bg-gray-light text-grayscale-secondary': disabled,
                  'bg-focus text-white': !disabled,
                }
              )}
              disabled={disabled}
              onClick={publish}
            >
              <Send size={24} className="mr-[6px]" />
              <span>{isPublished ? t('Republish') : t('Publish now')}</span>
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default ModalFooter;
