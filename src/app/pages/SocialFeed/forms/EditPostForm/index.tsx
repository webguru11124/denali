import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthenticatedUser } from 'app/api/auth/hooks';
import { useFileUploadMutation } from 'app/api/media/hooks';
import { types } from 'app/api/socialFeed';
import { newPostSchema } from 'app/form/validation';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import PostFormModal from '../PostFormModal';
import { FileWithMetadata } from '../types';
import { createFilesWithMetadata, attachMetaToLocalFiles } from '../utils';

import useUpdatePostMutation from './useUpdatePostMutation';
import { getInitialFormState } from './utils';

interface EditPostFormProps {
  post: types.Post;
  onClose: () => void;
}

const EditPostForm: FC<EditPostFormProps> = ({ post, onClose }) => {
  const { data: user } = useAuthenticatedUser();
  const { mutateAsync: uploadFile, isLoading: isFileUploading } =
    useFileUploadMutation();
  const { mutate: update, isLoading: isPostUpdating } = useUpdatePostMutation(
    post.id
  );
  const {
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: getInitialFormState(post),
    resolver: zodResolver(newPostSchema),
  });

  const { content, files, videos, images, filesToRemove } = watch();

  useEffect(() => {
    trigger();
  }, [content, trigger]);

  const setContent = (value: string) => setValue('content', value);

  const addFileToDelete = (id: string) =>
    setValue('filesToRemove', [...(filesToRemove || []), { id }]);

  const onImagesUpload = (imageUploads: Array<File>) => {
    setValue('images', [
      ...(images || []),
      ...createFilesWithMetadata(attachMetaToLocalFiles(imageUploads)),
    ]);
  };

  const onFilesUpload = (fileUploads: Array<File>) => {
    setValue('files', [
      ...(files || []),
      ...createFilesWithMetadata(attachMetaToLocalFiles(fileUploads)),
    ]);
  };

  const onVideosUpload = (videosToUpload: Array<File>) => {
    setValue('videos', [
      ...(videos || []),
      ...createFilesWithMetadata(attachMetaToLocalFiles(videosToUpload)),
    ]);
  };

  const onImageDelete = ({ id: idToDelete }: FileWithMetadata) => {
    setValue(
      'images',
      images.filter(({ id }) => idToDelete !== id)
    );
    addFileToDelete(idToDelete);
  };

  const onVideoDelete = ({ id: idToDelete }: FileWithMetadata) => {
    setValue(
      'videos',
      videos.filter(({ id }) => idToDelete !== id)
    );
    addFileToDelete(idToDelete);
  };

  const onFileDelete = ({ id: idToDelete }: FileWithMetadata) => {
    setValue(
      'files',
      files.filter(({ id }) => idToDelete !== id)
    );
    addFileToDelete(idToDelete);
  };

  if (!user) return null;

  return (
    <form
      onSubmit={handleSubmit(async ({ content: contentVal }) => {
        const filesToUpload = files?.filter(({ isUploaded }) => !isUploaded);
        const videosToUpload = videos?.filter(({ isUploaded }) => !isUploaded);
        const imagesToUpload = images?.filter(({ isUploaded }) => !isUploaded);

        const promises = [
          ...(filesToUpload || []),
          ...(videosToUpload || []),
          ...(imagesToUpload || []),
        ]
          .filter(({ isUploaded, file }) => !isUploaded && Boolean(file))
          .map(({ file, id }) =>
            uploadFile({ file, id } as { file: File; id: string })
          );

        const values = await Promise.all(promises);

        update(
          {
            filesToAdd: values.map(({ data }) => data),
            filesToRemove: filesToRemove || [],
            content: contentVal,
            languageId: user.contentLanguage.current.id,
          },
          {
            onSuccess: () => {
              onClose();
            },
          }
        );
      })}
    >
      <PostFormModal
        onClose={onClose}
        userName={user?.name}
        isSubmittable={!errors?.content}
        onContentChange={setContent}
        label="Edit post"
        contentValue={content}
        onImagesUpload={onImagesUpload}
        onVideosUpload={onVideosUpload}
        onFilesUpload={onFilesUpload}
        onImageDelete={onImageDelete}
        isSubmitting={isFileUploading || isPostUpdating}
        onVideoDelete={onVideoDelete}
        onFileDelete={onFileDelete}
        images={images || []}
        files={files || []}
        videos={videos || []}
      />
    </form>
  );
};

export default EditPostForm;
