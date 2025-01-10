"use client";

import Image from "next/image";
import { useState } from "react";

// const images = [
//   {
//     id: 1,
//     url: "https://images.pexels.com/photos/19036832/pexels-photo-19036832/free-photo-of-mountain-reflection-in-lake.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
//   },
//   {
//     id: 2,
//     url: "https://images.pexels.com/photos/17867705/pexels-photo-17867705/free-photo-of-crowd-of-hikers-on-the-mountain-ridge-at-dusk.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
//   },
//   {
//     id: 3,
//     url: "https://images.pexels.com/photos/21812160/pexels-photo-21812160/free-photo-of-puerta-colonial-color-rojo-de-guanajuato-mexico.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
//   },
//   {
//     id: 4,
//     url: "https://images.pexels.com/photos/20832069/pexels-photo-20832069/free-photo-of-a-narrow-street-with-buildings-and-cars.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
//   },
// ];

const ProductImages = ({ items }: { items: any }) => {
  const [index, setIndex] = useState(0);
console.log("======",items)
  return (
    <div className="">
      <div className="h-[500px] relative">
        {items[index]?.mediaType === 'video' ? (
          <video
            src={items[index].video?.files?.[0]?.url || ""}
            controls
            className="object-cover rounded-md w-full h-full"
            muted
            autoPlay
            loop
          />
        ) : (
          <Image
            src={items[index]?.image?.url || ""}
            alt={items[index]?.title || "Image"}
            fill
            sizes="50vw"
            className="object-cover rounded-md"
          />
        )}
      </div>
      <div className="flex justify-between gap-4 mt-8">
        {items.map((item:any, i:any) => (
          <div
            className="w-1/4 h-32 relative gap-4 mt-8 cursor-pointer"
            key={item._id}
            onClick={() => setIndex(i)}
          >
            {item.mediaType === 'video' ? (
              // <video
              //   src={item.video?.files?.[0]?.url || ""}
              //   className="object-cover rounded-md w-full h-full"
              //   muted
              //   loop

              // />
              <video
              src={item.video?.files?.[0]?.url || ""}
  muted
  loop
  className="absolute w-full h-full object-cover rounded-md"
  onMouseEnter={(e:any) => e.target.play()}
  onMouseLeave={(e:any) => {
    e.target.pause();
    e.target.currentTime = 0; // Reset to start when mouse leaves
  }}
/>
            ) : (
              <Image
                src={item.image?.url || ""}
                alt={item.title || "Image"}
                fill
                sizes="30vw"
                className="object-cover rounded-md"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
