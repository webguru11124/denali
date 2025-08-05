import { ComplaintTypes } from 'app/api/complaints/constants';
import React, { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import DeleteIcon from 'remixicon-react/DeleteBin5LineIcon';
import EditIcon from 'remixicon-react/Edit2LineIcon';
import MoreIcon from 'remixicon-react/More2FillIcon';

import ComplatinsPopup from '../ComplaintsPopup';
import ControlButton from '../ControlButton';

import DeleteModal from './DeleteModal';

interface CommentControlsProps {
  userName: string;
  commentId: number;
  userCommentId: number;
  createdByMe: boolean;
  onTranslate: () => void;
  onDisplayEditor: () => void;
  onDelete: () => void;
  isTranslated?: boolean;
  editLabel: string;
  deleteLabel: string;
  isLoading?: boolean;
  deleteModalText: string;
  complaintType: ComplaintTypes;
}

const CommentControls: React.FC<CommentControlsProps> = ({
  userName,
  commentId,
  userCommentId,
  onTranslate,
  createdByMe,
  onDisplayEditor,
  onDelete,
  isTranslated,
  editLabel,
  deleteLabel,
  isLoading,
  deleteModalText,
  complaintType,
}) => {
  const [shouldDisplayMore, setShouldDisplayMore] = useState(false);
  const [shouldDisplayDeleteModal, setShouldDisplayDeleteModal] =
    useState(false);
  if (createdByMe) {
    return (
      <OutsideClickHandler onOutsideClick={() => setShouldDisplayMore(false)}>
        {shouldDisplayDeleteModal && (
          <DeleteModal
            text={deleteModalText}
            onDelete={onDelete}
            onClose={() => setShouldDisplayDeleteModal(false)}
          />
        )}
        <button
          onClick={() => setShouldDisplayMore((prev) => !prev)}
          type="button"
        >
          <MoreIcon />
        </button>
        <div className="relative">
          {shouldDisplayMore && (
            <div className="absolute z-10 transform text-sm -translate-x-1/2 bg-light left-0 shadow-atobi rounded-xl">
              <ControlButton
                disabled={isLoading}
                className="rounded-t-xl"
                onClick={onDisplayEditor}
              >
                <EditIcon className="w-6 h-6 mr-4" />
                <span className="whitespace-nowrap">{editLabel}</span>
              </ControlButton>
              <ControlButton
                disabled={isLoading}
                onClick={() => {
                  setShouldDisplayDeleteModal(true);
                }}
                className="rounded-b-xl"
              >
                <DeleteIcon className="w-6 h-6 mr-4" />
                <span className="whitespace-nowrap">{deleteLabel}</span>
              </ControlButton>
            </div>
          )}
        </div>
      </OutsideClickHandler>
    );
  }
  return (
    <ComplatinsPopup
      creatorName={userName}
      creatorUserId={userCommentId}
      complaintObjectId={commentId}
      complaintType={complaintType}
      onTranslate={onTranslate}
      isLoading={isLoading}
      isTranslated={isTranslated}
    />
  );
};

export default CommentControls;
