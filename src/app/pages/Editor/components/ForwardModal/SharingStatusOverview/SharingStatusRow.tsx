import { css, cx } from '@emotion/css';
import { actions as modalActions } from 'app/store/modal';
import { ModalTypes } from 'app/store/modal/types';
import a11yKeydown from 'app/utils/a11y/keydown';
import { Buliding, Forbidden2 } from 'iconsax-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ArticleSharingStatus } from 'submodules/common-ui/generated/api/gcs';

import StatusTag from './StatusTag';

interface SharingStatusRowProps {
  sharingStatus: ArticleSharingStatus;
  articleOwner: number;
  articleId: number;
  sender?: string;
}

const SharingStatusRow = ({
  sharingStatus,
  articleOwner,
  articleId,
  sender,
}: SharingStatusRowProps) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const openDeleteSharingConnectionModal = () => {
    dispatch(
      modalActions.showModal({
        modalType: ModalTypes.DELETE_SHARED_ARTICLE_MODAL,
        modalProps: {
          articleOwner,
          articleId,
          receiverName: sharingStatus.tenantName,
          tenantId: sharingStatus.tenantId,
        },
      })
    );
  };

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        className={cx(
          'flex w-full items-center hover:bg-hover-blue mt-2 px-2 py-2 rounded-sm',
          css(`
        :hover {
          #remove {
            display: flex;
          }
        }
        `)
        )}
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={(e) => a11yKeydown(e, () => setOpen((prev) => !prev))}
      >
        <div className="w-8 h-8 flex items-center justify-center  text-grayscale-secondary rounded border border-gray-light bg-white">
          {sharingStatus?.tenantLogo ? (
            <img src={sharingStatus.tenantLogo} alt="Logo" />
          ) : (
            <Buliding size={20} />
          )}
        </div>
        <span className="text-sm ml-3">
          {sharingStatus?.tenantTitle ?? sharingStatus.tenantName}
        </span>
        <StatusTag sharingStatus={sharingStatus} />

        <button
          id="remove"
          className="hidden w-8 h-8 items-center justify-center ml-auto rounded border border-gray-light bg-error-light text-error"
          onClick={openDeleteSharingConnectionModal}
        >
          <Forbidden2 size={20} />
        </button>
      </div>

      {open && (
        <div className="flex flex-col rounded-xl rounded-tl-[0px] bg-gray mt-2 px-4 py-2">
          <span className="text-sm font-bold">{sender}</span>

          <span className="my-1 text-sm">
            {sharingStatus.sharingComment ?? ''}
          </span>
        </div>
      )}
    </>
  );
};

export default SharingStatusRow;
