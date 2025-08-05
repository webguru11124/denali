import { FileWithMetadata } from '../types';

type ExtractedFile = File | undefined;

type ExtractFiles = (files: Array<FileWithMetadata>) => Array<ExtractedFile>;

const extractFiles: ExtractFiles = (files) => files.map(({ file }) => file);

export default extractFiles;
