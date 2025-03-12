"use client";
import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import ItemDetailsModal from "./Modal"; // Ensure the correct import path
import { IoHeartCircleOutline } from "react-icons/io5";
import { TProduct } from "@/types";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToWishlist } from "@/redux/features/wishlist/wishlistSlice";
import { toast } from "sonner";
import { RootState } from "@/redux/store";

const ItemCard = ({ item }: { item: TProduct }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector(
    (state: RootState) => state.wishlist.items
  );

  const handleAddWishList = (item: TProduct) => {
    dispatch(addToWishlist(item));
    toast.success(`${item?.name} added wishlist`);
  };

  const isFavorite = wishlistItems?.some(
    (wishlistItem) => wishlistItem?._id === item?._id
  );
  
  

  return (
    <div>
      {/* Product Card */}
      <div className="bg-white h-[500px] rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden flex flex-col">
        {/* Image Section */}
        <div className="relative flex-shrink-0">
          <img
            src={item.image}
            alt="Product"
            className="w-full h-56 object-cover rounded-t-xl transition-transform duration-300"
          />
          {/* Favorite Button */}
          {isFavorite ? (
            <button className="absolute cursor-pointer top-3 right-3  backdrop-blur-sm p-2 rounded-full shadow-md bg-red-100 transition-colors">
              <IoHeartCircleOutline className="w-6 h-6   text-red-500" />
            </button>
          ) : (
            <button
              onClick={() => handleAddWishList(item)}
              className="absolute cursor-pointer top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-red-100 transition-colors"
            >
              <IoHeartCircleOutline className="w-6 h-6 text-gray-600 hover:text-red-500" />
            </button>
          )}
        </div>

        {/* Content Section */}
        <div className="p-4 flex flex-col flex-grow">
          {/* Product Name */}
          <h3 className="font-semibold text-xl text-gray-800 mb-2">
            {item?.name}
          </h3>

          {/* Price and Condition */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-blue-600 font-bold text-lg">
              ${item?.price}
            </span>
            <span className="text-sm bg-green-100 text-green-800 px-2.5 py-1 rounded-full font-medium">
              {item?.condition}  
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 flex-grow">
            {item?.description?.slice(0, 120)}...
          </p>

          {/* Location */}
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <FaLocationDot className="w-5 h-5 mr-1.5 text-gray-400" />
            <span>{item?.location}</span>
          </div>

          {/* View Details Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full cursor-pointer bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
          >
            View Details
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <ItemDetailsModal
          item={item}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default ItemCard;
