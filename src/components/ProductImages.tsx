"use client";

import Image from "next/image";
import { useState } from "react";

const ProductImages = ({ items }: { items: any }) => {
  const [index, setIndex] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="h-[500px] relative rounded-xl overflow-hidden img-zoom ring-1 ring-surface-muted">
        {items[index]?.mediaType === "video" ? (
          <video
            src={items[index].video?.files?.[0]?.url || ""}
            controls
            className="object-cover w-full h-full"
            muted
            playsInline
            autoPlay
            loop
          />
        ) : (
          <Image
            src={items[index]?.image?.url || ""}
            alt={items[index]?.title || "Product image"}
            fill
            sizes="50vw"
            className="object-cover"
          />
        )}
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3">
        {items.map((item: any, i: number) => (
          <div
            key={item._id}
            onClick={() => setIndex(i)}
            className={`relative w-1/4 h-24 cursor-pointer rounded-lg overflow-hidden ring-2 transition-all duration-200 ${
              i === index
                ? "ring-lama"
                : "ring-surface-muted hover:ring-lama/50"
            }`}
          >
            {item.mediaType === "video" ? (
              <video
                src={item.video?.files?.[0]?.url || ""}
                muted
                loop
                playsInline
                poster={item.thumbnail?.url || ""}
                className="absolute w-full h-full object-cover"
                onMouseEnter={(e: any) => e.target.play()}
                onMouseLeave={(e: any) => {
                  e.target.pause();
                  e.target.currentTime = 0;
                }}
              />
            ) : (
              <Image
                src={item.image?.url || ""}
                alt={item.title || "Thumbnail"}
                fill
                sizes="30vw"
                className="object-cover"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
