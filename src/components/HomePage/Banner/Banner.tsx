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
    <div className="relative h-[95vh]  overflow-hidden bg-gray-900">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
          alt="Sustainable marketplace"
          layout="fill"
          objectFit="cover"
          className="transform scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/85 to-gray-900/80" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex items-center pt-20">
        <div className="max-w-[90rem] w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Main Content */}
            <div className="text-left space-y-8">
              <div className="space-y-6">
                <div className="inline-block">
                  <span className={`inline-block px-4 py-2 rounded-md bg-white/10 text-[clamp(0.875rem,1.2vw,1.125rem)] font-medium text-gray-200 tracking-wider transform transition-all duration-1000 ${
                    animate ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"
                  }`}>
                    SUSTAINABLE MARKETPLACE
                  </span>
                </div>
                <h1
                  className={`text-[clamp(2.5rem,3.5vw,3.25rem)] leading-[1.1] font-bold text-white transform transition-all duration-1000 ${
                    animate ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"
                  }`}
                >
                  <span className="block">Buy & Sell</span>
                  <span className="relative inline-block">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                      Pre-loved Items
                    </span>
                  </span>
                  <span className="block">With Confidence</span>
                </h1>
                <p className={`text-[clamp(0.875rem,1.1vw,1.125rem)] text-gray-300 max-w-[90vw] lg:max-w-[35vw] transform transition-all duration-1000 delay-200 ${
                  animate ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"
                }`}>
                  Your trusted platform for sustainable shopping. Quality items, fair prices, eco-friendly choices.
                </p>
              </div>

              {/* CTA Buttons */}
              <div
                className={`flex flex-col sm:flex-row gap-4 transform transition-all duration-1000 delay-500 ${
                  animate ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"
                }`}
              >
                <Link href={"/products"} className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto group bg-blue-600 text-white cursor-pointer px-8 py-4 rounded-md font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-3 backdrop-blur-sm bg-opacity-90">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
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
                    <span className="text-[clamp(0.875rem,1.1vw,1.125rem)]">Shop Now</span>
                  </button>
                </Link>
                <Link href={"/dashboard/manage-items"} className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto group bg-white/10 backdrop-blur-sm border border-white/20 cursor-pointer text-white px-8 py-4 rounded-md font-semibold hover:bg-white/20 transition-all duration-300">
                    <span className="text-[clamp(0.875rem,1.1vw,1.125rem)]">Sell Items</span>
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Column - Category Cards */}
            <div className="hidden lg:block">
              <div
                className={`grid grid-cols-2 gap-6 transform transition-all duration-1000 delay-300 ${
                  animate ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"
                }`}
              >
                {["Electronics", "Furniture", "Books", "Fashion"].map((tag, index) => (
                  <div
                    key={tag}
                    className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 border border-white/20 rounded-md p-6"
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    <h3 className="text-white text-[clamp(1.25rem,1.5vw,1.5rem)] font-semibold mb-2">#{tag}</h3>
                    <p className="text-gray-300 text-[clamp(0.875rem,1vw,1rem)]">Browse our curated collection of pre-loved {tag.toLowerCase()}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Category Tags */}
      <div className="lg:hidden absolute bottom-12 left-0 right-0">
        <div
          className={`flex overflow-x-auto gap-4 px-4 transform transition-all duration-1000 delay-300 ${
            animate ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"
          }`}
        >
          {["Electronics", "Furniture", "Books", "Fashion"].map((tag, index) => (
            <span
              key={tag}
              className="flex-shrink-0 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-md hover:bg-white/20 transition-all duration-300 border border-white/20 text-[clamp(0.875rem,1vw,1rem)]"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimatedBanner;
