import Switch from 'app/components/Switch';
import { useArticlesTranslation } from 'app/internationalization/hooks';
import logger from 'app/utils/logger';
import { InfoCircle } from 'iconsax-react';
import { ChangeEvent, useEffect, useState } from 'react';
import { z } from 'zod';

import useFileUpload from '../../../../hooks/useFileUpload';
import MAX_FILE_SIZE from '../../constants';

import TabIndicator from './TabIndicator';
import { SettingsState } from './types';
import UploadTab from './UploadTab';
import UrlTab from './UrlTab';

export interface AddedFile {
  data: File;
  type: 'added';
}
export interface UploadedFile {
  id: string;
  data: File;
  type: 'uploaded';
}

export interface UploadFileError {
  error: string;
  type: 'error';
}
interface Props {
  state: SettingsState;
  label: string;
  inputLabel: string;
  onChange: (data: string | AddedFile | UploadedFile | UploadFileError) => void;
  downloadable?: boolean;
  hasEnterUrlOption?: boolean;
}

type FileState = AddedFile | UploadedFile | undefined;
type UrlState = string | undefined;

const MediaBlockOptionSettings = ({
  state,
  label,
  onChange,
  inputLabel,
  downloadable,
  hasEnterUrlOption = true,
}: Props) => {
  const { upload, isLoading, isError: uploadError } = useFileUpload();
  const { t } = useArticlesTranslation();

  const urlValid = (url: string) => {
    let newUrl;
    try {
      newUrl = new URL(url);
    } catch (error) {
      return false;
    }

    return newUrl.protocol === 'http:' || newUrl.protocol === 'https:';
  };

  const urlSchema = z.optional(
    z.string().trim().refine(urlValid, { message: 'Invalid URL' })
  );

  const [file, setFile] = useState<FileState>();
  const [url, setUrl] = useState<UrlState>();
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');

  const selectedData: FileState | UrlState =
    activeTab === 'upload' ? file : url;

  useEffect(() => {
    if (
      typeof selectedData === 'string' ||
      selectedData?.type === 'uploaded' ||
      selectedData?.type === 'added'
    ) {
      onChange(selectedData);
    }
  }, [selectedData, onChange]);

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const firstFile = e?.target.files?.[0];
    if (!firstFile)
      return logger.debug('MediaPicker onFileChange file is null');

    if (firstFile.size > MAX_FILE_SIZE) {
      setFile(undefined);
      return onChange({
        type: 'error',
        error: t('Your file is too big. The limit is {{size}} MB', {
          size: 100,
        }),
      });
    }
    setFile({ type: 'added', data: firstFile });
  };

  useEffect(() => {
    if (!file || file.type !== 'added') return;
    upload(file.data, {
      onSuccess: (response) => {
        setFile({
          type: 'uploaded',
          data: file.data,
          id: response.id,
        });
      },
      onError: logger.error,
    });
  }, [file, upload]);

  return (
    <div className="flex flex-col items-start">
      <span className="text-lg text-grayscale-primary">{t('Settings')}</span>
      <span className="text-sm text-grayscale-secondary">{label}</span>

      <div className="flex justify-between w-full border-b border-b-hover-blue">
        <TabIndicator
          text="Upload"
          visible={activeTab === 'upload'}
          className="mr-8"
          onClick={setActiveTab.bind(null, 'upload')}
        />
        {hasEnterUrlOption && (
          <TabIndicator
            text="Enter URL"
            visible={activeTab === 'url'}
            onClick={setActiveTab.bind(null, 'url')}
          />
        )}
      </div>
      {activeTab === 'upload' && (
        <UploadTab
          state={
            uploadError
              ? { type: 'error' }
              : state?.id && state?.name && !state?.url
              ? { type: 'success', fileName: state?.name }
              : !state?.id && state?.name && state.url
              ? { type: 'untouched' }
              : { type: 'untouched', fileName: state?.name }
          }
          label={`Upload ${inputLabel}`}
          onChange={onFileChange}
          isLoading={isLoading}
        />
      )}

      {activeTab === 'url' && (
        <UrlTab
          url={url ? url : state?.url && !state?.id ? state.url : ''}
          type={`Enter URL of ${inputLabel}`}
          onEnterPress={setUrl}
          state={
            (url && !state?.id && !state?.name) ||
            (state?.url && !state?.id && !state?.name)
              ? urlSchema.safeParse(url || state?.url).success
                ? 'success'
                : 'error'
              : 'untouched'
          }
        />
      )}

      {(activeTab === 'upload' && uploadError) ||
        (activeTab === 'url' &&
          url &&
          !state?.id &&
          !state?.name &&
          !urlSchema.safeParse(url).success && (
            <div className="flex text-error mt-2">
              <InfoCircle />
              <span className="ml-1.5">Error Text</span>
            </div>
          ))}

      {downloadable && (
        <div className="flex items-center gap-2 mt-2">
          <span className="text-grayscale-secondary text-sm">
            {t('Allow downloading')}
          </span>
          <Switch checked={true} onChange={() => {}} />
        </div>
      )}
    </div>
  );
};

export default MediaBlockOptionSettings;
