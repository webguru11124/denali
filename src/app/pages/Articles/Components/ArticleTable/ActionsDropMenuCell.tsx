import { ActionsDropdown } from 'app/components';
import { useArticlesTranslation } from 'app/internationalization/hooks';
import routes from 'app/router/routes';
import { ReactComponent as ThreeDots } from 'assets/icons/three_dots_vertical.svg';
import {
  MessageEdit,
  ReceiveSquare,
  TransmitSquare,
  Trash,
  Eye,
} from 'iconsax-react';
import { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { useHistory } from 'react-router-dom';

import { useArticlesContext } from '../../context';

const ActionsDropMenuCell = ({
  id,
  unArchive,
}: {
  id: number;
  unArchive: (id: number) => void;
}) => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const { t } = useArticlesTranslation();
  const {
    setArchiveModalState,
    setDeleteModalState,
    articleFilters: { status },
  } = useArticlesContext();

  const isArchived = status === 'archived';

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
      text: t('Delete'),
      Icon: Trash,
      onClick: () => setDeleteModalState({ open: true, ids: [id] }),
    },
  ];

  const actionWithArchive = [
    ...defaultActionItems,
    {
      text: t('Archive'),
      Icon: ReceiveSquare,
      onClick: () => setArchiveModalState({ open: true, ids: [id] }),
    },
  ];

  const actionWithUnArchive = [
    ...defaultActionItems,
    {
      text: t('Unarchive'),
      Icon: TransmitSquare,
      onClick: () => unArchive(id),
    },
  ];

  return (
    <td className="w-[96px]">
      <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
        <div className="flex justify-center">
          <div className="relative rounded-xl border border-grayscale-bg-dark shadow-atobi bg-white">
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
                items={isArchived ? actionWithUnArchive : actionWithArchive}
              />
            )}
          </div>
        </div>
      </OutsideClickHandler>
    </td>
  );
};

export default ActionsDropMenuCell;
