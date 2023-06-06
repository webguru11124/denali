import { useNode } from '@craftjs/core';
import { request } from 'app/api/articles/request';
import { PageLoader } from 'app/components';
import config from 'app/config';
import useFileUpload from 'app/hooks/useFileUpload';
import { editorTypes } from 'app/router/constants';
import { selectors } from 'app/store/editor';
import { logger } from 'app/utils';
import { ExportSquare, ArrowCircleDown2, DocumentText1 } from 'iconsax-react';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Document, Page, pdfjs } from 'react-pdf';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  ExternalFile,
  GetFile200Response,
  InternalFileGet,
} from 'submodules/common-ui/generated/api/gcs/api';

import MAX_FILE_SIZE from '../../constants';
import BaseBlockContainer from '../BaseBlockContainer';
import MediaBlockError from '../MediaBlockError';
import MediaBlockLoading from '../MediaBlockLoading';
import MediaBlockPlaceholder from '../MediaBlockPlaceholder';
import MediaBlockOptionSettings, {
  UploadedFile,
  AddedFile,
} from '../MediaBlockSettings/MediaBlockOptionSettings';
import { SettingsState } from '../MediaBlockSettings/types';

interface PDFBlockProps {
  pdfSchema?: InternalFileGet | ExternalFile;
  file?: File;
  error?: string;
}

const PDFBlock = ({ pdfSchema, file, error }: PDFBlockProps) => {
  const { mode } = useParams<{ mode: string }>();
  const [fileSrc, setFileSrc] = useState<string | null>(null);
  const [numPages, setNumPages] = useState(1);
  const [originalFileSrc, setOriginalFileSrc] = useState<string | null>(null);

  const canEdit = useSelector(selectors.getCanEdit);

  const { upload } = useFileUpload();
  const { t } = useTranslation();

  const pdfRef = useRef<HTMLDivElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  const {
    connectors: { connect },
    actions: { setProp },
    selected,
    nodeId,
  } = useNode((node) => ({
    selected: node?.events?.selected,
    nodeId: node.id,
  }));

  const fileId = pdfSchema?.type === 'internal' ? pdfSchema.id : '';

  useEffect(() => {
    if (originalFileSrc && !fileSrc) {
      const fetchData = async () => {
        const res = await request().get<GetFile200Response>(
          `${originalFileSrc}?response=url`
        );
        if (res?.data?.url) {
          setFileSrc(res?.data?.url);
        }
      };
      fetchData();
    }
  }, [fileSrc, originalFileSrc]);

  const triggerInputClick = () => {
    if (!pdfInputRef.current || !enabled) return;

    pdfInputRef.current.click();
  };

  useEffect(() => {
    if (file) {
      const src = URL.createObjectURL(file);
      setFileSrc(src);
      return () => URL.revokeObjectURL(src);
    }
  }, [file]);

  useEffect(() => {
    if (pdfSchema?.url && !file) {
      setOriginalFileSrc(pdfSchema.url);
    }
  }, [pdfSchema, file]);

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  }, []);

  const onPDFChange = (e: ChangeEvent<HTMLInputElement>) => {
    const pdf = e?.target.files?.[0];
    if (!pdf) return logger.debug('MediaPicker onFileChange file is null');

    if (pdf.size > MAX_FILE_SIZE) {
      setProp((props: PDFBlockProps) => {
        props.file = undefined;
        props.pdfSchema = undefined;
        props.error = `${t('Your file is too big. The limit is {{size}} MB', {
          size: 100,
        })}`;
      });
      return;
    }

    uploadPDF(pdf);
  };

  const uploadPDF = (pdf: File) => {
    upload(pdf, {
      onSuccess: (response) => {
        setProp((props: PDFBlockProps) => {
          props.error = '';
          props.file = pdf;
          props.pdfSchema = {
            type: 'internal',
            id: response.id,
            url: '',
            name: pdf.name,
            translationStatus: 'draft',
          } as InternalFileGet;
        });
      },
      onError: logger.error,
    });
  };

  const enabled =
    canEdit && mode !== editorTypes.view && mode !== editorTypes.review;

  return (
    <div ref={(ref) => ref && connect(ref)} className="mx-2">
      <BaseBlockContainer selected={selected} nodeId={nodeId} type={'PDF'}>
        <div ref={pdfRef}>
          {error && (
            <MediaBlockError
              error={error}
              onDoubleClick={triggerInputClick}
              fileId={fileId}
            />
          )}
          {!fileSrc && originalFileSrc && <PageLoader />}
          {!fileSrc && !originalFileSrc && (
            <MediaBlockPlaceholder
              type={t('PDF file')}
              TypeIcon={DocumentText1}
              onChange={onPDFChange}
            />
          )}

          {fileSrc && (
            <div role="presentation" onDoubleClick={() => triggerInputClick()}>
              <Document
                file={fileSrc}
                loading={<MediaBlockLoading />}
                error={<MediaBlockError />}
                className="h-[400px] overflow-y-scroll scroll-hidden p-4 bg-cream rounded-l z-0"
                onLoadSuccess={({ numPages: pages }) => setNumPages(pages)}
                onLoadError={(err) => logger.error(err.message)}
              >
                {[...Array(numPages)].map((_, i) => (
                  <Page
                    pageNumber={i + 1}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    width={
                      pdfRef.current?.offsetWidth
                        ? pdfRef.current.offsetWidth - 36
                        : 0
                    }
                  />
                ))}

                <span className="absolute top-1 left-1 shadow-atobi rounded-2xl py-2 px-4 bg-white flex flex-row gap-4">
                  <a href={fileSrc} target="_blank" rel="noreferrer">
                    <ExportSquare
                      size={30}
                      color={config.colors['grayscale-secondary']}
                    />
                  </a>
                  <a href={fileSrc} download>
                    <ArrowCircleDown2
                      size={30}
                      color={config.colors['grayscale-secondary']}
                    />
                  </a>
                </span>
              </Document>
            </div>
          )}
          <input
            type="file"
            ref={pdfInputRef}
            className="hidden"
            onChange={onPDFChange}
            disabled={!enabled}
          />
        </div>
      </BaseBlockContainer>
    </div>
  );
};

const ImageSettings = () => {
  const {
    selectedProps,
    actions: { setProp },
  } = useNode((node) => {
    return {
      selectedProps: node.data.props,
    };
  });

  const { t } = useTranslation();

  const state: SettingsState = {
    id: selectedProps?.pdfSchema?.id,
    url: selectedProps?.pdfSchema?.url,
    name: selectedProps?.pdfSchema?.name,
  };

  const getPropPayload = (
    data: string | UploadedFile | AddedFile
  ): { file: File | undefined; pdfSchema: InternalFileGet | ExternalFile } => {
    if (typeof data === 'string') {
      return {
        file: undefined,
        pdfSchema: {
          type: 'external',
          name: '',
          url: data,
          translationStatus: 'draft',
        },
      };
    }

    if (data.type === 'uploaded') {
      return {
        file: data.data,
        pdfSchema: {
          type: 'internal',
          id: data.id,
          url: '',
          name: data.data.name,
          translationStatus: 'draft',
        } as InternalFileGet,
      };
    }

    return {
      file: data.data,
      pdfSchema: {
        type: 'internal',
        id: '',
        url: '',
        name: data.data.name,
        translationStatus: 'draft',
      } as InternalFileGet,
    };
  };

  return (
    <MediaBlockOptionSettings
      state={state}
      label={t('Attachment settings.')}
      inputLabel={t('PDF file')}
      hasEnterUrlOption={false}
      onChange={(data) => {
        setProp((props: PDFBlockProps) => {
          if (typeof data !== 'string' && data.type === 'error') {
            props.file = undefined;
            props.pdfSchema = undefined;
            props.error = data.error;
            return;
          } else {
            props.error = '';
          }
          const { file, pdfSchema } = getPropPayload(data);
          props.file = file;
          props.pdfSchema = pdfSchema;
          return;
        });
      }}
    />
  );
};

PDFBlock.craft = {
  related: {
    settings: ImageSettings,
  },
};

export { PDFBlock };
export default PDFBlock;
