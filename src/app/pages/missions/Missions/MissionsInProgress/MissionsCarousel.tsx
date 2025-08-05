import styled from '@emotion/styled';
import { Mission } from 'app/api/missions/types';
import { Carousel, CircularProgressbar } from 'app/components';
import config from 'app/config';
import { routes } from 'app/router';
import { selectDefinedImageSource } from 'app/utils';
import { buildStyles } from 'react-circular-progressbar';
import { Link } from 'react-router-dom';
import ArrowLeftIcon from 'remixicon-react/ArrowLeftSLineIcon';
import ArrowRightIcon from 'remixicon-react/ArrowRightSLineIcon';
import PlayIcon from 'remixicon-react/PlayFillIcon';

import CarouselArrow from './CarouselArrow';
import CarouselItemIndicator from './CarouselItemIndicator';

interface MissionsCarouselProps {
  missions: Array<Mission>;
}

const CarouselItem = styled.div`
  height: 283px;
`;

const MissionsCarousel = ({ missions }: MissionsCarouselProps) => {
  const hasMultipleMissions = missions.length > 1;

  return (
    <Carousel
      infiniteLoop
      className="relative"
      renderArrowNext={(onClick) => {
        if (!hasMultipleMissions) return null;
        return (
          <CarouselArrow
            Icon={ArrowRightIcon}
            onClick={onClick}
            className="right-0"
          />
        );
      }}
      renderArrowPrev={(onClick) => {
        if (!hasMultipleMissions) return null;
        return (
          <CarouselArrow
            Icon={ArrowLeftIcon}
            onClick={onClick}
            className="left-0 z-10"
          />
        );
      }}
      showStatus={false}
      renderIndicator={(_, isActive) => {
        if (!hasMultipleMissions) return null;

        return <CarouselItemIndicator isActive={isActive} />;
      }}
      showThumbs={false}
    >
      {missions.map(
        ({
          id,
          name,
          logoResponsive,
          totalActivities,
          completedActivities,
        }) => (
          <CarouselItem
            key={id}
            className="shadow-card rounded-lg relative overflow-hidden"
          >
            <Link to={routes.mission.create(id)}>
              {logoResponsive ? (
                <>
                  <div className="absolute opacity-75 top-0 left-0 w-full h-full bg-grayscale-secondary" />
                  <img
                    className="rounded-lg max-h-full object-cover h-full"
                    {...selectDefinedImageSource({
                      srcSet: logoResponsive.sizes,
                      src: logoResponsive.url,
                    })}
                    alt={name}
                  />
                </>
              ) : (
                <div className="w-full h-full bg-pink" />
              )}
              <div className="w-21 h-21 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <CircularProgressbar
                  strokeWidth={20}
                  styles={buildStyles({
                    trailColor: 'transparent',
                    strokeLinecap: 'butt',
                    pathColor: config.colors.greenDark,
                  })}
                  value={(completedActivities / totalActivities) * 100}
                >
                  <div className="w-16 h-16 bg-grayscale-secondary rounded-full flex items-center justify-center">
                    <PlayIcon className="w-8 h-8 text-white" />
                  </div>
                </CircularProgressbar>
              </div>
              <div className="absolute w-full mb-10 text-xl text-white bottom-0 left-1/2 transform -translate-x-1/2">
                <span className="line-clamp-1">{name}</span>
              </div>
            </Link>
          </CarouselItem>
        )
      )}
    </Carousel>
  );
};

export default MissionsCarousel;
