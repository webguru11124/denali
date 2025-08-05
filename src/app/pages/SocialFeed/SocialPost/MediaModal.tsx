import { ApiFile } from 'app/api/types';
import { MediaModal as MediaModalComponent } from 'app/components';
import { FC, useState } from 'react';

interface MediaModalProps {
  onClose: () => void;
  initialCurrentFile: number;
  files: Array<ApiFile>;
}

const MediaModal: FC<MediaModalProps> = ({
  initialCurrentFile,
  files,
  onClose,
}) => {
  const [selectedItem, setSelectedItem] = useState(initialCurrentFile);

  const onPrev = () => {
    setSelectedItem((prev) => {
      if (prev === 0) {
        return files.length - 1;
      }

      return prev - 1;
    });
  };

  const onNext = () =>
    setSelectedItem((prev) => {
      if (prev === files.length - 1) {
        return 0;
      }

      return prev + 1;
    });
  return (
    <MediaModalComponent
      onClose={onClose}
      file={files[selectedItem]}
      totalFiles={files.length}
      currentFile={selectedItem + 1}
      onNext={onNext}
      onPrev={onPrev}
    />
  );
};

export default MediaModal;
