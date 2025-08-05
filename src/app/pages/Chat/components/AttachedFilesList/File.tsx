import { cx } from '@emotion/css';
import styled from '@emotion/styled';
import { FileIcon } from 'app/components';
import { getFileType, types } from 'app/utils';
import { FC } from 'react';

interface FileProps {
  file: File;
}

const Container = styled.div`
  .file_icon {
    color: white !important;
  }
`;

const getClassName = (type: types.FileType) => {
  switch (type) {
    case 'excel':
      return 'bg-greenExcel';
    case 'powerpoint':
    case 'pdf':
      return 'bg-error';
    case 'word':
    default:
      return 'bg-focus';
  }
};

const File: FC<FileProps> = ({ file }) => {
  const fileType = getFileType(file);
  return (
    <Container
      className={cx(
        'w-full h-12 max-h-12 overflow-hidden rounded',
        getClassName(fileType)
      )}
    >
      <div className="flex items-center h-full justify-center">
        <FileIcon type={fileType} />
      </div>
    </Container>
  );
};

export default File;
