import styled from '@emotion/styled';
import { FileType } from 'app/api/types';
import { UserFile } from 'app/api/visualGuides/types';
import { UncontrolledVideoPlayer } from 'app/components';
import { FC } from 'react';

interface UserFilesListProps {
  files: Array<UserFile>;
}

const Container = styled.div`
  height: 460px;
`;

const UserFilesList: FC<UserFilesListProps> = ({ files }) => (
  <div className="flex flex-col">
    {files.map(({ url, name, type, id }) => {
      switch (type) {
        case FileType.image:
          return (
            <Container key={id} className="mb-6">
              <img
                src={url}
                alt={name}
                className="w-full h-full object-cover rounded-lg"
              />
            </Container>
          );
        default:
          return (
            <Container key={id} className="mb-6 rounded-lg overflow-hidden">
              <UncontrolledVideoPlayer url={url} />
            </Container>
          );
      }
    })}
  </div>
);

export default UserFilesList;
