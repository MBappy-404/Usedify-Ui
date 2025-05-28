"use client";
import React, { useState } from "react";
import { FaLocationDot, FaEye, FaHeart, FaShare, FaUser } from "react-icons/fa6";
import ItemDetailsModal from "./Modal";
import { TProduct } from "@/types";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToWishlist, removeFromWishlist } from "@/redux/features/wishlist/wishlistSlice";
import { toast } from "sonner";
import { RootState } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const ItemCard = ({ item }: { item: TProduct }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector(
    (state: RootState) => state.wishlist.items
  );

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isFavorite) {
      dispatch(removeFromWishlist(item._id));
      toast.success(`${item.name} removed from wishlist`);
    } else {
      dispatch(addToWishlist(item));
      toast.success(`${item.name} added to wishlist`);
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(window.location.origin + `/products/${item._id}`);
    toast.success("Link copied to clipboard!");
  };

  const isFavorite = wishlistItems?.some(
    (wishlistItem) => wishlistItem?._id === item?._id
  );

  return (
    <div className="block w-full">
      <motion.div 
        className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 relative group w-full"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ y: -2 }}
      >
        {/* Main Image Container */}
        <div className="relative h-[220px]">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
          />
          
          {/* Price Tag */}
          <div className="absolute bottom-2 left-2">
            <span className="px-3 py-1.5 bg-white text-base font-bold text-blue-600 rounded-full shadow-sm">
              ${item.price}
            </span>
          </div>

          {/* Hover Actions */}
          <AnimatePresence>
            {isHovered && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/40 flex items-center justify-center gap-3"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleWishlistToggle}
                  className="p-2.5 bg-white rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <FaHeart 
                    className={`w-4 h-4 transition-colors duration-300 ${
                      isFavorite 
                        ? "text-red-500" 
                        : "text-gray-600 hover:text-red-400"
                    }`} 
                  />
                </motion.button>
                <Link href={`/products/${item._id}`}>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2.5 bg-white rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    <FaEye className="w-4 h-4 text-blue-600" />
                  </motion.button>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleShare}
                  className="p-2.5 bg-white rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <FaShare className="w-4 h-4 text-gray-600 hover:text-blue-500 transition-colors duration-300" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Content Section */}
        <div className="p-4">
          <div className="space-y-3">
            {/* Title */}
            <h3 className="text-base font-medium text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
              {item.name}
            </h3>

            {/* Location */}
            <div className="flex items-center gap-1.5 text-gray-500">
              <FaLocationDot className="w-3.5 h-3.5 text-blue-500" />
              <span className="text-sm">{item.location}</span>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm line-clamp-2">
              {item.description}
            </p>

            {/* Seller Info */}
            <div className="flex items-center gap-1.5 text-gray-500 pt-2 border-t border-gray-100">
              <FaUser className="w-3.5 h-3.5 text-blue-500" />
              <span className="text-sm">Posted by {item.userId?.name || 'Anonymous'}</span>
            </div>
          </div>
        </div>
      </motion.div>

      <ItemDetailsModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        item={item}
      />
    </div>
  );
};

export default ItemCard;
