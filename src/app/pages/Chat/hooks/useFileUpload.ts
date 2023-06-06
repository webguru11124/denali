import { resources } from 'app/api/chat';
import { useSelector } from 'app/hooks';
import { selectors } from 'app/store/auth';
import { selectors as chatSelectors } from 'app/store/chat';
import axios from 'axios';
import { useMutation } from 'react-query';

import useThreadId from './useThreadId';

interface FileUploadRequest {
  url: string;
  file: File;
  headers: { [key: string]: string };
}

interface UploadConfig {
  onSuccess: (uploadedId: string) => void;
  onError: () => void;
}

const useFileUpload = () => {
  const threadId = useThreadId();
  const authToken = useSelector(selectors.getToken);
  const cachedChatToken = useSelector(chatSelectors.getChatToken);
  if (!cachedChatToken)
    throw new Error('[useFileUPload]: no chat token present');
  if (!authToken) throw new Error('[useFileUpload]: no auth token present');

  const {
    mutate: uploadBaseData,
    isLoading: isBaseDataLoading,
    isError: isBaseDataError,
  } = useMutation(
    (data: { name: string; threadId: string; mimeType: string }) =>
      resources.uploadFile({
        ...data,
        authToken,
        chatToken: cachedChatToken,
      })
  );

  const {
    mutate: uploadFile,
    isLoading: isFileUploading,
    isError: isFileError,
  } = useMutation(async ({ url, file, headers }: FileUploadRequest) =>
    axios.put(url, file, {
      headers: {
        ...headers,
        'Content-Type': file.type,
      },
    })
  );

  return {
    upload: (file: File, { onSuccess, onError }: UploadConfig) => {
      uploadBaseData(
        {
          name: file.name,
          threadId,
          mimeType: file.type,
        },
        {
          onSuccess: (response) => {
            uploadFile(
              {
                url: response.data.url,
                file,
                headers: response.data.headers,
              },
              { onSuccess: () => onSuccess(response.data.id), onError }
            );
          },
        }
      );
    },
    isLoading: isBaseDataLoading || isFileUploading,
    isError: isBaseDataError || isFileError,
  };
};

export default useFileUpload;
