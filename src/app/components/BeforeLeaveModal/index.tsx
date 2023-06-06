import { cx } from '@emotion/css';
import { Edit2, Trash } from 'iconsax-react';
import noop from 'lodash/noop';
import CloseLineIcon from 'remixicon-react/CloseLineIcon';

import Button from '../Button';
import Modal from '../Modal';
import PageLoader from '../PageLoader';

const BeforeLeaveModal = ({
  onLeaveClick,
  onSaveClick,
  onClose,
  saveDisabled,
  isSaving,
}: {
  onLeaveClick: VoidFunction;
  onSaveClick: VoidFunction;
  onClose: VoidFunction;
  saveDisabled: boolean;
  isSaving: boolean;
}) => {
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
          Save before leaving?
        </label>

        <div className="flex mt-6 text-grayscale-primary">
          <Trash />
          <span className="ml-4">Any unsaved changes will be lost</span>
        </div>

        <div className="flex mt-6 text-grayscale-primary">
          <Edit2 />
          <span className="ml-4">
            Please add a cover image and title before saving
          </span>
        </div>

        <div className="flex w-full items-center justify-center mt-8">
          <Button
            className="w-[170px] h-12 ml-3.5 rounded-xl text-sm border-transparent bg-hover-blue text-focus"
            onClick={onLeaveClick}
          >
            Don&apos;t Save
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
              Save
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default BeforeLeaveModal;
