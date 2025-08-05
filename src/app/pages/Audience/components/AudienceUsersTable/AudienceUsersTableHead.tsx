import { useAudiencesTranslation } from 'app/internationalization/hooks';

import AudienceUsersTableHeadItem from './AudienceUsersTableHeadItem';

const AudienceUsersTableHead = () => {
  const { t } = useAudiencesTranslation();
  return (
    <thead>
      <tr>
        <AudienceUsersTableHeadItem sort={true} text={t('Name')} />
        <AudienceUsersTableHeadItem text={t('Profession')} />
        <AudienceUsersTableHeadItem expand={true} text={t('Location')} />
      </tr>
    </thead>
  );
};

export default AudienceUsersTableHead;
