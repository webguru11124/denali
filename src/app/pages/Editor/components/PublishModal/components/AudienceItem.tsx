import { cx } from '@emotion/css';
import { useAudiencesTranslation } from 'app/internationalization/hooks';
import { Eye, Global } from 'iconsax-react';

import AudienceOptions from './AudienceOptions';

interface AudienceItemProps {
  name: string;
  members: number;
  audienceId: number;
  index: number;
  onClick: VoidFunction;
}

const AudienceItem = ({
  name,
  members,
  audienceId,
  index,
  onClick,
}: AudienceItemProps) => {
  const { t } = useAudiencesTranslation();
  return (
    <div
      className={cx('flex items-center w-full rounded-sm', {
        'mt-3': index > 0,
      })}
    >
      <div className="w-8 h-8 flex items-center justify-center  text-grayscale-secondary rounded-lg border border-gray-light bg-white">
        <Global size={24} />
      </div>
      <div className="flex flex-col justify-center min-w-0 ml-3">
        <div className="flex mb-0.5">
          <span className="text-sm text-ellipsis whitespace-nowrap overflow-hidden ">
            {name}
          </span>
        </div>
        <div className="flex items-center justify-start text-sm text-grayscale-secondary">
          <Eye size={16} />
          <span className="ml-1">
            {t('{{count}} Members', {
              count: members,
            })}
          </span>
        </div>
      </div>
      <AudienceOptions audienceId={audienceId} removeAudience={onClick} />
    </div>
  );
};

export default AudienceItem;
