import { cx } from '@emotion/css';
import styled from '@emotion/styled';
import { types } from 'app/api/auth';
import { Spinner, LockedContent } from 'app/components';
import { useProfileTranslation } from 'app/internationalization/hooks';
import { createSrcSet, getPlainText } from 'app/utils';
import { FC, useState } from 'react';

import BadgeModal from './BadgeModal';
import useBadgesQuery from './useBadgesQuery';

interface ProfileBadgeProps {
  userId: number;
}

const CardContainer = styled.button`
  min-height: 253px;
  max-height: 253px;
`;

const ImageContainer = styled.img`
  height: 150px;
`;

const ProfileBadge: FC<ProfileBadgeProps> = ({ userId }) => {
  const { data: badges, isLoading } = useBadgesQuery(userId);
  const [selectedBadge, setSelectedBadge] = useState<types.Badge | null>(null);
  const { t } = useProfileTranslation();
  return (
    <div>
      {selectedBadge && (
        <BadgeModal
          srcSet={createSrcSet(selectedBadge.icon)}
          contentSrcSet={
            selectedBadge.contentImage &&
            createSrcSet(selectedBadge.contentImage)
          }
          onClose={() => setSelectedBadge(null)}
          title={selectedBadge.title}
          description={
            selectedBadge.progress === 1
              ? selectedBadge.howObtained
              : selectedBadge.howToObtain
          }
          isLocked={selectedBadge.progress !== 1}
        />
      )}
      <div className="text-lg text-grayscale-primary">{t('Badges')}</div>
      {!badges || isLoading ? (
        <div className="flex items-center justyfi-center">
          <Spinner />
        </div>
      ) : (
        <div className="row pt-6">
          {badges.map(
            (
              { icon, title, howObtained, markdown, progress, ...rest },
              index: number
            ) => (
              <CardContainer
                onClick={() =>
                  setSelectedBadge({
                    ...rest,
                    icon,
                    title,
                    howObtained,
                    markdown,
                    progress,
                  })
                }
                className="col-6 xl:col-4 mb-6"
                key={String(index)}
              >
                <LockedContent
                  className="rounded-xl"
                  progress={progress || 0}
                  isLocked={progress !== 1}
                >
                  <div className="w-full h-full flex flex-col items-center text-center shadow-atobi rounded-xl">
                    <ImageContainer
                      srcSet={createSrcSet(icon)}
                      className={cx(
                        'bg-center bg-no-repeat bg-contain object-cover w-full h-full rounded-t-xl'
                      )}
                    />
                    <div className="pb-4">
                      <div className="mt-2 line-clamp-1 text-grayscale-primary text-base px-4 overflow-hidden">
                        {title}
                      </div>
                      <div className="px-4 line-clamp-2 mt-1 text-sm overflow-hidden">
                        {getPlainText(howObtained, Boolean(markdown))}
                      </div>
                    </div>
                  </div>
                </LockedContent>
              </CardContainer>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileBadge;
