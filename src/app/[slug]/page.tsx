import Add from "@/components/Add";
import CustomizeProducts from "@/components/CustomizeProducts";
import ProductImages from "@/components/ProductImages";
import Reviews from "@/components/Reviews";
import AccordionSection from "@/components/AccordionSection";
import { wixClientServer } from "@/lib/wixClientServer";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import DOMPurify from "isomorphic-dompurify";
import Link from "next/link";

// Revalidate product pages every 5 minutes
export const revalidate = 300;

// Pre-render all product pages at build time so navigating to them is instant
export async function generateStaticParams() {
  const wixClient = await wixClientServer();
  const products = await wixClient.products
    .queryProducts()
    .limit(100)
    .find();

  return products.items
    .filter((p) => p.slug)
    .map((p) => ({ slug: p.slug as string }));
}

const SinglePage = async ({ params }: { params: { slug: string } }) => {
  const wixClient = await wixClientServer();

  const products = await wixClient.products
    .queryProducts()
    .eq("slug", params.slug)
    .find();

  if (!products.items[0]) {
    return notFound();
  }

  const product = products.items[0];
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
  const savings = hasDiscount ? (originalPrice - discountedPrice).toFixed(0) : 0;

  return (
    <>
      {/* Breadcrumbs */}
      <nav
        className="flex items-center gap-2 text-xs text-ink-muted px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 pt-4 pb-2"
        aria-label="breadcrumb"
      >
        <Link href="/" className="hover:text-lama transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link
          href="/list?cat=all-products"
          className="hover:text-lama transition-colors"
        >
          Products
        </Link>
        <span>/</span>
        <span className="text-ink font-medium truncate max-w-[200px]">
          {product.name}
        </span>
      </nav>

      <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16 pb-24 lg:pb-0">
        {/* IMG */}
        <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
          <ProductImages items={product.media?.items} />
        </div>

        {/* TEXTS */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <h1 className="text-3xl font-bold text-ink">{product.name}</h1>
          <p
            className="text-sm text-ink-muted leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(product.description || ""),
            }}
          />

          <div className="h-px bg-surface-muted" />

          {/* Price block */}
          <div className="flex flex-col gap-2">
            {hasDiscount ? (
              <>
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-ink">
                    ₹{discountedPrice}
                  </span>
                  <span className="text-lg text-ink-muted line-through">
                    ₹{originalPrice}
                  </span>
                </div>
                <div className="inline-flex items-center gap-2 bg-lama-light text-lama px-3 py-1.5 rounded-full text-sm font-semibold w-fit">
                  <span>You save ₹{savings}</span>
                  <span className="bg-lama text-white text-xs px-1.5 py-0.5 rounded-full">
                    {discountPct}% OFF
                  </span>
                </div>
              </>
            ) : (
              <span className="text-3xl font-bold text-ink">
                ₹{originalPrice}
              </span>
            )}
          </div>

          <div className="h-px bg-surface-muted" />

          {/* Add to cart / customize */}
          <div id="add-to-cart">
            {Array.isArray(product?.variants) &&
            product?.variants.length > 0 &&
            Array.isArray(product?.productOptions) &&
            product?.productOptions.length > 0 ? (
              <CustomizeProducts
                productId={product._id!}
                variants={product.variants}
                productOptions={product.productOptions}
              />
            ) : (
              <Add
                productId={product._id!}
                variantId="00000000-0000-0000-0000-000000000000"
                stockNumber={100}
              />
            )}
          </div>

          <div className="h-px bg-surface-muted" />

          {/* Additional info as accordion */}
          {product.additionalInfoSections &&
            product.additionalInfoSections.length > 0 && (
              <div className="flex flex-col">
                {product.additionalInfoSections.map((section: any) => (
                  <AccordionSection
                    key={section.title}
                    title={section.title}
                    description={DOMPurify.sanitize(section.description || "")}
                  />
                ))}
              </div>
            )}

          <div className="h-px bg-surface-muted" />

          {/* Reviews */}
          <h2 className="text-xl font-bold text-ink">Customer Reviews</h2>
          <Suspense fallback={<div className="text-sm text-ink-muted">Loading reviews...</div>}>
            <Reviews productId={product._id!} />
          </Suspense>
        </div>
      </div>

      {/* Sticky mobile CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-sm border-t border-surface-muted px-4 py-3 flex items-center gap-3 shadow-modal">
        <div className="flex flex-col flex-1 min-w-0">
          <span className="text-xs text-ink-muted truncate">{product.name}</span>
          <span className="font-bold text-lama text-base">
            ₹{discountedPrice ?? originalPrice}
          </span>
        </div>
        <Link
          href="#add-to-cart"
          className="bg-lama text-white rounded-full px-6 py-3 text-sm font-semibold shadow-lg shadow-lama/30 hover:bg-lama-dark transition-colors shrink-0"
        >
          Add to Cart
        </Link>
      </div>
    </>
  );
};

export default SinglePage;
