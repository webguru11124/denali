import styled from '@emotion/styled';
import PrivacyPolicyLink from 'app/components/PrivacyPolicyLink';
import { useSelector } from 'app/hooks';
import { useComponentsTranslation } from 'app/internationalization/hooks';
import { routes } from 'app/router';
import { selectors } from 'app/store/auth';
import { createDeprecatedAtobiURL } from 'app/utils';
import React from 'react';
import { Link } from 'react-router-dom';

const UserMenuContainer = styled.div`
  transform: translate(-80%, 100%);
  width: 248px;
`;

interface UserMenuProps {
  name: string;
  logout: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ name, logout }) => {
  const { t } = useComponentsTranslation();
  return (
    <UserMenuContainer className="absolute z-10 left-0 -bottom-1 bg-light rounded-lg shadow-atobi">
      <div className="flex items-center p-4 border-b border-gray-light">
        <p className="font-bold text-sm line-clamp-2 break-all">{name}</p>
      </div>
      <div className="flex flex-col p-4 border-b border-gray-light">
        <Link to={routes.profile.create('view')}>{t('View Profile')}</Link>
        <Link className="mt-4" to={routes.profile.create('edit')}>
          {t('Edit Profile')}
        </Link>
      </div>
      <div className="flex flex-col p-4 ">
        <PrivacyPolicyLink text={`${t('View Privacy Policy')}`} />
        <button type="button" onClick={logout} className="text-left mt-4">
          {t('Sign Out')}
        </button>
      </div>
    </UserMenuContainer>
  );
};

export default UserMenu;
