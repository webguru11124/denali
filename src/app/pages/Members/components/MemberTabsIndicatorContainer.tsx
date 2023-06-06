import { UserStatus } from 'app/api/user/types';
import TabIndicator from 'app/components/TabIndicator';
import { useDispatch } from 'app/hooks';
import { useMembersTranslation } from 'app/internationalization/hooks';
import { actions, selectors } from 'app/store/common';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useMembersContext } from '../context';

const MemberTabsIndicatorContainer = () => {
  const { memberFilter, setMemberFiler } = useMembersContext();
  const { t } = useMembersTranslation();

  const dispatch = useDispatch();
  const memberTab = useSelector(selectors.getMembersTab);

  const tabs: { [key in UserStatus]: string } = {
    active: t('Active'),
    archived: t('Archived'),
    anonymized: t('Anonymized'),
  };

  useEffect(() => {
    if (!memberTab) return;

    setMemberFiler((prev) => {
      return { ...prev, status: memberTab };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex">
      {Object.keys(tabs).map((key, index) => {
        const newKey = key as UserStatus;
        return (
          <TabIndicator
            key={index}
            label={tabs[newKey]}
            selected={newKey === memberFilter.status}
            onClick={() => {
              dispatch(actions.setMembersTab(newKey));
              setMemberFiler((prev) => {
                return { ...prev, status: newKey };
              });
              // setSelectedMembers([]);
            }}
          />
        );
      })}
    </div>
  );
};

export default MemberTabsIndicatorContainer;
