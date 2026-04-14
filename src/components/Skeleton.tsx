const SkeletonCard = () => (
  <div className="flex flex-col rounded-xl overflow-hidden bg-white shadow-card w-full sm:w-[45%] lg:w-[22%]">
    <div className="w-full h-72 skeleton-shimmer" />
    <div className="px-3 pb-4 pt-3 flex flex-col gap-2">
      <div className="flex justify-between gap-2">
        <div className="h-4 w-3/4 skeleton-shimmer rounded-md" />
        <div className="h-4 w-10 skeleton-shimmer rounded-md" />
      </div>
      <div className="h-3 w-1/2 skeleton-shimmer rounded-md" />
      <div className="h-8 w-full skeleton-shimmer rounded-lg mt-1" />
    </div>
  </div>
);

const Skeleton = () => {
  return (
    <div className="mt-12 flex gap-x-6 gap-y-8 justify-between flex-wrap">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
};

export default Skeleton;
