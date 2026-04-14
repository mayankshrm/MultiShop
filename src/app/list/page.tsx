import Filter from "@/components/Filter";
import ProductList from "@/components/ProductList";
import Skeleton from "@/components/Skeleton";
import { wixClientServer } from "@/lib/wixClientServer";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

// Revalidate the list page every 60 seconds — products don't change every second
export const revalidate = 60;

const ListPage = async ({ searchParams }: { searchParams: any }) => {
  const wixClient = await wixClientServer();

  const cat = await wixClient.collections.getCollectionBySlug(
    searchParams.cat || "all-products"
  );

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-ink-muted py-4" aria-label="breadcrumb">
        <Link href="/" className="hover:text-lama transition-colors">Home</Link>
        <span>/</span>
        <span className="text-ink font-medium">{cat?.collection?.name || "Products"}</span>
      </nav>

      {/* CAMPAIGN */}
      <div className="flex rounded-2xl overflow-hidden bg-gradient-to-r from-lama-light via-pink-50 to-white px-8 py-6 justify-between items-center mb-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl md:text-3xl font-semibold leading-snug text-ink">
            Grab up to 50% off on
            <br />
            <span className="text-lama">Selected Products</span>
          </h1>
          <Link href="/list?cat=all-products">
            <button className="rounded-full bg-lama text-white w-max py-2.5 px-6 text-sm font-semibold hover:bg-lama-dark transition-colors shadow-md shadow-lama/25">
              Shop Now
            </button>
          </Link>
        </div>
        <div className="relative w-32 h-32 md:w-48 md:h-48 shrink-0">
          <Image src="/woman.png" alt="Sale" fill className="object-contain" />
        </div>
      </div>

      {/* FILTER */}
      <Filter />

      {/* PRODUCTS */}
      <div className="flex items-center gap-3 mt-10 mb-2">
        <h1 className="text-xl font-bold text-ink">
          {cat?.collection?.name}
        </h1>
        <span className="text-sm text-ink-muted font-normal">For You</span>
      </div>
      <Suspense fallback={<Skeleton />}>
        <ProductList
          categoryId={
            cat.collection?._id || "00000000-000000-000000-000000000001"
          }
          searchParams={searchParams}
        />
      </Suspense>
    </div>
  );
};

export default ListPage;
