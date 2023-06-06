import getUniqueId from './getUniqueId';

// Use to create "File" object with metadata for sorting/removing and uploading before submitting full form
const createFileWithMetadata = (file: File) => ({
  id: getUniqueId(),
  isUploaded: false,
  file,
});

export default createFileWithMetadata;
