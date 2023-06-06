import styled from '@emotion/styled';
import { FC } from 'react';

interface FileOverlayProps {
  leftoverFilesAmount: number;
}

const Container = styled.div`
  background-color: rgba(34, 34, 34, 0.6);
`;

const FileOverlay: FC<FileOverlayProps> = ({ leftoverFilesAmount }) => (
  <Container className="absolute w-full rounded-xs rounded-br-xl h-full top-0 left-0 text-center justify-center flex items-center">
    <p className="text-white text-xl">+{leftoverFilesAmount}</p>
  </Container>
);

export default FileOverlay;
