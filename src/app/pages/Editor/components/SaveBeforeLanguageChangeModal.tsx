import { cx } from '@emotion/css';
import { Button, Modal, PageLoader } from 'app/components';
import { useArticlesTranslation } from 'app/internationalization/hooks';
import CloseLineIcon from 'remixicon-react/CloseLineIcon';

const SaveBeforeLanguageChangeModal = ({
  onSaveClick,
  onLeaveClick,
  onClose,
  saveDisabled,
  isSaving,
}: {
  onSaveClick: VoidFunction;
  onLeaveClick: VoidFunction;
  onClose: VoidFunction;
  saveDisabled: boolean;
  isSaving: boolean;
}) => {
  const { t } = useArticlesTranslation();
  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col relative">
        <button
          className="h-10 w-10 flex justify-center items-center rounded bg-white shadow-atobi text-grayscale-secondary absolute right-0 top-0"
          onClick={onClose}
        >
          <CloseLineIcon />
        </button>

        <label className="block font-bold text-lg" htmlFor="leave">
          {t('Save before leaving?')}
        </label>

        <span className="mt-6">
          {t('Please save your changes before changing language.')}
        </span>

        {saveDisabled && (
          <span className="text-xs mt-5">
            {t('*Title and Cover Image are mandatory.')}
          </span>
        )}

        <div className="flex w-full items-center justify-center mt-8">
          <Button
            className="w-[170px] h-12 ml-3.5 rounded-xl text-sm border-transparent bg-hover-blue text-focus"
            onClick={onLeaveClick}
          >
            {t('Don’t save')}
          </Button>

          {isSaving ? (
            <div className="w-[170px] h-12 ml-3.5">
              <PageLoader />
            </div>
          ) : (
            <Button
              className={cx(
                'w-[170px] h-12 ml-3.5 rounded-xl text-sm border-transparent ',
                {
                  'bg-gray-light text-grayscale-secondary': saveDisabled,
                  'bg-focus text-white': !saveDisabled,
                }
              )}
              onClick={onSaveClick}
              disabled={saveDisabled}
            >
              {t('Save')}
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default SaveBeforeLanguageChangeModal;
