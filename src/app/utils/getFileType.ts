import { FileType } from './types';

interface File {
  type: string;
  name: string;
}

const getFileType = (file: File): FileType => {
  if (file.type.includes('pdf')) return 'pdf';
  if (file.type.includes('image')) return 'image';
  if (file.type.includes('excel')) return 'excel';
  if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) return 'excel';
  if (file.name.endsWith('.doc') || file.name.endsWith('.docx')) return 'word';
  if (file.name.endsWith('.ppt') || file.name.endsWith('.pptx'))
    return 'powerpoint';
  if (file.name.endsWith('.txt')) return 'text';

  return 'other';
};

export default getFileType;
