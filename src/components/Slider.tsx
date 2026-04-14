"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";

const slides = [
  {
    id: 1,
    label: "NEW ARRIVALS",
    title: "Daily Essentials,\nDelivered for Less",
    sub: "Fresh groceries, home goods & more — at prices that make sense.",
    cta: "Shop Now",
    img: "https://diib.com/learn/wp-content/uploads/2020/10/best-ecommerce-website-design-cover.jpg",
    url: "/list?cat=all-products",
    accent: "from-rose-50 via-pink-50/60 to-white",
  },
  {
    id: 2,
    label: "BEST DEALS",
    title: "Your Savings\nJackpot Is Here",
    sub: "Up to 70% off on top picks — every single day.",
    cta: "See Deals",
    img: "https://i.ibb.co/M2KkCWT/Create-a-realistic-image-showcasing-the-concept-of-online-shopping-The-scene-includes-a-shopping-tro.jpg",
    url: "/list?cat=all-products",
    accent: "from-sky-50 via-blue-50/60 to-white",
  },
  {
    id: 3,
    label: "PANTRY & HOME",
    title: "From Home\nto Pantry",
    sub: "Everything your household needs, sourced with care.",
    cta: "Browse All",
    img: "https://i.ibb.co/vqPfFkv/A-professional-digital-illustration-depicting-the-concept-of-online-shopping-The-scene-centers-aroun.jpg",
    url: "/list?cat=all-products",
    accent: "from-amber-50 via-yellow-50/60 to-white",
  },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(
    () => setCurrent((p) => (p === slides.length - 1 ? 0 : p + 1)),
    []
  );
  const prev = useCallback(
    () => setCurrent((p) => (p === 0 ? slides.length - 1 : p - 1)),
    []
  );

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [paused, next]);

  return (
    <div
      className="relative overflow-hidden bg-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides track */}
      <div
        className="flex transition-transform duration-700 ease-in-out will-change-transform"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`w-full shrink-0 bg-gradient-to-r ${slide.accent}`}
          >
            <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 py-10 md:py-14">

                {/* Text side */}
                <div className="flex-1 flex flex-col gap-4 text-center md:text-left order-2 md:order-1">
                  <span className="inline-block text-[10px] font-bold tracking-[0.2em] text-lama uppercase bg-lama/10 rounded-full px-3 py-1 w-fit mx-auto md:mx-0">
                    {slide.label}
                  </span>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink leading-[1.15] whitespace-pre-line">
                    {slide.title}
                  </h1>
                  <p className="text-sm text-ink-muted leading-relaxed max-w-sm mx-auto md:mx-0">
                    {slide.sub}
                  </p>
                  <div className="flex items-center gap-3 justify-center md:justify-start mt-1">
                    <Link
                      href={slide.url}
                      className="bg-lama text-white rounded-full py-3 px-7 text-sm font-semibold shadow-md shadow-lama/25 hover:bg-lama-dark active:scale-95 transition-all duration-200"
                    >
                      {slide.cta}
                    </Link>
                    <Link
                      href="/list?cat=all-products"
                      className="text-sm font-medium text-ink-muted hover:text-lama transition-colors underline underline-offset-2"
                    >
                      View all
                    </Link>
                  </div>
                </div>

                {/* Image side */}
                <div className="relative w-full md:w-[420px] lg:w-[480px] h-[200px] sm:h-[260px] md:h-[320px] lg:h-[360px] rounded-2xl overflow-hidden shadow-card shrink-0 order-1 md:order-2">
                  <Image
                    src={slide.img}
                    alt={slide.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 480px"
                    className="object-cover"
                    priority={idx === 0}
                  />
                  {/* Subtle left-side fade into gradient bg */}
                  <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white/20 to-transparent hidden md:block" />
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress bar — pink with transparency */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-lama/10">
        <div
          key={current}
          className="h-full bg-lama/50"
          style={{
            animation: paused ? "none" : "progress 5s linear forwards",
          }}
        />
      </div>

      {/* Arrow buttons */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/90 shadow-card hover:shadow-card-hover items-center justify-center text-ink hover:text-lama transition-all duration-200"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/90 shadow-card hover:shadow-card-hover items-center justify-center text-ink hover:text-lama transition-all duration-200"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`rounded-full transition-all duration-300 ${
              current === index
                ? "w-6 h-1.5 bg-lama"
                : "w-1.5 h-1.5 bg-ink/20 hover:bg-ink/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
