interface AudienceUsersTableCellProps {
  avatar?: string;
  name?: string;
  email?: string;
  profession?: string;
  location?: string;
}

const AudienceUsersTableCell = ({
  avatar,
  name,
  email,
  profession,
  location,
}: AudienceUsersTableCellProps) => {
  return (
    <td className="text-sm text-grayscale-secondary">
      {profession && profession}
      {location && location}
      {avatar && (
        <div className="flex">
          <img src={avatar} alt="" />
          <div className="flex flex-col ml-3">
            <span className="text-grayscale-primary">{name}</span>
            <span className="text-grayscale-secondary">{email}</span>
          </div>
        </div>
      )}
    </td>
  );
};

export default AudienceUsersTableCell;
