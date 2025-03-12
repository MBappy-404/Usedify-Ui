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
    <div>
      <div className="mx-auto px-4 lg:px-8 py-12 bg-gray-50 min-h-screen">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">{user?.role === "admin" ? "ALL" : "Your"} Listings</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className={`bg-blue-600 ${
                user?.role === "admin" && "hidden"
              } cursor-pointer text-white px-6 flex items-center gap-x-1 py-2 rounded-lg hover:bg-blue-700`}
            >
              <FiPlus className="w-5 h-5"/> New Listing
            </button>
            <div className="relative">
              <input
                type="text"
                placeholder="Search listings..."
                className="w-64 px-4 py-2 focus:outline-none rounded-lg border border-gray-200"
              />
              <FiSearch className="absolute right-3 top-3 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="">
          <ProductItem
            products={data?.data}
            isLoading={isLoading}
            isError={isError}
          />
        </div>
      </div>
      {isModalOpen && (
        <ListItem isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      )}
    </div>
  );
}
