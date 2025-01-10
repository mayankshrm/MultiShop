// Add this line at the top of your file to convert it to a Client Component
"use client";

import React from "react";

const VideoComponent = ( product:any ) => {
  console.log(product)
  return (
    <video
  src={product.media?.items[1]?.video?.files?.[0]?.url || ""}
  muted
  loop
  className="absolute w-full h-full object-cover rounded-md"
  onMouseEnter={(e:any) => e.target.play()}
  onMouseLeave={(e:any) => {
    e.target.pause();
    e.target.currentTime = 0; // Reset to start when mouse leaves
  }}
/>
  );
};

export default VideoComponent;
