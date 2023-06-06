import { Modal } from 'app/components';
import { actions } from 'app/store/modal';
import { useDispatch } from 'react-redux';
import CloseLineIcon from 'remixicon-react/CloseLineIcon';

export interface SuccessModalProps {
  title: string;
  description: string;
  onClose?: VoidFunction;
}

const SuccessModal = ({ title, description, onClose }: SuccessModalProps) => {
  const dispatch = useDispatch();

  const close = () => {
    if (!onClose) {
      dispatch(actions.hideModal());
      return;
    }
    onClose();
  };

  return (
    <Modal onClose={close} className="w-[380px] h-[180px]">
      <div className="flex relative items-center justify-center">
        <div className="flex flex-col items-center">
          <span className="text-[40px]">&#10024;</span>
          <span className="font-bold text-lg mt-2">{title}</span>
          <span className="mt-2">{description}</span>
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

export default SuccessModal;
