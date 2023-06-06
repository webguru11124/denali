import { ActionsDropdown } from 'app/components';
import { useMembersTranslation } from 'app/internationalization/hooks';
import routes from 'app/router/routes';
import { ReactComponent as ThreeDots } from 'assets/icons/three_dots_vertical.svg';
import { MessageEdit, FolderOpen, Eye, Trash, Refresh } from 'iconsax-react';
import { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { useHistory } from 'react-router-dom';

import { useMembersContext } from '../context';

const ActionsDropMenuCell = ({ id }: { id: number }) => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const { t } = useMembersTranslation();
  const { setDeleteModalState, setArchiveModalState, setAnonymizeModalState } =
    useMembersContext();
  const defaultActionItems = [
    {
      text: t('View'),
      Icon: Eye,
      onClick: () =>
        history.push(routes.editorArticle.create(id.toString(), 'view')),
    },
    {
      text: t('Edit'),
      Icon: MessageEdit,
      onClick: () =>
        history.push(routes.editorArticle.create(id.toString(), 'edit')),
    },
    {
      text: t('Archive'),
      Icon: FolderOpen,
      onClick: () => setArchiveModalState({ open: true, ids: [id] }),
    },
    {
      text: t('Anonymize'),
      Icon: Trash,
      onClick: () => setAnonymizeModalState({ open: true, ids: [id] }),
    },
    {
      text: t('Delete'),
      Icon: Trash,
      onClick: () => setDeleteModalState({ open: true, ids: [id] }),
    },
    {
      text: t('Reset Password'),
      Icon: Refresh,
      onClick: () =>
        history.push(routes.editorArticle.create(id.toString(), 'edit')),
    },
  ];

  return (
    <td className="w-[96px]">
      <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
        <div className="flex justify-center">
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen((isOpen) => !isOpen);
              }}
              className="w-10 h-10 flex items-center justify-center whitespace-nowrap"
              type="button"
              data-bs-toggle="dropdown"
            >
              <ThreeDots />
            </button>
            {open && (
              <ActionsDropdown
                className="w-[209px]"
                items={defaultActionItems}
              />
            )}
          </div>
        </div>
      </OutsideClickHandler>
    </td>
  );
};

export default ActionsDropMenuCell;
