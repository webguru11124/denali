import { css, cx } from '@emotion/css';
import { Audience } from 'app/api/audiences/types';
import config from 'app/config';
import { useNotFoundTranslation } from "app/internationalization/hooks";

import { DeleteModalState, useAudiencesContext } from '../../context';

import ActionsDropMenuCell from './ActionsDropMenuCell';
import AudiencesSummaryCell from './AudiencesSummaryCell';
import AudiencesTableHead from './AudiencesTableHead';
import DateCell from './DateCell';
import ProfessionLocationCell from './ProfessionLocationCell';
import UpdatedByCell from './UpdatedByCell';

interface AudiencesTableProps {
  audiences: Audience[];
  onViewClick: (audienceId: number) => void;
  onDeleteClick: ({ open, id, members }: DeleteModalState) => void;
}

const AudiencesTable = ({
  audiences,
  onViewClick,
  onDeleteClick,
}: AudiencesTableProps) => {
  const { selectedAudiences } = useAudiencesContext();

  const hoveredOrActiveTableRowStyles = `background: ${config.colors['focus-background']};`;

  const {t} = useNotFoundTranslation();

  return (
    <table
      className={cx(
        'w-full mt-6.5',
        css('td {padding-top: 20px; padding-bottom:20px;}')
      )}
    >
      <AudiencesTableHead audiences={audiences} />
      <tbody>
        {audiences.map((audience) => (
          <tr
            key={audience.id}
            className={cx(
              'border-b border-b-hover-blue cursor-pointer',
              css(`
            &:hover {
              ${hoveredOrActiveTableRowStyles}
            }
            ${
              selectedAudiences.includes(audience.id) &&
              hoveredOrActiveTableRowStyles
            }
          `)
            )}
            onClick={() => onViewClick(audience.id)}
          >
            <AudiencesSummaryCell
              id={audience.id}
              name={audience.name}
              userCount={audience.usersCount ?? 0}
            />
            <ProfessionLocationCell
              professions={audience.professions}
              locations={audience.locations}
            />
            <DateCell date={audience.updatedAt} />
            <UpdatedByCell
              name={audience.updatedBy?.fullName || t('Ex-colleague') || undefined }
              email={audience.updatedBy?.email}
            />
            <ActionsDropMenuCell
              onViewClick={() => onViewClick(audience.id)}
              onDeleteClick={() =>
                onDeleteClick({
                  open: true,
                  id: audience.id,
                  members: audience.usersCount ?? undefined,
                })
              }
            />
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AudiencesTable;
