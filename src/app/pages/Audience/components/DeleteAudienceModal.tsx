import { Modal, PageLoader } from 'app/components';
import CloseLineIcon from 'remixicon-react/CloseLineIcon';

interface DeleteAudienceModalProps {
  members: number;
  isLoading: boolean;
  onCancelClick: VoidFunction;
  onConfirmClick: VoidFunction;
}

const DeleteAudienceModal = ({
  members,
  isLoading,
  onCancelClick,
  onConfirmClick,
}: DeleteAudienceModalProps) => {
  return (
    <Modal onClose={onCancelClick} className="w-[408px] h-[310px]">
      <div className="relative">
        <button
          className="h-10 w-10 flex justify-center items-center rounded bg-white shadow-atobi text-grayscale-secondary absolute right-0 top-0"
          onClick={onCancelClick}
        >
          <CloseLineIcon />
        </button>
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center">
            <span className="text-[40px]">&#10071;</span>
            <span className="font-bold text-lg mt-2">
              Move Audience to Trash
            </span>
            <span className="mt-2 text-center">
              If you move this audience to trash,
              <span className="font-bold"> {members} audience members</span>
              &nbsp;invited to it will lose access to
              <span className="font-bold"> selected articles</span>. Are you
              sure?
            </span>
          </div>
        </div>

        <div className="flex mt-8">
          <button
            type="button"
            className="ml-4 w-56 h-12 bg-hover-blue text-focus rounded-xl"
            onClick={onCancelClick}
            disabled={isLoading}
          >
            Cancel
          </button>

          {isLoading && (
            <div className="ml-4 w-56 h-12">
              <PageLoader />
            </div>
          )}

          {!isLoading && (
            <button
              type="button"
              className="ml-4 w-56 h-12 bg-focus text-white rounded-xl"
              onClick={onConfirmClick}
            >
              Move to Trash
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default DeleteAudienceModal;
