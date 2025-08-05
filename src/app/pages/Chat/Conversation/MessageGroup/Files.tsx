import { cx } from '@emotion/css';
import styled from '@emotion/styled';
import { MessageFile } from 'app/api/chat/types';
import { isDefined } from 'app/utils';
import { FC, useMemo, useState } from 'react';

import { ChatFileButton } from '../../components';
import { groupChatFiles, createAssetUrl } from '../../utils';

import MediaFiles from './MediaFiles';
import MediaModal from './MediaModal';
import UploadedAt from './UploadedAt';

interface FilesProps {
  files: Array<MessageFile>;
  uploadedAt: string;
  isMe: boolean;
}

const FileContainer = styled.div`
  min-width: 256px;
`;

const Files: FC<FilesProps> = ({ files, uploadedAt, isMe }) => {
  const [fileToDisplayIndex, setFileToDisplayIndex] = useState<
    number | undefined
  >();

  const { media, files: nonMediaFiles } = useMemo(
    () => groupChatFiles(files),
    [files]
  );

  if (isDefined(fileToDisplayIndex) && !media[fileToDisplayIndex]) {
    throw new Error('[Files]: selected file does not exist');
  }

  return (
    <div>
      {isDefined(fileToDisplayIndex) && (
        <MediaModal
          totalFiles={media.length}
          onNext={() => {
            setFileToDisplayIndex((prev) => {
              if (!isDefined(prev)) return undefined;

              if (prev < media.length - 1) {
                return prev + 1;
              }

              return 0;
            });
          }}
          onPrev={() => {
            setFileToDisplayIndex((prev) => {
              if (!isDefined(prev)) return undefined;

              if (prev !== 0) {
                return prev - 1;
              }

              return media.length - 1;
            });
          }}
          currentFile={fileToDisplayIndex + 1}
          file={media[fileToDisplayIndex]}
          onClose={() => setFileToDisplayIndex(undefined)}
        />
      )}
      {/* Counting on coercion to display files list will display 0 if list is empty */}
      {media.length > 0 && (
        <MediaFiles
          isMe={isMe}
          onFileClick={(index: number) => setFileToDisplayIndex(index)}
          uploadedAtText={uploadedAt}
          files={media}
        />
      )}
      {nonMediaFiles.length > 0 && (
        <FileContainer className="pb-6 relative mt-1">
          {nonMediaFiles.map(({ id, name, mimeType, relativeUrl }) => (
            <div key={id}>
              <ChatFileButton
                name={name}
                type={mimeType}
                className={cx('ml-auto w-full mt-2 rounded-xs', {
                  'rounded-l-xl rounded-tr-xl': isMe,
                  'rounded-r-xl rounded-tl-xl': !isMe,
                })}
                url={createAssetUrl(relativeUrl)}
              />
            </div>
          ))}
          <UploadedAt
            className="text-grayscale-secondary"
            uploadedAt={uploadedAt}
          />
        </FileContainer>
      )}
    </div>
  );
};

export default Files;
