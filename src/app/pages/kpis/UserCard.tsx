import { css, cx } from '@emotion/css';
import styled from '@emotion/styled';
import { ResponsiveMediaSizes } from 'app/api/types';
import { routes } from 'app/router';
import { createSrcSet } from 'app/utils';
import { memo } from 'react';
import { Link } from 'react-router-dom';

interface UserCardProps {
  avatars: ResponsiveMediaSizes;
  id: number;
  fullName: string;
  total: number;
  position?: number;
  isMe?: boolean;
}

const ImageContainer = styled.div`
  height: 190px;
`;

const defaultContainerClassName = css`
  box-shadow: 0px 0px 12px rgba(46, 49, 146, 0.4);
`;

const authenticatedContainerClassName = css`
  box-shadow: 0px 0px 12px rgba(211, 121, 68, 0.4);
  border: 1px solid rgba(211, 121, 68, 0.54);
`;

const UserCard = ({
  fullName,
  avatars,
  total,
  position,
  id,
  isMe,
}: UserCardProps) => (
  <Link className="w-full h-full" to={routes.user.create(id)}>
    <div
      className={cx(
        'mb-2 rounded-lg py-3 px-2',
        isMe ? authenticatedContainerClassName : defaultContainerClassName
      )}
    >
      <div className="shadow-atobi pb-1 rounded-lg">
        <ImageContainer className="relative">
          <img
            className="w-full h-full object-cover rounded-t-lg"
            srcSet={createSrcSet(avatars)}
            alt={fullName}
          />
          {position !== undefined && (
            <div className="absolute p-2 rounded-lg text-xs flex items-center justify-center top-0 right-0 mt-1 mr-1 bg-white text-focus">
              #{position}
            </div>
          )}
        </ImageContainer>
        <div className="text-center line-clamp-1">
          <span className="line-clamp-1">{fullName}</span>
        </div>

        <div className="text-center font-bold mt-1">
          <span className="line-clamp-1">{total}</span>
        </div>
      </div>
    </div>
  </Link>
);

export default memo(UserCard);
