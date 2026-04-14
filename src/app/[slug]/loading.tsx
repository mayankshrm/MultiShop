// Shown instantly while the product detail page fetches from Wix
export default function ProductLoading() {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex flex-col lg:flex-row gap-16 pt-6 pb-24">
      {/* Image skeleton */}
      <div className="w-full lg:w-1/2">
        <div className="h-[500px] skeleton-shimmer rounded-xl" />
        <div className="flex gap-3 mt-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-1/4 h-24 skeleton-shimmer rounded-lg" />
          ))}
        </div>
      </div>
      {/* Text skeleton */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        <div className="h-8 w-3/4 skeleton-shimmer rounded-lg" />
        <div className="h-4 w-full skeleton-shimmer rounded" />
        <div className="h-4 w-5/6 skeleton-shimmer rounded" />
        <div className="h-4 w-2/3 skeleton-shimmer rounded" />
        <div className="h-px bg-surface-muted my-2" />
        <div className="h-10 w-32 skeleton-shimmer rounded-lg" />
        <div className="h-px bg-surface-muted my-2" />
        <div className="h-12 w-48 skeleton-shimmer rounded-full" />
      </div>
    </div>
  );
}
