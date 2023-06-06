import { cx } from '@emotion/css';
import styled from '@emotion/styled';
import { Mission } from 'app/api/missions/types';
import { Carousel, Null } from 'app/components';
import config from 'app/config';
import { routes } from 'app/router';
import { selectDefinedImageSource } from 'app/utils';
import { Link } from 'react-router-dom';
import LightbulbFlashLineIcon from 'remixicon-react/LightbulbFlashLineIcon';

interface MissionsCarouselProps {
  chunkedMissions: Array<Array<Mission>>;
  selectedSlide: number;
  isLoading: boolean;
}

const MissionRow = styled.div`
  width: 710px;
  @media (min-width: ${config.screenSizes['2xl']}) {
    width: 950px;
  }
  padding-left: 10px;
  height: 290px;
`;

const ImageContainer = styled.div`
  height: 185px;
  overflow: hidden;
`;

const TitleContainer = styled.div`
  height: 95px;
`;

const MissionsCarousel = ({
  chunkedMissions,
  selectedSlide,
}: MissionsCarouselProps) => (
  <>
    <Carousel
      renderArrowPrev={() => <Null />}
      renderArrowNext={() => <Null />}
      showThumbs={false}
      selectedItem={selectedSlide}
      showStatus={false}
      renderIndicator={() => <Null />}
      infiniteLoop
    >
      {chunkedMissions.map((missionsChunk) => (
        <MissionRow key={missionsChunk[0].id} className={cx('row')}>
          {missionsChunk.map(({ logoResponsive, name, id }) => {
            const imageSource = selectDefinedImageSource({
              srcSet: logoResponsive?.sizes,
              src: logoResponsive?.url,
            });
            return (
              <Link
                key={id}
                to={routes.mission.create(id)}
                className="pr-0 col-4 2xl:col-3"
              >
                <div className="shadow-atobi rounded-lg">
                  <ImageContainer>
                    {imageSource ? (
                      <img
                        {...imageSource}
                        className="rounded-t-lg object-cover w-full h-full"
                        alt={name}
                      />
                    ) : (
                      <div className="flex rounded-t-lg h-full items-center justify-center bg-pink">
                        <LightbulbFlashLineIcon className="text-white w-12 h-12" />
                      </div>
                    )}
                  </ImageContainer>
                  <TitleContainer className="flex h-auto items-center justify-center">
                    <span className="line-clamp-1">{name}</span>
                  </TitleContainer>
                </div>
              </Link>
            );
          })}
        </MissionRow>
      ))}
    </Carousel>
  </>
);

export default MissionsCarousel;
