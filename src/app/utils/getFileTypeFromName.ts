import { FileType } from './types';

const getFileTypeFromName = (name: string): FileType => {
  const extension = name.split('.').pop();

  if (!extension) return 'other';

  if (extension === 'pdf') return 'pdf';
  if (extension === 'image') return 'image';
  if (extension === 'excel') return 'excel';
  if (extension === 'xlsx' || extension === 'xls') return 'excel';
  if (extension === 'doc' || extension === 'docx') return 'word';
  if (extension === 'ppt' || extension === 'pptx') return 'powerpoint';
  if (extension === 'txt') return 'text';
  return 'other';
};

export default getFileTypeFromName;
