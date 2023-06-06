import SkeletonBox from './Skeleton';

const SkeletonArticlesList = () => {
  const renderColumnItem = (large = false) => (
    <div className="rounded-2lg pb-2 border border-gray-light">
      <SkeletonBox className="h-[170px] w-full rounded-t-2lg" />
      <div className="flex flex-col p-2 gap-3">
        <SkeletonBox className="h-4 w-full rounded-lg" />
        <SkeletonBox className="h-4 w-[80%] rounded-lg" />
        <SkeletonBox className="h-4 w-[90%] rounded-lg" />
        {large && <SkeletonBox className="h-4 w-[90%] rounded-lg" />}
      </div>
    </div>
  );
  const renderColumn = (large = false) => (
    <div className="grid gap-4">
      {renderColumnItem(large)}
      {renderColumnItem()}
      {renderColumnItem()}
    </div>
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {renderColumn()}
      {renderColumn(true)}
      {renderColumn()}
    </div>
  );
};

export default SkeletonArticlesList;
