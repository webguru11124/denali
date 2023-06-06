import { hooks, types } from 'app/api/auth';
import { PageLoader, CategorySelect } from 'app/components';
import { updateProfilePictureSchema } from 'app/form/validation';
import { useProfileTranslation } from 'app/internationalization/hooks';
import { ProfileLayout } from 'app/layouts';
import { routes, constants } from 'app/router';
import { selectDefinedImageSource } from 'app/utils';
import { useState, FC } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ZodError } from 'zod';

import PasswordEdit from './PasswordEdit';
import ProfileEdit from './ProfileEdit';
import ProfilePublic from './ProfilePublic';
import useProfilePictureMutation from './useProfilePictureMutation';

const { useAuthenticatedUser } = hooks;

type Category =
  (typeof constants.profilePageTypes)[keyof typeof constants.profilePageTypes];

const Profile: FC = () => {
  const { t } = useProfileTranslation();
  const [image, setImage] = useState<File | null>(null);
  const [imageError, setImageError] = useState<string | undefined>();
  const { data: user } = useAuthenticatedUser();
  const history = useHistory();
  const { category } = useParams<{ category: Category }>();
  const { upload, isError, isLoading } = useProfilePictureMutation();

  if (!user) {
    return <PageLoader />;
  }

  const EDITING_CATEGORIES = [
    {
      value: constants.profilePageTypes.edit,
      label: t('Edit Profile'),
    },
    {
      value: constants.profilePageTypes.editPassword,
      label: t('Change Password'),
    },
  ];

  const onProfileImageChange = (file: File) => {
    try {
      updateProfilePictureSchema.parse({ image: file });
      setImage(file);
      setImageError(undefined);
    } catch (err: any) {
      if (err instanceof ZodError) {
        setImageError(err.issues[0].message);
      } else if (err instanceof Error) {
        setImageError(err.message);
      }
    }
  };

  return (
    <ProfileLayout
      onProfileImageChange={
        category === constants.profilePageTypes.edit
          ? onProfileImageChange
          : undefined
      }
      imageSource={
        image
          ? { src: URL.createObjectURL(image) }
          : selectDefinedImageSource({
              srcSet: user.avatars,
            })
      }
      className="mb-21"
      imageError={
        isError ? `${t('Upload failed, please try again')}` : imageError
      }
    >
      {category && (
        <CategorySelect
          selectedCategory={category}
          onChange={(val) => history.replace(routes.profile.create(val))}
          categories={EDITING_CATEGORIES}
        />
      )}
      {(() => {
        switch (category) {
          case constants.profilePageTypes.edit:
            return (
              <ProfileEdit
                onSubmit={() => {
                  if (image) {
                    const formData = new FormData();
                    formData.append('image', image);
                    upload(formData as types.ProfilePictureUpdateData);
                  }
                }}
                isLoading={isLoading}
              />
            );
          case constants.profilePageTypes.editPassword:
            return <PasswordEdit />;
          default:
            return <ProfilePublic />;
        }
      })()}
    </ProfileLayout>
  );
};

export default Profile;
