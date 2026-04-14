import Skeleton from "@/components/Skeleton";

// Shown instantly while the homepage fetches data from Wix
export default function HomeLoading() {
  return (
    <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="h-8 w-48 skeleton-shimmer rounded-lg mb-8" />
      <Skeleton />
    </div>
  );
}
