"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaLaptop, FaCouch, FaBook, FaTshirt } from "react-icons/fa";

const AnimatedBanner = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-indigo-950 to-blue-950">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
          alt="Sustainable marketplace"
          layout="fill"
          objectFit="cover"
          className="transform scale-110 blur-sm opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-indigo-950/80 to-blue-950/80" />
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/80 to-transparent z-10" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/80 to-transparent z-10" />
      </div>

      {/* Main Content */}
      <main className="relative z-20 flex flex-1 items-center justify-center w-full h-full py-8 sm:py-12 md:py-16">
        <div className="w-full   mx-auto px-4  lg:px-16   flex flex-col items-center justify-center">
          <div className="w-full flex flex-col lg:flex-row items-center lg:items-stretch justify-center lg:justify-between gap-10 lg:gap-16">
            {/* Left Column - Main Content */}
            <section className="flex-1 flex flex-col items-center lg:items-start justify-center text-center lg:text-left space-y-8 max-w-2xl">
              <div className="space-y-6 w-full">
                <span className={`inline-block px-5 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-base md:text-lg font-semibold text-blue-200 tracking-widest shadow-lg ring-1 ring-blue-400/20 transform transition-all duration-1000 ${animate ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"}`}>SUSTAINABLE MARKETPLACE</span>
                <h1 className={`text-3xl md:text-5xl lg:text-6xl leading-tight font-extrabold text-white drop-shadow-xl transform transition-all duration-1000 ${animate ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"}`}>
                  <span className="block">Buy & Sell</span>
                  <span className="relative inline-block">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 animate-gradient-move">Pre-loved Items</span>
                  </span>
                  <span className="block">With Confidence</span>
                </h1>
                <p className={`text-base md:text-lg text-blue-100/90 font-medium max-w-xl mx-auto lg:mx-0 transform transition-all duration-1000 delay-200 ${animate ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"}`}>Your trusted platform for sustainable shopping. Quality items, fair prices, eco-friendly choices.</p>
              </div>

              {/* CTA Buttons */}
              <div className={`flex flex-col sm:flex-row gap-4 w-full max-w-xl mx-auto lg:mx-0 transform transition-all duration-1000 delay-500 ${animate ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"}`}>
                <Link href={"/products"} className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto group bg-gradient-to-r from-blue-600 to-indigo-600 text-white cursor-pointer px-8 py-3 md:px-10 md:py-4 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center gap-3 backdrop-blur-md bg-opacity-90 text-base md:text-lg tracking-wide">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    <span>Shop Now</span>
                  </button>
                </Link>
                <Link href={"/dashboard/manage-items"} className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto group bg-white/10 backdrop-blur-md border-2 border-white/20 cursor-pointer text-white px-8 py-3 md:px-10 md:py-4 rounded-xl font-bold hover:bg-white/20 hover:text-blue-200 transition-all duration-300 shadow-xl text-base md:text-lg tracking-wide">
                    <span>Sell Items</span>
                  </button>
                </Link>
              </div>
            </section>

            {/* Right Column - Category Cards */}
            <aside className="hidden lg:flex flex-1 items-center justify-center">
              <div className={`grid grid-cols-2 gap-5 xl:gap-7 transform transition-all duration-1000 delay-300 ${animate ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"}`}>
                {/* Use react-icons for category icons */}
                <div className="group bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 border-2 border-white/20 rounded-2xl p-6 xl:p-8 shadow-lg flex flex-col items-center min-w-[120px] min-h-[120px]">
                  <div className="mb-3 xl:mb-4 text-blue-300 text-3xl xl:text-4xl"><FaLaptop /></div>
                  <h3 className="text-white text-lg xl:text-xl font-bold mb-1">#Electronics</h3>
                  <p className="text-blue-100 text-sm xl:text-base text-center">Browse our curated collection of pre-loved electronics</p>
                </div>
                <div className="group bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 border-2 border-white/20 rounded-2xl p-6 xl:p-8 shadow-lg flex flex-col items-center min-w-[120px] min-h-[120px]">
                  <div className="mb-3 xl:mb-4 text-blue-300 text-3xl xl:text-4xl"><FaCouch /></div>
                  <h3 className="text-white text-lg xl:text-xl font-bold mb-1">#Furniture</h3>
                  <p className="text-blue-100 text-sm xl:text-base text-center">Browse our curated collection of pre-loved furniture</p>
                </div>
                <div className="group bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 border-2 border-white/20 rounded-2xl p-6 xl:p-8 shadow-lg flex flex-col items-center min-w-[120px] min-h-[120px]">
                  <div className="mb-3 xl:mb-4 text-blue-300 text-3xl xl:text-4xl"><FaBook /></div>
                  <h3 className="text-white text-lg xl:text-xl font-bold mb-1">#Books</h3>
                  <p className="text-blue-100 text-sm xl:text-base text-center">Browse our curated collection of pre-loved books</p>
                </div>
                <div className="group bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 border-2 border-white/20 rounded-2xl p-6 xl:p-8 shadow-lg flex flex-col items-center min-w-[120px] min-h-[120px]">
                  <div className="mb-3 xl:mb-4 text-blue-300 text-3xl xl:text-4xl"><FaTshirt /></div>
                  <h3 className="text-white text-lg xl:text-xl font-bold mb-1">#Fashion</h3>
                  <p className="text-blue-100 text-sm xl:text-base text-center">Browse our curated collection of pre-loved fashion</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* Mobile Category Tags */}
      <nav className="lg:hidden absolute bottom-8 left-0 right-0 z-30">
        <div className={`flex overflow-x-auto gap-3 px-2 sm:gap-4 sm:px-4 transform transition-all duration-1000 delay-300 ${animate ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"}`}>
          {/* Use react-icons for mobile category tags */}
          <span className="flex-shrink-0 bg-white/10 backdrop-blur-md text-white px-5 py-2 sm:px-7 sm:py-3 rounded-xl hover:bg-white/20 transition-all duration-300 border-2 border-white/20 text-sm sm:text-base flex items-center gap-2"><FaLaptop className="text-blue-300 text-lg sm:text-xl" />#Electronics</span>
          <span className="flex-shrink-0 bg-white/10 backdrop-blur-md text-white px-5 py-2 sm:px-7 sm:py-3 rounded-xl hover:bg-white/20 transition-all duration-300 border-2 border-white/20 text-sm sm:text-base flex items-center gap-2"><FaCouch className="text-blue-300 text-lg sm:text-xl" />#Furniture</span>
          <span className="flex-shrink-0 bg-white/10 backdrop-blur-md text-white px-5 py-2 sm:px-7 sm:py-3 rounded-xl hover:bg-white/20 transition-all duration-300 border-2 border-white/20 text-sm sm:text-base flex items-center gap-2"><FaBook className="text-blue-300 text-lg sm:text-xl" />#Books</span>
          <span className="flex-shrink-0 bg-white/10 backdrop-blur-md text-white px-5 py-2 sm:px-7 sm:py-3 rounded-xl hover:bg-white/20 transition-all duration-300 border-2 border-white/20 text-sm sm:text-base flex items-center gap-2"><FaTshirt className="text-blue-300 text-lg sm:text-xl" />#Fashion</span>
        </div>
      </nav>
    </div>
  );
};

export default AnimatedBanner;
