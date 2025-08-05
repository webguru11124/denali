import { Button, Modal } from 'app/components';
import { People, Trash } from 'iconsax-react';

interface DeleteModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteModal = ({ onConfirm, onCancel }: DeleteModalProps) => {
  return (
    <Modal onClose={close} className="w-[380px]">
      <div className="flex flex-col gap-4">
        <h5 className="text-lg font-bold">Delete Channel?</h5>
        <p className="text-base font-bold">1 channel will be deleted</p>
        <div className="flex flex-col gap-4 mt-2">
          <div className="flex items-center gap-4">
            <People />
            <span>Editors can no longer use this channel</span>
          </div>
          <div className="flex items-center gap-4">
            <Trash />
            <span>You can not restore the channel again</span>
          </div>
          <div className="flex items-center gap-4">
            <Trash />
            <span>You can still access articles in Archive Tab</span>
          </div>
        </div>
        <div className="flex gap-2 pt-3">
          <Button
            className="bg-hover-blue border-0 text-focus"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            className={'border-0 bg-focus text-white'}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
