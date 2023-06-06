import { nanoid } from 'nanoid';

const mapFile = (file: File) => ({
  file,
  id: nanoid(),
});

export default mapFile;
