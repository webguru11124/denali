import { Modal } from 'app/components';
import { useArticlesTranslation } from 'app/internationalization/hooks';
import { actions } from 'app/store/modal';
import { LanguageSquare, LocationTick } from 'iconsax-react';
import { useDispatch } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import CloseLineIcon from 'remixicon-react/CloseLineIcon';

import ActiveLanguages from './components/ActiveLanguages';
import LanguagesDropdown from './components/LanguagesDropdown';

const LanguagesModal = ({ articleOwner }: { articleOwner: number }) => {
  const dispatch = useDispatch();

  const { t } = useArticlesTranslation();

  const close = () => {
    dispatch(actions.hideModal());
  };

  const ModalHeader = () => {
    return (
      <div className="relative">
        <label
          className="block font-bold text-grayscale-primary"
          htmlFor="collaborator"
        >
          {t('Language Settings')}
        </label>
        <div className="flex text-sm text-grayscale-secondary mt-2 items-center">
          <LanguageSquare size={16} />
          <span className="ml-1.5">
            {t('Choose what languages you want for the article.')}
          </span>
        </div>
        <div className="flex text-sm text-grayscale-secondary items-center mt-2">
          <LocationTick size={16} />
          <span className="ml-1.5">
            {t(
              'Main Language is used as fall back and as a source for auto-translations.'
            )}
          </span>
        </div>

        <button
          className="h-10 w-10 flex justify-center items-center rounded bg-white shadow-atobi text-grayscale-secondary absolute right-0 top-0"
          onClick={close}
        >
          <CloseLineIcon />
        </button>
      </div>
    );
  };

  const ModalFooter = () => {
    return (
      <div className="mt-3 rounded-b-lg">
        <span className="text-sm">{t('Most used')}</span>
      </div>
    );
  };

  return (
    <Modal
      onClose={close}
      className="w-[536px] overflow-visible overflow-y-visible"
      overflow
      containerPaddingClass="py-4 px-6"
    >
      <div className="flex flex-col h-full">
        <ModalHeader />
      </div>
      <LanguagesDropdown articleOwner={articleOwner} />
      <ActiveLanguages />
      <ModalFooter />
      <ReactTooltip place="top" effect="solid" class="react-tooltip" />
    </Modal>
  );
};

export default LanguagesModal;
