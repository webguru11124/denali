const attachMetaToLocalFiles = (files: Array<File>) =>
  files.map((file) => ({
    file,
    src: URL.createObjectURL(file),
    isUploaded: false,
  }));

export default attachMetaToLocalFiles;
