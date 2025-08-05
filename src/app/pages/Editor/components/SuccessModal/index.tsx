import { Modal } from 'app/components';
import { useArticlesTranslation } from 'app/internationalization/hooks';
import { actions } from 'app/store/modal';
import { Calendar, NoteText } from 'iconsax-react';
import { useDispatch } from 'react-redux';
import CloseLineIcon from 'remixicon-react/CloseLineIcon';

interface SuccessModalProps {
  onClose?: VoidFunction;
}

const SuccessModal = ({ onClose }: SuccessModalProps) => {
  const { t } = useArticlesTranslation();
  const dispatch = useDispatch();

  const close = () => {
    if (!onClose) {
      dispatch(actions.hideModal());
      return;
    }

    onClose();
  };

  return (
    <Modal onClose={close} className="w-[380px]">
      <div className="flex relative items-center justify-center">
        <div className="flex flex-col items-center">
          <span className="text-[40px]">&#10024;</span>
          <span className="font-bold text-lg mt-2">
            {t('The article is forwarded!')}
          </span>
          <span className="mt-2 font-bold">{t('Now the external team')}</span>

          <div className="flex mt-2">
            <NoteText size={20} />
            <span className="text-sm text-black ml-2">
              {t('Receives a copy of the article')}
            </span>
          </div>
          <div className="flex mt-2">
            <Calendar size={20} />
            <span className="text-sm text-black ml-2">
              {t('Can schedule and publish the article')}
            </span>
          </div>
        </div>
        <button
          className="h-10 w-10 flex justify-center items-center rounded bg-white shadow-atobi text-grayscale-secondary absolute right-0 top-0"
          onClick={close}
        >
          <CloseLineIcon />
        </button>
      </div>
    </Modal>
  );
};

export { SuccessModal };
export default SuccessModal;
