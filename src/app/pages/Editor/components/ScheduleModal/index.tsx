import { Button, Modal } from 'app/components';
import Datepicker2 from 'app/components/Datepicker2';
import { useDispatch } from 'app/hooks';
import { useArticlesTranslation } from 'app/internationalization/hooks';
import { actions, selectors } from 'app/store/editor';
import { actions as modalActions } from 'app/store/modal';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CloseLineIcon from 'remixicon-react/CloseLineIcon';
import { Article } from 'submodules/common-ui/generated/api/gcs';

export interface ScheduleModalProps {
  article?: Article;
}

const ScheduleModal = ({ article }: ScheduleModalProps) => {
  const { t } = useArticlesTranslation();
  const dispatch = useDispatch();

  const storePublishDate = useSelector(selectors.getPublishDate);
  const storeArchiveDate = useSelector(selectors.getArchiveDate);

  const [isRange, setIsRange] = useState(true);
  const [publishDate, setPublishDate] = useState(
    storePublishDate ?? article?.publishAt
  );
  const [archiveDate, setArchiveDate] = useState(
    storeArchiveDate ?? article?.archiveAt
  );

  const onDateChange = (
    date: string | [string | null, string | null] | null
  ) => {
    if (Array.isArray(date)) {
      setPublishDate(date[0]);
      setArchiveDate(date[1]);
      return;
    }

    setPublishDate(date);
  };

  useEffect(() => {
    if (!isRange) {
      setArchiveDate(null);
    }
  }, [isRange]);

  const setArticleDates = () => {
    dispatch(actions.setPublishDate(publishDate ?? undefined));

    dispatch(actions.setArchiveDate(archiveDate ?? undefined));

    dispatch(modalActions.hideModal());
  };

  const close = () => {
    dispatch(modalActions.hideModal());
  };

  const archiveToggle = () => {
    if (isRange) dispatch(actions.setArchiveDate(undefined));
    setIsRange((prev) => !prev);
  };

  return (
    <Modal
      onClose={close}
      className="overflow-visible overflow-y-visible"
      overflow
    >
      <div className="relative h-full">
        <button
          className="h-10 w-10 flex justify-center items-center rounded bg-white shadow-atobi text-grayscale-secondary absolute right-0 top-0"
          onClick={close}
        >
          <CloseLineIcon />
        </button>

        <div className="flex flex-col h-full">
          <div className="mb-4">
            <label
              className="block font-bold text-grayscale-primary"
              htmlFor="audience"
            >
              {t('Schedule your article')}
            </label>
            <span className="text-xs text-grayscale-secondary">
              {t(
                'This article will be published automatically on the specified date and time.'
              )}
            </span>
          </div>
        </div>
        <Datepicker2
          inline
          range={isRange}
          start={publishDate ?? undefined}
          end={archiveDate ?? undefined}
          onChange={onDateChange}
          archiveToggle={archiveToggle}
        />
        <div className="flex w-full justify-center mt-6">
          <Button
            className="!w-[170px] h-12 ml-3.5 rounded-xl text-sm text-focus border-transparent bg-hover-blue"
            onClick={close}
          >
            Cancel
          </Button>
          <Button
            className="!w-[248px] h-12 ml-3.5 rounded-xl text-sm text-white border-transparent bg-focus"
            onClick={setArticleDates}
          >
            Approve
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ScheduleModal;
