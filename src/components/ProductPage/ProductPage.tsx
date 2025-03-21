"use client";

import { useGetAllProductsQuery } from "@/redux/features/Item/itemApi";
import { useState } from "react";
import { FiLoader, FiSearch } from "react-icons/fi";
import { getTrackBackground, Range } from "react-range";
import ItemCard from "./ItemCard";
import { TProduct } from "@/types";

// Define the type for query parameters
export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
};

const FilterSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mb-6 border bg-white rounded-md border-gray-300 p-3 md:p-5">
    <h2 className="text-lg font-semibold pb-3 border-b border-gray-300 text-gray-800 mb-4">
      {title}
    </h2>
    {children}
  </div>
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
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 py-40 relative overflow-hidden">
        {/* Animated Background Shapes */}
        <div className="absolute inset-0">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-400 rounded-full opacity-20 animate-blob"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-400 rounded-full opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500 rounded-full opacity-15 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 mt-20 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Title */}
            <h1 className="text-2xl md:text-5xl font-bold text-white mb-2 md:mb-6 animate-fade-in-down">
              Discover Pre-Loved Treasures
            </h1>

            {/* Subtitle */}
            <p className="md:text-lg text-base text-purple-100 mb-8 animate-fade-in-down animation-delay-200">
              Find unique, sustainable, and affordable items just for you.
            </p>

            {/* Search Bar */}
            <div className="flex justify-center rounded-lg shadow-xl   border border-blue-500 items-center animate-fade-in-up animation-delay-400">
              <button className=" rounded-l-lg   text-white p-4   bg-blue-700  ">
                <FiSearch className="w-6 h-6" />
              </button>
              <input
                type="text"
                placeholder="Search anything for items..."
                className="w-full px-4 py-4 text-white focus:outline-none   transition-all duration-300"
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          <div
            className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-all duration-500 z-999 ${
              openSidebar ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setOpenSidebar(false)}
          ></div>
          {/* Filters Sidebar */}
          <div
            className={`md:w-[23%] w-[73%] lg:relative fixed border-r md:-mt-5 border-gray-300 md:border-none top-0 left-0 h-full bg-white md:bg-none  md:rounded-lg md:z-10 z-999 transition-transform duration-500 ease-in-out overflow-y-auto px-3 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 ${
              openSidebar ? "translate-x-0" : "-translate-x-full"
            } lg:translate-x-0`}
          >
            <div className="flex justify-end  px-3 pt-4  mb-3">
              <button
                onClick={() => setOpenSidebar(false)}
                id="close-sidebar"
                className="ml-auto flex gap-1  flex-row-reverse  md:hidden cup cursor-pointer"
              >
                <svg
                  onClick={() => setOpenSidebar(false)}
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 18L18 6M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-sm -translate-y-[1px]">Hide Filter</p>
              </button>
            </div>
            {/* Category Filter */}
            <FilterSection title="Category">
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li
                    key={category}
                    onClick={() => handleCategoryFilter(category)}
                    className={`text-base text-gray-700 hover:text-blue-600 transition cursor-pointer ${
                      params?.find((param) => param.value === category)
                        ? "font-semibold text-blue-600"
                        : ""
                    }`}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </FilterSection>

            {/* Price Range Filter */}
            <FilterSection title="Filter by Price">
              <div className="flex items-center justify-center py-5 rounded-lg bg-gray-100">
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
                      // Extract `key` from thumbProps and spread the remaining props
                      const { key, ...restThumbProps } = thumbProps;
                      return (
                        <div
                          key={key} // Set key directly
                          {...restThumbProps} // Spread other props without key
                          style={{
                            ...restThumbProps.style,
                            height: "15px",
                            width: "15px",
                            background: "#155dfc",
                          }}
                          className="rounded-md cursor-pointer"
                        />
                      );
                    }}
                  />
                  <div className="flex text-sm justify-between mt-4">
                    <span className="text-gray-700">
                      Price Range :
                      <span className="font-semibold">
                        <span className="">$</span>
                        {values[0]} - <span className="">$</span>
                        {values[1]}{" "}
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
                  <li
                    key={condition}
                    onClick={() => handleConditionFilter(condition)}
                    className={`text-base text-gray-700 hover:text-blue-600 transition cursor-pointer ${
                      params?.find((param) => param.value === condition)
                        ? "font-semibold text-blue-600"
                        : ""
                    }`}
                  >
                    {condition}
                  </li>
                ))}
              </ul>
            </FilterSection>
          </div>

          <div className="flex justify-start md:hidden   -my-7 w-[95%] mx-auto ">
            <div
              onClick={() => setOpenSidebar(!openSidebar)}
              className="flex mb-2 items-center w-[40%]  gap-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3 fill-gray-800"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M.13 17.05a1.41 1.41 0 0 1 1.41-1.41H10a1.41 1.41 0 1 1 0 2.82H1.54a1.41 1.41 0 0 1-1.41-1.41zm0-14.1a1.41 1.41 0 0 1 1.41-1.41h16.92a1.41 1.41 0 1 1 0 2.82H1.54A1.41 1.41 0 0 1 .13 2.95zm0 7.05a1.41 1.41 0 0 1 1.41-1.41h16.92a1.41 1.41 0 1 1 0 2.82H1.54A1.41 1.41 0 0 1 .13 10z"
                  clipRule="evenodd"
                  data-original="#000000"
                ></path>
              </svg>
              <p>Filter Items</p>
            </div>
          </div>
          {/* Product Grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <div className="flex justify-center ">
                <div  className="flex mt-5 ml-5  justify-evenly ">
                  <FiLoader className="w-8 h-8 animate-spin text-blue-600" />
                  <span className="ml-2 text-lg text-gray-600">
                    Loading Items.....
                  </span>
                </div>
              </div>
            ) : items?.data?.length > 0 ? (
              items.data.map((item: TProduct) => (
                <ItemCard key={item._id} item={item} />
              ))
            ) : (
              <p className="text-center col-span-full text-gray-600">
                No items found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
