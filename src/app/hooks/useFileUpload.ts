import { resources } from 'app/api/articles';
import axios from 'axios';
import { useCallback } from 'react';
import { useMutation } from 'react-query';
import {
  CreatedFileSlot,
  FileSlot,
} from 'submodules/common-ui/generated/api/gcs';

export interface UploadConfig {
  onSuccess: (data: CreatedFileSlot) => void;
  onError: () => void;
}

interface FileUploadRequest {
  url: string;
  file: File;
  headers: object;
}

const useFileUpload = () => {
  const {
    mutate: uploadBaseData,
    isLoading: isBaseDataLoading,
    isError: isBaseDataError,
  } = useMutation((data: FileSlot) =>
    resources.createFileSlot({
      mimeType: data.mimeType,
      name: data.name,
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

  const upload = useCallback(
    (file: File, { onSuccess, onError }: UploadConfig) => {
      uploadBaseData(
        {
          name: file.name,
          mimeType: file.type,
        },
        {
          onSuccess: (response) => {
            uploadFile(
              {
                url: response.url,
                file,
                headers: response.headers,
              },
              { onSuccess: () => onSuccess(response), onError }
            );
          },
        }
      );
    },
    [uploadBaseData, uploadFile]
  );

  return {
    upload,
    isLoading: isBaseDataLoading || isFileUploading,
    isError: isBaseDataError || isFileError,
  };
};

export default useFileUpload;
