import Skeleton from "@/components/Skeleton";

// Shown instantly while the list page fetches collection + products from Wix
export default function ListLoading() {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      {/* Breadcrumb placeholder */}
      <div className="h-4 w-32 skeleton-shimmer rounded mt-4 mb-6" />
      {/* Banner placeholder */}
      <div className="h-32 skeleton-shimmer rounded-2xl mb-6" />
      {/* Filter placeholder */}
      <div className="h-10 w-full skeleton-shimmer rounded-full mb-8" />
      <Skeleton />
    </div>
  );
}
