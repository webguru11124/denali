import styled from '@emotion/styled';
import { FileType } from 'app/api/types';
import { UserFile } from 'app/api/visualGuides/types';
import { MediaThumbnail } from 'app/components';
import i18n from 'app/internationalization/';
import { FC } from 'react';

import Tag from './Tag';

interface ListByUsersProps {
  onItemClick: (id: string) => void;
  filesByUsers: {
    [key: string]: Array<UserFile>;
  };
}

const ItemContainer = styled.div`
  height: 330px;
`;

const AmountLabelContainer = styled.div`
  background-color: rgba(113, 113, 113, 0.7);
`;

const formatAmountLabel = (amount: number) => {
  if (amount < 100) {
    return i18n.t('vmguides.Media files', {
      count: amount,
    });
  }

  return i18n.t('+99 media files');
};

const ListByUsers: FC<ListByUsersProps> = ({ onItemClick, filesByUsers }) => (
  <div className="row">
    {Object.entries(filesByUsers).map(([id, files]) => {
      const firstFile = files[0];
      if (![FileType.image, FileType.video].includes(firstFile.type)) {
        return null;
      }

      return (
        <div key={id} className="col-6 mb-8">
          <button
            type="button"
            onClick={() => onItemClick(id)}
            className="w-full"
          >
            <ItemContainer className="relative">
              <div className="absolute mt-3 ml-3 top-0 left-0">
                <Tag
                  isButton={false}
                  isSelected={false}
                  name={firstFile.userName}
                  avatars={firstFile.avatars}
                />
              </div>
              <AmountLabelContainer className="absolute px-2 py-1 rounded-full mb-3 bottom-0 left-1/2 transform -translate-x-1/2">
                <span className="text-white text-xs">
                  {formatAmountLabel(files.length)}
                </span>
              </AmountLabelContainer>
              <MediaThumbnail
                className="w-full h-full object-cover rounded-lg"
                url={firstFile.url}
                alt={firstFile.name}
                type={firstFile.type as FileType.image | FileType.video}
              />
            </ItemContainer>
          </button>
        </div>
      );
    })}
  </div>
);

export default ListByUsers;
