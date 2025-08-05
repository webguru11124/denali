import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthenticatedUser } from 'app/api/auth/hooks';
import { useFileUploadMutation } from 'app/api/media/hooks';
import { Input } from 'app/components';
import { newPostSchema, imagesSchema, videosSchema } from 'app/form/validation';
import { useSocialFeedTranslation } from 'app/internationalization/hooks';
import { FC, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import FileIcon from 'remixicon-react/File2LineIcon';
import ImageIcon from 'remixicon-react/Image2LineIcon';
import YoutubeIcon from 'remixicon-react/YoutubeLineIcon';

import AddFileButton from '../AddFileButton';
import PostFormModal from '../PostFormModal';
import { FileWithMetadata } from '../types';
import { createFilesWithMetadata, attachMetaToLocalFiles } from '../utils';

import useSocialPostMutation from './useSocialPostMutation';

interface AvatarProps {
  src: string;
  alt: string;
}

const DEFAULT_VALUES = {
  videos: [] as Array<FileWithMetadata>,
  images: [] as Array<FileWithMetadata>,
  files: [] as Array<FileWithMetadata>,
  content: '',
};

const Avatar: FC<AvatarProps> = ({ src, alt }) => (
  <img className="w-12 h-12 rounded-lg" src={src} alt={alt} />
);

const NewPostForm: FC = () => {
  const { data: user } = useAuthenticatedUser();
  const { t } = useSocialFeedTranslation();
  const { mutate: submitPost, isLoading } = useSocialPostMutation();
  const { mutateAsync: uploadFile, isLoading: isFileUploading } =
    useFileUploadMutation();
  const [shouldDisplayModal, setShouldDisplayModal] = useState(false);

  const {
    watch,
    setValue,
    handleSubmit,
    trigger,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(newPostSchema),
  });

  const [contentVal, videos, images, files] = watch([
    'content',
    'videos',
    'images',
    'files',
  ]);

  useEffect(() => {
    // Trigger validation to display form state live
    trigger();
  }, [contentVal, trigger]);

  const isImagesValid = (uploadedImages: Array<File>) => {
    const validation = imagesSchema.safeParse(Array.from(uploadedImages));
    return !!validation.success;
  };

  const isVideosValid = (uploadedVideos: Array<File>) => {
    const validation = videosSchema.safeParse(Array.from(uploadedVideos));
    return !!validation.success;
  };

  const onVideosUpload = (videoUploads: Array<File>) => {
    if (isVideosValid(videoUploads)) {
      setValue('videos', [
        ...(videos || []),
        ...createFilesWithMetadata(attachMetaToLocalFiles(videoUploads)),
      ]);
    } else {
      toast.error(t('File type not allowed.'));
    }
  };

  const onImagesUpload = (imageUploads: Array<File>) => {
    if (isImagesValid(imageUploads)) {
      setValue('images', [
        ...(images || []),
        ...createFilesWithMetadata(attachMetaToLocalFiles(imageUploads)),
      ]);
    } else {
      toast.error(t('File type not allowed.'));
    }
  };

  const onFilesUpload = (fileUploads: Array<File>) => {
    setValue('files', [
      ...(files || []),
      ...createFilesWithMetadata(attachMetaToLocalFiles(fileUploads)),
    ]);
  };

  const onImageDelete = ({ id: idToDelete }: FileWithMetadata) => {
    setValue(
      'images',
      images.filter(({ id }) => idToDelete !== id)
    );
  };

  const onVideoDelete = ({ id: idToDelete }: FileWithMetadata) => {
    setValue(
      'videos',
      videos.filter(({ id }) => idToDelete !== id)
    );
  };

  const onFileDelete = ({ id: idToDelete }: FileWithMetadata) => {
    setValue(
      'files',
      files.filter(({ id }) => idToDelete !== id)
    );
  };

  if (!user) return null;
  return (
    <div className="shadow-atobi rounded-lg py-6 px-6">
      <form
        onSubmit={handleSubmit(async ({ content }) => {
          const promises = [
            ...(files || []),
            ...(videos || []),
            ...(images || []),
          ]
            .filter(({ isUploaded, file }) => !isUploaded && Boolean(file))
            .map(({ file, id }) =>
              uploadFile({ file, id } as { file: File; id: string })
            );
          // Submit all new assets
          const values = await Promise.all(promises);

          submitPost(
            {
              filesToAdd: values.map(({ data }) => data),
              content,
              languageId: user.contentLanguage.current.id,
            },
            {
              onSuccess: () => {
                reset();
                setShouldDisplayModal(false);
              },
            }
          );
        })}
      >
        {shouldDisplayModal && (
          <PostFormModal
            onContentChange={(val: string) => setValue('content', val)}
            userName={user.firstName}
            label={t('Create Post')}
            contentValue={contentVal}
            onImagesUpload={onImagesUpload}
            onVideosUpload={onVideosUpload}
            onFilesUpload={onFilesUpload}
            onImageDelete={onImageDelete}
            isSubmitting={isLoading || isFileUploading}
            onVideoDelete={onVideoDelete}
            onFileDelete={onFileDelete}
            onClose={() => setShouldDisplayModal(false)}
            isSubmittable={!errors?.content}
            images={images || []}
            files={files || []}
            videos={videos || []}
          />
        )}
        <div className="flex items-center border-b border-gray-light pb-4">
          <Avatar src={user.avatars.small} alt={user.name} />
          <Input
            className="w-full ml-3"
            name="content"
            onFocus={() => setShouldDisplayModal(true)}
            placeholder={`${t('What’s on your mind, {{name}}?', {
              name: user.firstName,
            })}`}
          />
        </div>
        <div className="flex items-center mt-4">
          <AddFileButton
            Icon={ImageIcon}
            label={t('Share an image')}
            className="text-success"
            acceptTypes="image/*"
            onFileUpload={(uploads) => {
              onImagesUpload(uploads);
              if (uploads.length) setShouldDisplayModal(true);
            }}
          />
          <AddFileButton
            Icon={YoutubeIcon}
            label={t('Share a video')}
            acceptTypes="video/*"
            className="text-orange"
            onFileUpload={(uploads) => {
              onVideosUpload(uploads);
              if (uploads.length) setShouldDisplayModal(true);
            }}
          />
          <AddFileButton
            Icon={FileIcon}
            label={t('Share a file')}
            className="text-focus"
            onFileUpload={(uploads) => {
              onFilesUpload(uploads);
              if (uploads.length) setShouldDisplayModal(true);
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default NewPostForm;
