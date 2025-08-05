import { Audience } from 'app/api/audiences/types';
import CheckBox from 'app/components/Checkbox';
import { useAudiencesTranslation } from 'app/internationalization/hooks';
import { Global } from 'iconsax-react';

import { useAudiencesContext } from '../../context';

interface AudienceSummaryCellProps extends Pick<Audience, 'name' | 'id'> {
  name: string;
  userCount?: number;
  timezoneCount?: number;
}

const AudienceSummaryCell = ({
  id,
  name,
  userCount = 0,
  timezoneCount = 0,
}: AudienceSummaryCellProps) => {
  const { t } = useAudiencesTranslation();

  const { selectedAudiences, setSelectedAudiences } = useAudiencesContext();

  return (
    <td className="pl-3">
      <div className="flex justify-start items-center max-w-md">
        <CheckBox
          id={`${name}-${id}`}
          checked={selectedAudiences.includes(id)}
          onChange={() =>
            setSelectedAudiences((prev) => {
              if (prev.includes(id)) {
                return prev.filter((val) => val !== id);
              }

              return [...prev, id];
            })
          }
          onClick={(e) => e.stopPropagation()}
        />

        <div className="relative rounded-lg border border-gray-light ml-[22px] mr-4">
          <div className="w-10 h-10 flex items-center justify-center whitespace-nowrap text-grayscale-secondary">
            <Global size={32} />
          </div>
        </div>
        <div className="flex flex-col justify-center min-w-0">
          <div className="flex mb-0.5">
            <span className="text-ellipsis whitespace-nowrap overflow-hidden font-bold">
              {name}
            </span>
          </div>
          <div className="flex items-center justify-start mt-0.5 text-sm text-grayscale-secondary">
            {t('{{count}} Members', { count: userCount })}
          </div>
        </div>
      </div>
    </td>
  );
};

export default AudienceSummaryCell;
