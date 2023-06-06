import { cx } from '@emotion/css';
import styled from '@emotion/styled';
import { Alert, FilePicker, Container } from 'app/components';
import { types } from 'app/utils';
import { ReactNode } from 'react';
import CameraIcon from 'remixicon-react/CameraLineIcon';

interface ProfileLayoutProps {
  imageSource: types.SelectedImageSource;
  className?: string;
  onProfileImageChange?: (image: File) => void;
  imageError?: string;
  children: ReactNode;
}

const ProfileImage = styled.img`
  width: 147px;
  height: 147px;
`;

const ProfileLayout = ({
  imageSource,
  children,
  className,
  onProfileImageChange,
  imageError,
}: ProfileLayoutProps) => (
  <div className="flex justify-center pt-12">
    <Container
      className={cx(
        'shadow-atobi rounded-lg p-21 relative mt-21 mb-12',
        className
      )}
    >
      <div className="absolute top-0 transform -translate-y-2/3">
        <div className="p-1 rounded-xl relative shadow-atobi border-white">
          {onProfileImageChange && (
            <FilePicker
              accept="image"
              onChange={onProfileImageChange}
              className="absolute bg-grayscale-secondary opacity-80 hover:opacity-90 text-white inset-1/2 h-12 w-12 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2  p-2 rounded-full"
            >
              <span>
                <CameraIcon />
              </span>
            </FilePicker>
          )}

          {imageSource && (
            <ProfileImage
              {...imageSource}
              alt="Profile"
              className="rounded-xl"
            />
          )}
        </div>
        {imageError && <Alert variant="error">{imageError}</Alert>}
      </div>
      {children}
    </Container>
  </div>
);
export default ProfileLayout;
