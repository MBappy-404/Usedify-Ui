"use client";

import ProductItem from "@/components/Cards/DashboardItem/ItemCard";
import ListItem from "@/components/Dashboard/ListItem";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetAllProductsQuery } from "@/redux/features/Item/itemApi";
import { useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import { FiEdit, FiEye, FiPlus, FiSearch, FiTrash } from "react-icons/fi";

// pages/dashboard/listings.js
export default function Listings() {
  const user = useAppSelector(selectCurrentUser);
  const { data, isLoading, isError } = useGetAllProductsQuery(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {user?.role === "admin" ? "ALL" : "Your"} Listings
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className={`bg-blue-600 ${
                user?.role === "admin" && "hidden"
              } cursor-pointer text-white px-4 sm:px-6 flex items-center justify-center gap-x-2 py-2 rounded-lg hover:bg-blue-700 transition-colors`}
            >
              <FiPlus className="w-5 h-5"/> 
              <span>New Listing</span>
            </button>
            
            <div className="relative">
              <input
                type="text"
                placeholder="Search listings..."
                className="w-full sm:w-64 px-4 py-2 focus:outline-none rounded-lg border border-gray-200"
              />
              <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <ProductItem
              products={data?.data}
              isLoading={isLoading}
              isError={isError}
            />
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <ListItem isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      )}
    </div>
  );
}
