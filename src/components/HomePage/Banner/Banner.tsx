"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const AnimatedBanner = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="relative h-[100vh] overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
          alt="Used products marketplace"
          layout="fill"
          objectFit="cover"
          className="opacity-90"
        />
        {/* Simplified Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-700/80" />
      </div>
       
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="text-center w-full space-y-8">
          {/* Main Heading */}
          <h1
            className={`text-2xl md:text-6xl leading-[40px] md:leading-[80px] font-bold text-white mb-6 transform transition-all duration-1000 ${
              animate
                ? "translate-y-0 opacity-100"
                : "-translate-y-20 opacity-0"
            }`}
          >
            Give Used Items
            <br />A New Life with <span className="text-white rounded-md bg-indigo-500 py-1 px-3">UseDify</span>
          </h1>

          {/* Animated Tags */}
          <div
            className={`flex flex-wrap justify-center gap-2 transform transition-all duration-1000 delay-300 ${
              animate
                ? "translate-y-0 opacity-100"
                : "-translate-y-20 opacity-0"
            }`}
          >
            {["Electronics", "Furniture", "Books", "Fashion"].map((tag) => (
              <span
                key={tag}
                className="bg-white/10 text-xs md:text-base text-white md:px-4 md:py-2 px-2 py-1.5 rounded-full backdrop-blur-sm hover:bg-white/20 transition-all"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex justify-center space-x-4 transform transition-all duration-1000 delay-500 ${
              animate
                ? "translate-y-0 opacity-100"
                : "-translate-y-20 opacity-0"
            }`}
          >
            <Link href={"/products"}>
              <button className="bg-indigo-500 text-white cursor-pointer md:px-8 md:py-4 px-5 py-2 rounded-full font-bold hover:bg-indigo-600 transition-all shadow-2xl flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className=" w-4 h-4 mt-1 md:h-6 md:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Explore Now
              </button>
            </Link>
            <Link href={"/dashboard/manage-items"}>
              <button className="border-2 border-indigo-500 cursor-pointer text-white md:px-8 md:py-4 px-5 py-2 rounded-full font-bold hover:bg-indigo-600 hover:text-white transition-all">
                Start Selling
              </button>
            </Link>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes floatHorizontal {
          0% {
            transform: translateX(-100%) rotate(12deg);
          }
          100% {
            transform: translateX(100vw) rotate(12deg);
          }
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedBanner;
