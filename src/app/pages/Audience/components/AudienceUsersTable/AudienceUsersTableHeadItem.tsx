import { VerticalChevron } from 'app/components';
import expandIcon from 'assets/icons/expand.svg';
import { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

interface ArticleTableHeadItemProps {
  expand?: boolean;
  sort?: boolean;
  text: string;
}

const AudienceUsersTableHeadItem = ({
  expand,
  sort,
  text,
}: ArticleTableHeadItemProps) => {
  const [open, setOpen] = useState(false);

  return (
    <th>
      <div className="flex items-center justify-start mb-4">
        <label className="text-sm font-normal text-grayscale-secondary">
          {text}
        </label>
        {expand && (
          <button onClick={() => null}>
            <img src={expandIcon} alt="" />
          </button>
        )}

        {sort && (
          <div className="relative flex">
            <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
              <VerticalChevron
                onClick={() => setOpen((isOpen) => !isOpen)}
                open={open}
              />
            </OutsideClickHandler>
          </div>
        )}
      </div>
    </th>
  );
};

export default AudienceUsersTableHeadItem;
