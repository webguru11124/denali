import styled from '@emotion/styled';
import { FileType } from 'app/api/types';
import { useVisualGuideQuery } from 'app/api/visualGuides/hooks';
import {
  FileButton,
  Spinner,
  UncontrolledVideoPlayer,
  LinkButton,
} from 'app/components';
import { useVMGuidesTranslation } from 'app/internationalization/hooks';
import { selectDefinedImageSource } from 'app/utils';
import { FC } from 'react';

import Empty from '../Empty';

import PicturesForm from './PicturesForm';

interface GuideProps {
  guideId: number;
}

const ITEM_HEIGHT = '422px';

const Container = styled.div`
  margin-bottom: 100px;
`;

const MediaItemContainer = styled.div`
  height: ${ITEM_HEIGHT};
`;

const Guide: FC<GuideProps> = ({ guideId }) => {
  const { data, isLoading } = useVisualGuideQuery(guideId);

  const { t } = useVMGuidesTranslation();

  if (!data || isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <Container>
      <PicturesForm guideId={guideId} />

      {data.media.length ? (
        <>
          <p className="text-lg">{t('Instructions')}</p>
          <div className="row mt-3">
            {data.links.map(({ url, title }) => (
              <div className="col-6">
                <LinkButton to={url} label={title} />
              </div>
            ))}
          </div>
          <div className="row">
            {data.files.map(({ fileName, type, url, id }) => (
              <div className="col-6 mt-3" key={id}>
                <FileButton
                  className="w-full"
                  name={fileName}
                  type={type}
                  url={url}
                />
              </div>
            ))}
          </div>
          <p className="text-lg mt-6">{t('Inspiration')}</p>
          {data.media.map(({ url, sizes, fileName, type, id }) => {
            const resolveContent = () => {
              if (type === FileType.image) {
                return (
                  <img
                    alt={fileName}
                    className="mt-3 h-full object-cover w-full rounded-lg"
                    {...selectDefinedImageSource({
                      srcSet: sizes,
                      src: url,
                    })}
                  />
                );
              }

              return (
                <UncontrolledVideoPlayer
                  className="w-full h-full object-contain"
                  height={ITEM_HEIGHT}
                  url={url}
                />
              );
            };

            return (
              <MediaItemContainer
                key={id}
                className="rounded-lg mt-3 overflow-hidden"
              >
                {resolveContent()}
              </MediaItemContainer>
            );
          })}
        </>
      ) : (
        <Empty />
      )}
    </Container>
  );
};

export default Guide;
