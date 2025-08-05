import { SortByColumn } from 'app/api/user/types';
import { useMembersTranslation } from 'app/internationalization/hooks';

import MemberTableHeadItem from './MemberTableHeadItem';

const MemberTableHead = () => {
  const { t } = useMembersTranslation();

  return (
    <thead>
      <tr>
        <MemberTableHeadItem
          text={t('Member')}
          tabName={SortByColumn.name}
          margin
          checkboxChangeHandler={() => {
            return;
          }}
        />
        <MemberTableHeadItem text={t('Location & Profession')} />
        <MemberTableHeadItem text={t('Role')} />
        <MemberTableHeadItem text={t('Language')} />
        <MemberTableHeadItem
          text={t('Last active')}
          tabName={SortByColumn.date}
        />
      </tr>
    </thead>
  );
};

export default MemberTableHead;
