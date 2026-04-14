import { wixClientServer } from "@/lib/wixClientServer";
import { products } from "@wix/stores";
import Image from "next/image";
import Link from "next/link";
import Pagination from "./Pagination";

const PRODUCT_PER_PAGE = 8;

const ProductList = async ({
  categoryId,
  limit,
  searchParams,
}: {
  categoryId: string;
  limit?: number;
  searchParams?: any;
}) => {
  const wixClient = await wixClientServer();

  const productQuery = wixClient.products
    .queryProducts()
    .startsWith("name", searchParams?.name || "")
    .eq("collectionIds", categoryId)
    .hasSome(
      "productType",
      searchParams?.type ? [searchParams.type] : ["physical", "digital"]
    )
    .gt("priceData.price", searchParams?.min || 0)
    .lt("priceData.price", searchParams?.max || 999999)
    .limit(limit || PRODUCT_PER_PAGE)
    .skip(
      searchParams?.page
        ? parseInt(searchParams.page) * (limit || PRODUCT_PER_PAGE)
        : 0
    );

  if (searchParams?.sort) {
    const [sortType, sortBy] = searchParams.sort.split(" ");
    if (sortType === "asc") {
      productQuery.ascending(sortBy);
    }
    if (sortType === "desc") {
      productQuery.descending(sortBy);
    }
  }

  const res = await productQuery.find();

  return (
    <div className="mt-12 flex gap-x-6 gap-y-8 justify-between flex-wrap">
      {res.items.map((product: products.Product, i: number) => {
        const originalPrice = product.price?.price;
        const discountedPrice = product.price?.discountedPrice;
        const hasDiscount =
          originalPrice &&
          discountedPrice &&
          originalPrice !== discountedPrice &&
          originalPrice > discountedPrice;
        const discountPct = hasDiscount
          ? Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
          : 0;

        return (
          <Link
            href={"/" + product.slug}
            prefetch={true}
            className="group relative flex flex-col rounded-xl overflow-hidden bg-white shadow-card hover:shadow-card-hover transition-shadow duration-300 w-full sm:w-[45%] lg:w-[22%]"
            key={product._id}
          >
            {/* Image area */}
            <div className="relative w-full h-72 img-zoom">
              <Image
                src={product.media?.mainMedia?.image?.url || "/product.png"}
                alt={product.name || "Product"}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 22vw"
                priority={i < 4}
                className="absolute object-cover z-10 md:group-hover:opacity-0 transition-opacity duration-500"
              />
              {product.media?.items && product.media.items[1] && (
                <div className="hidden md:block">
                  {product.media.items[1]?.mediaType === "video" ? (
                    <div className="absolute w-full h-full">
                      <Image
                        src={
                          product.media.items[1]?.video?.stillFrameMediaId
                            ? `https://static.wixstatic.com/media/${product.media.items[1].video.stillFrameMediaId}`
                            : "/product.png"
                        }
                        alt="Video Thumbnail"
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 22vw"
                        className="absolute object-cover"
                      />
                      <video
                        src={product.media.items[1]?.video?.files?.[0]?.url || ""}
                        muted
                        loop
                        playsInline
                        autoPlay
                        className="absolute w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <Image
                      src={product.media.items[1]?.image?.url || "/product.png"}
                      alt={product.media.items[1]?.title || "Secondary Image"}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 22vw"
                      className="absolute object-cover"
                    />
                  )}
                </div>
              )}

              {/* Discount badge */}
              {hasDiscount && (
                <div className="absolute top-3 left-3 z-20 bg-lama text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
                  {discountPct}% OFF
                </div>
              )}

              {/* Quick-view overlay */}
              <div className="absolute inset-0 z-20 bg-ink/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                <span className="bg-white text-ink text-xs font-semibold px-4 py-2 rounded-full shadow">
                  Quick View
                </span>
              </div>
            </div>

            {/* Info section */}
            <div className="px-3 pb-4 pt-3 flex flex-col gap-2">
              <div className="flex justify-between items-start gap-2">
                <span className="font-semibold text-sm text-ink leading-snug line-clamp-2">
                  {product.name}
                </span>
                <div className="text-right shrink-0">
                  <div className="font-bold text-sm text-ink">
                    ₹{discountedPrice ?? originalPrice}
                  </div>
                  {hasDiscount && (
                    <div className="text-xs text-ink-muted line-through">
                      ₹{originalPrice}
                    </div>
                  )}
                </div>
              </div>
              {product.additionalInfoSections && (
                <div
                  className="text-xs text-ink-muted line-clamp-2"
                  dangerouslySetInnerHTML={{
                    __html:
                      product.additionalInfoSections.find(
                        (section: any) => section.title === "shortDesc"
                      )?.description || "",
                  }}
                />
              )}
              <button className="mt-1 w-full py-2 rounded-lg ring-1 ring-lama text-lama text-xs font-semibold hover:bg-lama hover:text-white transition-all duration-200 active:scale-95">
                Add to Cart
              </button>
            </div>
          </Link>
        );
      })}
      {searchParams?.cat || searchParams?.name ? (
        <Pagination
          currentPage={res.currentPage || 0}
          hasPrev={res.hasPrev()}
          hasNext={res.hasNext()}
        />
      ) : null}
    </div>
  );
};

export default ProductList;
