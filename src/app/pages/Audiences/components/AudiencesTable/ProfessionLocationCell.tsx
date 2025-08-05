import { Location } from 'app/api/auth/types';
import { Profession } from 'app/api/professions/types';
import { useAudiencesTranslation } from 'app/internationalization/hooks';

interface ProfessionLocationCellProps {
  professions: Profession[];
  locations: Location[];
}

const ProfessionLocationCell = ({
  professions,
  locations,
}: ProfessionLocationCellProps) => {
  const { t } = useAudiencesTranslation();

  const getProfessionsText = () => {
    if (professions.length === 0) return t('All Professions');

    const professionName = professions[0].name;

    const restProfessions =
      professions.length - 1 === 0 ? '' : `[+${professions.length - 1}]`;

    const content = `${professionName} ${restProfessions}`;

    return content;
  };

  const getLocationstext = () => {
    if (locations.length === 0) return '-';

    const locationName = locations[0].name;

    const restLocations =
      locations.length - 1 === 0 ? '' : `[+${locations.length - 1}]`;

    const content = `${locationName} ${restLocations}`;

    return content;
  };

  return (
    <td>
      <div className="flex flex-col">
        <span className="text-sm text-grayscale-primary font-bold">
          {getProfessionsText()}
        </span>
        <span className="text-xs text-grayscale-secondary">
          {getLocationstext()}
        </span>
      </div>
    </td>
  );
};

export default ProfessionLocationCell;
