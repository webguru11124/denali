import { Post } from 'app/api/socialFeed/types';
import { ApiFile } from 'app/api/types';

import {
  UpdatePostFormState,
  FileWithMetadata,
  FileToDelete,
} from '../../types';

type MapFile = (file: ApiFile) => FileWithMetadata;

const mapFile: MapFile = ({ url, id }) => ({
  src: url,
  id: id.toString(),
  isUploaded: true,
});

const getInitialFormState = (post: Post): UpdatePostFormState => {
  const postImages = post.files
    .filter(({ type }) => type.includes('image'))
    .map(mapFile);

  const postVideos = post.files
    .filter(({ type }) => type.includes('video'))
    .map(mapFile);

  const postFiles = post.files
    .filter(({ type }) => !type.includes('video') && !type.includes('image'))
    .map(mapFile);

  const filesToRemove: Array<FileToDelete> = [];

  return {
    content: post.text,
    images: postImages,
    videos: postVideos,
    files: postFiles,
    filesToRemove,
  };
};

export default getInitialFormState;
