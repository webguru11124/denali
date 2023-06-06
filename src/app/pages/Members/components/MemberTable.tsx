import { css, cx } from '@emotion/css';
import { PageLoader } from 'app/components';
import config from 'app/config';

import { useMembersContext } from '../context';

import ActionsDropMenuCell from './ActionsDropMenuCell';
import CreatedAtCell from './CreatedAtCell';
import LanguageCell from './LanguageCell';
import LocationAndProfessionsCell from './LocationAndProfessionsCell'
import MemberSummaryCell from './MemberSummaryCell';
import MemberTableHead from './MemberTableHead';
import RolesCell from './RolesCell';

const MemberTable = () => {

  const {
    members,
    isFetching,
  } = useMembersContext();

  if (isFetching) return <PageLoader />;

  const hoveredOrActiveTableRowStyles = `background: ${config.colors['focus-background']};`;

  return (
    <div>
      {members && (
        <table className={cx(
          'w-full mt-6.5',
          css('td {padding-top: 8px; padding-bottom:8px;}')
        )}>
          <MemberTableHead />

          <tbody>
            {members.map((member) => {
              return (
                <tr
                  className={cx(
                    'border-b border-b-hover-blue cursor-pointer',
                    css(`
                  &:hover {
                    ${hoveredOrActiveTableRowStyles}
                  }`)
                  )}
                  key={member.id}
                >
                  <MemberSummaryCell
                    id={member.id}
                    fullName={member.fullName}
                    avatar={member.avatars.small}
                    email={member.email}
                  />
                  <LocationAndProfessionsCell
                    locations={member.locations}
                    professions={member.professions}
                  />
                  <RolesCell roles={member.roles} />
                  <LanguageCell language={member.language} />
                  <CreatedAtCell createAt={member.createdAt} status={member.status} />
                  <ActionsDropMenuCell id={member.id} />
                </tr>
              );
            })}
          </tbody>

        </table>
      )}
    </div>
  )
};

export default MemberTable;
