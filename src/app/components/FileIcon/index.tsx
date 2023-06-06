import { cx } from '@emotion/css';
import React from 'react';
import FilePlaceholderIcon from 'remixicon-react/File2LineIcon';
import ExcelIcon from 'remixicon-react/FileExcel2LineIcon';
import ImageIcon from 'remixicon-react/FileGifLineIcon';
import PdfIcon from 'remixicon-react/FilePdfLineIcon';
import PowerPointIcon from 'remixicon-react/FilePpt2LineIcon';
import WordIcon from 'remixicon-react/FileWord2LineIcon';

type FileType =
  | 'pdf'
  | 'image'
  | 'excel'
  | 'word'
  | 'powerpoint'
  | 'text'
  | 'other';

interface FileIconProps {
  type: FileType;
}

const FileIcon: React.FC<FileIconProps> = ({ type }) => {
  const baseClassName = 'file_icon w-6 h-6';
  switch (type) {
    case 'pdf':
      return <PdfIcon className={cx(baseClassName, 'text-error')} />;
    case 'excel':
      return <ExcelIcon className={cx(baseClassName, 'text-greenExcel')} />;
    case 'word':
      return <WordIcon className={cx(baseClassName, 'text-focus')} />;
    case 'image':
      return <ImageIcon className={cx(baseClassName, 'text-focus')} />;
    case 'powerpoint':
      return <PowerPointIcon className={cx(baseClassName, 'text-error')} />;
    default:
      return (
        <FilePlaceholderIcon className={cx(baseClassName, 'text-focus')} />
      );
  }
};

export default FileIcon;
