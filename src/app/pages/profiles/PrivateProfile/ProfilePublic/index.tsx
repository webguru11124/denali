import { hooks } from 'app/api/auth';
import { FormattedDate } from 'app/components';
import { useProfileTranslation } from 'app/internationalization/hooks';
import { routes, constants } from 'app/router';
import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MapPinIcon from 'remixicon-react/MapPin2LineIcon';
import ClockIcon from 'remixicon-react/TimeLineIcon';
import LanguageIcon from 'remixicon-react/TranslateIcon';
import UserSettingsIcon from 'remixicon-react/UserSettingsLineIcon';

import Badges from '../../Badges/ProfileBadge';
import useLanguagesQuery from '../ProfileEdit/useLanguagesQuery';

const { useAuthenticatedUser } = hooks;

const ProfilePublic: FC = () => {
  const { data: user } = useAuthenticatedUser();
  const { t } = useProfileTranslation();
  const [selectedTranslationLanguage, setSelectedTranslationLanguage] = useState('');

  const { data: languages } = useLanguagesQuery();

  useEffect(() => {
    if (user?.translationLanguage && languages) {
      const selectedLanguage = languages.filter(lang => lang.code === user.translationLanguage)[0].name
      setSelectedTranslationLanguage(selectedLanguage);
    }
  }, [user?.translationLanguage, languages])

  if (!user) {
    return null;
  }

  return (
    <>
      <div className="flex items-center mt-6 w-full">
        <p className="text-xl text-grayscale-primary line-clamp-1 pr-8">
          {user.name}
        </p>
        <Link
          className="ml-auto flex items-center text-grayscale-secondary shadow-atobi rounded-xl"
          to={routes.profile.create(constants.profilePageTypes.edit)}
        >
          <span className="p-2 rounded-xl bg-light shadow-atobi">
            <UserSettingsIcon />
          </span>
          <span className="my-2 mr-6 ml-5 lg:whitespace-nowrap">
            {t('Edit your profile')}
          </span>
        </Link>
      </div>
      <div className="mt-3 text-grayscale-secondary pb-8 border-b border-focus-background">
        <div className="flex items-center">
          <MapPinIcon />
          <p className="ml-4">
            {t('{{profession}} in {{location}}', {
              profession: user.profession.name,
              location: user.location.name,
            })}
            {user.profession.name} in {user.location.name}
          </p>
        </div>
        <div className="flex items-center mt-3">
          <ClockIcon />
          <div className="ml-4 flex">
            {t('Joined')}
            <FormattedDate date={user.memberSince} className="ml-1" />
          </div>
        </div>
        <div className="flex items-center mt-3">
          <LanguageIcon />
          <p className="ml-4">{selectedTranslationLanguage}</p>
        </div>
      </div>
      <div className="mt-4">{user && <Badges userId={user.id} />}</div>
    </>
  );
};

export default ProfilePublic;
