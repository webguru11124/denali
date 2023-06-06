import { Location, Profession } from 'app/api/auth/types';


interface LocationAndProfessionsCellProps {
  locations: Array<Location>;
  professions: Array<Profession>;
}

const LocationAndProfessionsCell = ({
  locations,
  professions,
}: LocationAndProfessionsCellProps) => {
  return (
    <td>
      <div className="flex justify-start items-center max-w-md">
        <div className="flex flex-col justify-between min-w-0">
          <div className="text-ellipsis">
            {locations && locations.map((location) => (
              <span key={`${location.id}${location.name}`}>{location.name}</span>
            ))}
          </div>
          <div className='text-grayscale-secondary'>
            {professions && professions.map((profession) => (
              <span key={`${profession.id}${profession.name}`}>{profession.name}, </span>
            ))}
          </div>
        </div>
      </div>
    </td>
  );
};

export default LocationAndProfessionsCell;
