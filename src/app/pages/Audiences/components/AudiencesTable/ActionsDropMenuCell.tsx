import { ActionsDropdown } from 'app/components';
import {
  useAudiencesTranslation,
  useComponentsTranslation,
} from 'app/internationalization/hooks';
import { ReactComponent as ThreeDots } from 'assets/icons/three_dots_vertical.svg';
import { Eye, Trash } from 'iconsax-react';
import { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

interface ActionsDropMenuCellProps {
  onDeleteClick: VoidFunction;
  onViewClick: VoidFunction;
}

const ActionsDropMenuCell = ({
  onDeleteClick,
  onViewClick,
}: ActionsDropMenuCellProps) => {
  const [open, setOpen] = useState(false);
  const { t } = useAudiencesTranslation();
  const { t: tc } = useComponentsTranslation();

  const items = [
    {
      text: t('View Audience'),
      Icon: Eye,
      onClick: onViewClick,
    },
    {
      text: tc('Delete'),
      Icon: Trash,
      onClick: onDeleteClick,
    },
  ];
  return (
    <td className="w-[96px]">
      <div className="flex justify-center">
        <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
          <div className="relative rounded-xl border border-grayscale-bg-dark shadow-atobi bg-white">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen((isOpen) => !isOpen);
              }}
              className="w-10 h-10 flex items-center justify-center whitespace-nowrap"
              type="button"
            >
              <ThreeDots />
            </button>

            {open && <ActionsDropdown items={items} className="w-[209px]" />}
          </div>
        </OutsideClickHandler>
      </div>
    </td>
  );
};
export default ActionsDropMenuCell;
