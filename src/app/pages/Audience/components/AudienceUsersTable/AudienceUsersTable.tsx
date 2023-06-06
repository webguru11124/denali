import { css, cx } from '@emotion/css';
import { AudienceUser } from 'app/api/audiences/types';
import { PageLoader } from 'app/components';

import AudienceUsersTableHead from './AudienceUsersTableHead';
import AudienceUsersTableCell from './AudienceUserTableCell';

interface AudienceUsersTableProps {
  users?: AudienceUser[];
  isLoading: boolean;
}

const AudienceUsersTable = ({ users, isLoading }: AudienceUsersTableProps) => {
  if (isLoading) return <PageLoader />;
  if (!users || users.length === 0) return <></>;

  return (
    <table
      className={cx(
        'table-auto w-full mt-6.5',
        css('td {padding-top: 20px; padding-bottom:20px;}')
      )}
    >
      <AudienceUsersTableHead />
      <tbody>
        {users.map((user) => (
          <tr key={user.id} className="border-b border-b-hover-blue">
            <AudienceUsersTableCell
              name={user.fullName}
              email={user.email}
              avatar={user.avatars.small}
            />
            <AudienceUsersTableCell profession={user.professions[0].name} />
            <AudienceUsersTableCell location={user.primaryLocation.name} />
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AudienceUsersTable;
