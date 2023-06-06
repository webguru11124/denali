import { MemberRole } from 'app/api/auth/types';

interface RolesCellProps {
  roles: Array<MemberRole>;
}

const RolesCell = ({
  roles,
}: RolesCellProps) => {
  return (
    <td>
      <div className="flex justify-start items-center max-w-md">
        <div className="flex flex-col justify-between min-w-0">
          <div className="text-secondary">
            {roles && roles.map((role) => (
              <span key={`${role.id}${role.name}`}>{role.name}</span>
            ))}
          </div>
        </div>
      </div>
    </td>
  );
};

export default RolesCell;
