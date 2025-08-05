import { Spinner } from 'app/components';

const MediaBlockLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center py-4 px-4 w-full h-[385px] bg-grayscale-bg-dark text-grayscale-secondary rounded">
      <div className="w-6 h-6 flex items-center pointer-events-none mr-[10px]">
        <Spinner className="w-3 h-3" />
      </div>
    </div>
  );
};

export default MediaBlockLoading;
