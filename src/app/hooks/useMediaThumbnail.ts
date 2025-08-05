import { FileType } from 'app/api/types';
import { generateVideoThumbnail } from 'app/utils';
import { useQuery } from 'react-query';

type ThumbnailFileType = FileType.image | FileType.video;

const generateImageThumbnail = (url: string) => Promise.resolve(url);

interface ThumbnailState {
  isGenerating: boolean;
  hasError: boolean;
  url: string | undefined;
}

const getResolver = (type: ThumbnailFileType) => {
  switch (type) {
    case FileType.image:
      return generateImageThumbnail;
    case FileType.video:
      return generateVideoThumbnail;
    default:
      throw new Error(`Cannot generate thumbnail from type: "${type}"`);
  }
};

const useThumbnailGenerator = (
  resolver: (url: string) => Promise<string>,
  url: string
): ThumbnailState => {
  const {
    data,
    isError,
    isLoading: isGenerating,
  } = useQuery(['thumbnail', url], () => resolver(url), {
    enabled: !!url,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  return { isGenerating, hasError: isError, url: data };
};

const useMediaThumbnail = (
  url: string,
  type: ThumbnailFileType
): ThumbnailState => {
  const thumbnailResolver = getResolver(type);
  return useThumbnailGenerator(thumbnailResolver, url);
};

export default useMediaThumbnail;
