import styled from '@emotion/styled';
import { ApiFile } from 'app/api/types';
import { FormattedDate } from 'app/components';
import { routes } from 'app/router';
import { selectDefinedImageSource } from 'app/utils';
import { Link } from 'react-router-dom';
import BookletIcon from 'remixicon-react/BookletLineIcon';
import CameraIcon from 'remixicon-react/CameraLineIcon';
import TimeIcon from 'remixicon-react/TimeLineIcon';

interface GuideCardProps {
  image: ApiFile | undefined;
  mediaItemsCount: number;
  title: string;
  appearsDate: string | null;
  id: number;
}

const ImageContainer = styled.div`
  height: 174px;
  width: 100%;
`;

const GuideCard = ({
  image,
  mediaItemsCount,
  title,
  id,
  appearsDate,
}: GuideCardProps) => {
  const imageSource = selectDefinedImageSource({
    srcSet: image?.sizes,
    src: image?.url,
  });

  return (
    <Link to={routes.visualGuide.create(id)}>
      <div className="shadow-atobi rounded-lg overflow-hidden w-full text-left">
        <ImageContainer className="bg-pink flex items-center justify-center">
          {imageSource ? (
            <img
              alt="name"
              className="w-full h-full object-cover"
              {...imageSource}
            />
          ) : (
            <BookletIcon className="w-10 h-10 text-white" />
          )}
        </ImageContainer>
        <div className="mt-4 mx-4">
          <p className="text-grayscale-primary text-lg">
            <span className="line-clamp-1">{title}</span>
          </p>
          <div className="flex text-grayscale-secondary mt-6 mb-5">
            <div className="flex items-center">
              <CameraIcon className="w-4 h-4 mr-1" />
              <p className="text-xs">{mediaItemsCount}</p>
            </div>
            {appearsDate && (
              <div className="flex items-center ml-auto">
                <TimeIcon className="w-4 h-4 mr-1" />
                <FormattedDate className="text-xs" date={appearsDate} />
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GuideCard;
