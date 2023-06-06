import { useFeatures } from '@paralleldrive/react-feature-toggles';
import { useAuthenticatedUser } from 'app/api/auth/hooks';
import { PageLoader, FormattedDate } from 'app/components';
import { useRouteId } from 'app/hooks';
import { useProfileTranslation } from 'app/internationalization/hooks';
import { ProfileLayout } from 'app/layouts';
import useStartCall from 'app/pages/VideoChat/hooks/useStartCall';
import { isActiveFeatureName, selectDefinedImageSource } from 'app/utils';
import { FC } from 'react';
import ChatIcon from 'remixicon-react/Chat1LineIcon';
import MapPinIcon from 'remixicon-react/MapPin2LineIcon';
import PhoneIcon from 'remixicon-react/PhoneFillIcon';
import ClockIcon from 'remixicon-react/TimeLineIcon';

import BetaTag from '../../VideoChat/components/BetaTag';
import Badges from '../Badges/ProfileBadge';

import useUserQuery from './useUserQuery';

const PublicProfile: FC = () => {
  const userId = useRouteId();
  const { startCall } = useStartCall();
  const { t } = useProfileTranslation();
  const features = useFeatures();

  if (typeof userId === 'string') throw new Error('User ID should be numeric');
  const { data: authenticatedUser } = useAuthenticatedUser();
  const { data: user, isLoading } = useUserQuery(userId);

  if (!user || isLoading || !authenticatedUser) return <PageLoader />;

  const call = () => startCall([userId], `${user.firstName} ${user.lastName}`);

  return (
    <div className="flex justify-center items-center">
      <ProfileLayout
        imageSource={selectDefinedImageSource({ srcSet: user.avatars })}
      >
        <div className="flex justify-between items-center mt-6 w-full">
          <p className="text-xl text-grayscale-primary">{`${user.firstName} ${user.lastName}`}</p>
          <div className="flex items-center">
            {isActiveFeatureName('videoChat', features) &&
              authenticatedUser.id !== user.id && (
                <button
                  type="button"
                  onClick={call}
                  className="p-3 mr-4 flex flex-row rounded-lg bg-light shadow-atobi"
                >
                  <PhoneIcon className="text-grayscale-secondary" />
                  <BetaTag className="ml-3" />
                </button>
              )}
            <button
              className="p-3 rounded-lg bg-light shadow-atobi"
              type="button"
            >
              <ChatIcon className="text-grayscale-secondary" />
            </button>
          </div>
        </div>
        <div className="mt-3 text-grayscale-secondary pb-8 border-b border-focus-background">
          <div className="flex items-center">
            <MapPinIcon />
            <p className="ml-4">
              {t('{{profession}} in {{location}}', {
                profession: user.profession.name,
                location: user.location.name,
              })}
            </p>
          </div>
          <div className="flex items-center mt-3">
            <ClockIcon />
            <div className="ml-4 flex">
              {t('Joined')}
              <FormattedDate className="ml-1" date={user.memberSince} />
            </div>
          </div>
        </div>
        <div className="mt-4">{user && <Badges userId={user.id} />}</div>
      </ProfileLayout>
    </div>
  );
};

export default PublicProfile;
