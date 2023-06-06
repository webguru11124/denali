import { Audience } from 'app/api/audiences/types';
import { useAudiencesTranslation } from 'app/internationalization/hooks';
import expand from 'assets/icons/expand.svg';
import noop from 'lodash/noop';

import { useAudiencesContext } from '../../context';

import AudiencesTableHeadItem from './AudiencesTableHeadItem';
import BulkOperationsRow from './BulkOperationsRow';

interface AudiencesTableHeadProps {
  audiences: Audience[];
}

const AudiencesTableHead = ({ audiences }: AudiencesTableHeadProps) => {
  const { t } = useAudiencesTranslation();
  const { selectedAudiences, setSelectedAudiences } = useAudiencesContext();

  return (
    <thead>
      <tr>
        <AudiencesTableHeadItem
          text={t('Name')}
          margin
          checkboxChangeHandler={() => {
            if (selectedAudiences.length === 0) {
              setSelectedAudiences(audiences.map((audience) => audience.id));
              return;
            }

            setSelectedAudiences([]);
          }}
        />
        {selectedAudiences.length === 0 && (
          <>
            <AudiencesTableHeadItem
              icon={expand}
              text={t('Profession & Location')}
            />
            <AudiencesTableHeadItem text={t('Date Updated')} />
            <AudiencesTableHeadItem text={t('Updated By')} />
            <th id="actions" className="invisible"></th>
          </>
        )}

        {selectedAudiences.length > 0 && <BulkOperationsRow />}
      </tr>
    </thead>
  );
};

export default AudiencesTableHead;
