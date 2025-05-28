"use client";

import { useGetAllProductsQuery } from "@/redux/features/Item/itemApi";
import { useState } from "react";
import { FiLoader, FiSearch, FiFilter, FiX } from "react-icons/fi";
import { getTrackBackground, Range } from "react-range";
import ItemCard from "./ItemCard";
import { TProduct } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

// Define the type for query parameters
export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
};

// Skeleton Loading Component
const ProductSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse">
    <div className="h-[400px] bg-gray-200"></div>
    <div className="p-6 space-y-4">
      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      <div className="h-10 bg-gray-200 rounded"></div>
    </div>
  </div>
);

const FilterSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="mb-6 bg-white rounded-xl border border-gray-100 p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow"
  >
    <h2 className="text-lg font-semibold pb-3 border-b border-gray-100 text-gray-800 mb-4">
      {title}
    </h2>
    {children}
  </motion.div>
);

export default function ProductPages() {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const [values, setValues] = useState([20, 500]); // Default price range
  const { data: items, isLoading } = useGetAllProductsQuery(params);
  const [openSidebar, setOpenSidebar] = useState(false);

  // Handle category filter
  const handleCategoryFilter = (category: string) => {
    const newParams: TQueryParam[] = [];
    if (category) {
      newParams.push({ name: "category", value: category });
    }
    setParams(newParams);
  };

  // Handle price range filter
  const handlePriceRangeFilter = (values: number[]) => {
    setValues(values);
    const newParams: TQueryParam[] = [];
    if (values) {
      newParams.push({ name: "price", value: `${values[0]},${values[1]}` });
    }
    setParams(newParams);
  };

  // Handle condition filter
  const handleConditionFilter = (condition: string) => {
    const newParams: TQueryParam[] = [];
    if (condition) {
      newParams.push({ name: "condition", value: condition });
    }
    setParams(newParams);
  };

  // Handle search filter
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;
    const newParams: TQueryParam[] = [];
    if (searchQuery) {
      newParams.push({ name: "search", value: searchQuery });
    }
    setParams(newParams);
  };

  // Categories and Conditions
  const categories = [
    "Electronics",
    "Fashion",
    "Furniture",
    "Books & Stationery",
    "Toys & Games",
    "Home Decor",
    "Sports Equipment",
    "Tools & Equipment",
    "Musical Instruments",
    "Health & Fitness",
    "Collectibles & Art",
    "Uncategorized",
  ];
  const conditions = [
    "Brand New",
    "Like New",
    "Good",
    "Well Used",
    "For Parts or Repair",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Search Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-24 relative overflow-hidden">
        {/* Animated Background Shapes */}
        <div className="absolute inset-0">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-400 rounded-full opacity-20 animate-blob"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-400 rounded-full opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500 rounded-full opacity-15 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6">
              Discover Pre-Loved Treasures
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-blue-100 mb-8">
              Find unique, sustainable, and affordable items just for you.
            </p>

            {/* Search Bar */}
            <div className="flex justify-center rounded-xl shadow-lg border border-blue-500/30 items-center bg-white/10 backdrop-blur-sm max-w-2xl mx-auto">
              <button className="rounded-l-xl text-white p-4 bg-blue-700/50 hover:bg-blue-700 transition-colors">
                <FiSearch className="w-5 h-5" />
              </button>
              <input
                type="text"
                placeholder="Search anything for items..."
                className="w-full px-4 py-4 text-white placeholder-blue-200 focus:outline-none bg-transparent transition-all duration-300"
                onChange={handleSearch}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          <AnimatePresence>
            {openSidebar && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-all duration-500 z-50"
                onClick={() => setOpenSidebar(false)}
              />
            )}
          </AnimatePresence>

          {/* Filters Sidebar */}
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`md:w-[20%] w-[85%] lg:relative fixed border-r md:-mt-5 border-gray-200 md:border-none top-0 left-0 h-full bg-white md:bg-none md:rounded-xl md:z-10 z-50 transition-transform duration-500 ease-in-out overflow-y-auto px-3 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 ${
              openSidebar ? "translate-x-0" : "-translate-x-full"
            } lg:translate-x-0`}
          >
            <div className="flex justify-end px-3 pt-4 mb-3">
              <button
                onClick={() => setOpenSidebar(false)}
                className="ml-auto flex gap-1 flex-row-reverse md:hidden items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <FiX className="w-5 h-5" />
                <span className="text-sm">Hide Filter</span>
              </button>
            </div>

            {/* Category Filter */}
            <FilterSection title="Category">
              <ul className="space-y-2">
                {categories.map((category) => (
                  <motion.li
                    key={category}
                    whileHover={{ x: 5 }}
                    onClick={() => handleCategoryFilter(category)}
                    className={`text-base text-gray-700 hover:text-blue-600 transition cursor-pointer ${
                      params?.find((param) => param.value === category)
                        ? "font-semibold text-blue-600"
                        : ""
                    }`}
                  >
                    {category}
                  </motion.li>
                ))}
              </ul>
            </FilterSection>

            {/* Price Range Filter */}
            <FilterSection title="Filter by Price">
              <div className="flex items-center justify-center py-5 rounded-lg bg-gray-50">
                <div className="w-4/5">
                  <div className="flex text-sm justify-between mb-2">
                    <span className="text-gray-700">Min</span>
                    <span className="text-gray-700">Max</span>
                  </div>
                  <Range
                    step={1}
                    min={1}
                    max={1000}
                    values={values}
                    onChange={handlePriceRangeFilter}
                    renderTrack={({ props, children }) => (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                          height: "3px",
                          background: getTrackBackground({
                            values,
                            colors: ["#155dfc", "#155dfc", "#155dfc"],
                            min: 1,
                            max: 1000,
                          }),
                        }}
                        className="rounded-full"
                      >
                        {children}
                      </div>
                    )}
                    renderThumb={({ props: thumbProps, index }) => {
                      const { key, ...restThumbProps } = thumbProps;
                      return (
                        <div
                          key={key}
                          {...restThumbProps}
                          style={{
                            ...restThumbProps.style,
                            height: "15px",
                            width: "15px",
                            background: "#155dfc",
                          }}
                          className="rounded-md cursor-pointer shadow-lg hover:shadow-xl transition-shadow"
                        />
                      );
                    }}
                  />
                  <div className="flex text-sm justify-between mt-4">
                    <span className="text-gray-700">
                      Price Range:
                      <span className="font-semibold ml-1">
                        ${values[0]} - ${values[1]}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </FilterSection>

            {/* Condition Filter */}
            <FilterSection title="Condition">
              <ul className="space-y-2">
                {conditions.map((condition) => (
                  <motion.li
                    key={condition}
                    whileHover={{ x: 5 }}
                    onClick={() => handleConditionFilter(condition)}
                    className={`text-base text-gray-700 hover:text-blue-600 transition cursor-pointer ${
                      params?.find((param) => param.value === condition)
                        ? "font-semibold text-blue-600"
                        : ""
                    }`}
                  >
                    {condition}
                  </motion.li>
                ))}
              </ul>
            </FilterSection>
          </motion.div>

          {/* Mobile Filter Button */}
          <div className="flex justify-start md:hidden -my-7 w-[95%] mx-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setOpenSidebar(!openSidebar)}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <FiFilter className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Filter Items</span>
            </motion.button>
          </div>

          {/* Product Grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4">
            {isLoading ? (
              Array(8).fill(0).map((_, index) => (
                <ProductSkeleton key={index} />
              ))
            ) : items?.data?.length > 0 ? (
              items.data.map((item: TProduct) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <ItemCard item={item} />
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-12"
              >
                <p className="text-gray-600 text-lg">
                  No items found matching your criteria
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
