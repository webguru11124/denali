import styled from '@emotion/styled';
import { zodResolver } from '@hookform/resolvers/zod';
import { PreUploadFile, FileUploadResponse } from 'app/api/media/types';
import { Container, Button } from 'app/components';
import { visualGuideFilesSchema } from 'app/form/validation';
import {
  useVMGuidesTranslation,
  useErrorTranslation,
} from 'app/internationalization/hooks';
import { routes } from 'app/router';
import { FC, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Trans } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import ArrowRightIcon from 'remixicon-react/ArrowRightSLineIcon';
import AddImageIcon from 'remixicon-react/ImageAddLineIcon';

import ActionButton from './ActionButton';
import Files from './Files';
import useUploadFilesMutation from './useUploadFilesMutation';
import { mapFile } from './utils';

interface PicturesFormProps {
  guideId: number;
}

const ButtonContainer = styled.div`
  width: 164px;
`;

const DEFAULT_VALUES = {
  files: [] as Array<PreUploadFile>,
};

const PicturesForm: FC<PicturesFormProps> = ({ guideId }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploadingFilesAmount, setUploadingFilesAmount] = useState(0);
  const [filesToUpload, setFilesToUpload] = useState<Array<FileUploadResponse>>(
    []
  );
  const { t } = useVMGuidesTranslation();
  const { t: tError } = useErrorTranslation();
  const { mutate: upload, isLoading: isUploading } =
    useUploadFilesMutation(guideId);
  const { watch, setValue } = useForm({
    resolver: zodResolver(visualGuideFilesSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const history = useHistory();
  const files = watch('files') || [];

  const onFileDelete = (fileId: string) => {
    setFilesToUpload((prevState) =>
      prevState.filter(({ id }) => fileId !== id)
    );

    setValue(
      'files',
      files.filter(({ id }) => fileId !== id)
    );
    // Reset input state to allow uploading the same file
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const onFileUploaded = (fileData: FileUploadResponse) => {
    setFilesToUpload((prevState) => [...prevState, fileData]);
    setUploadingFilesAmount((prev) => prev - 1);
  };

  const openFilePicker = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const isValid = (fileList: FileList) => {
    const validation = visualGuideFilesSchema.safeParse({
      files: Array.from(fileList).map(mapFile),
    });
    return !!validation.success;
  };

  const processFiles = (fileList: FileList) => {
    setUploadingFilesAmount((prev) => prev + fileList.length);
    setValue('files', [...files, ...Array.from(fileList).map(mapFile)]);
  };

  return (
    <div className="fixed bottom-0 z-50 flex justify-center">
      <Container>
        <input
          accept="image/*,video/*"
          type="file"
          className="hidden"
          multiple
          onChange={(e) => {
            const fileList = e.target.files;
            if (fileList) {
              if (isValid(fileList)) {
                processFiles(fileList);
              } else {
                toast.error(tError('File type not allowed.'));
              }
            }
          }}
          ref={inputRef}
        />

        <div className="bg-light py-6">
          <Files
            files={files}
            onFileDelete={onFileDelete}
            onFileUploaded={onFileUploaded}
          />

          <div className="shadow-atobi flex items-center py-4 pr-4 pl-6 rounded-lg w-full">
            <div className="flex w-full">
              <ButtonContainer>
                <Button variant="secondary" onClick={openFilePicker}>
                  <span className="flex items-center w-full justify-center">
                    <AddImageIcon className="w-6 h-6 text-grayscale-primary mr-2" />
                    <span className="text-sm">{t('Add media')}</span>
                  </span>
                </Button>
              </ButtonContainer>
              <ButtonContainer className="ml-auto">
                <ActionButton
                  label={t('Share media')}
                  Icon={ArrowRightIcon}
                  disabled={
                    isUploading ||
                    !filesToUpload.length ||
                    uploadingFilesAmount !== 0
                  }
                  onClick={() => {
                    upload(
                      {
                        files: filesToUpload,
                      },
                      {
                        onSuccess: () => {
                          toast.success(
                            <div>
                              <Trans
                                components={{
                                  bold: <span className="font-bold" />,
                                }}
                                i18nKey="vmguides.Congrats! Your Feedback is uploaded."
                              />
                            </div>
                          );
                          history.push(
                            routes.visualGuide.create(guideId, 'feedback')
                          );
                        },
                        onError: () => {
                          toast.error(
                            <div>
                              <Trans
                                components={{
                                  bold: <span className="font-bold" />,
                                }}
                                i18nKey="vmguides.There was an issue. Please try again."
                              />
                            </div>
                          );
                        },
                      }
                    );
                  }}
                />
              </ButtonContainer>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PicturesForm;
