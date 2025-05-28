"use client";

import { useGetProductQuery, useGetAllProductsQuery } from "@/redux/features/Item/itemApi";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaLocationDot, FaStar, FaHeart, FaShare, FaArrowLeft } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { TProduct } from "@/types";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetUserQuery } from "@/redux/features/user/userApi";
import { useCreateOrderMutation } from "@/redux/features/transactions/transactionsApi";
import { useRouter } from "next/navigation";
import { addToWishlist } from "@/redux/features/wishlist/wishlistSlice";
import { RootState } from "@/redux/store";

// Add this function at the top level
const formatDate = (date: string) => {
    const postDate = new Date(date);
    return postDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

// Skeleton Loading Component
const ProductDetailsSkeleton = () => (
    <div className="animate-pulse">
        <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
                <div className="h-[500px] bg-gray-200 rounded-2xl"></div>
                <div className="grid grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>
                    ))}
                </div>
            </div>
            <div className="space-y-6">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
            </div>
        </div>
    </div>
);

export default function ProductDetails() {
    const { id } = useParams();
    const { data: product, isLoading } = useGetProductQuery({ productId: id });
    const { data: relatedItems } = useGetAllProductsQuery([]);
    const { data: allProducts } = useGetAllProductsQuery({});
    const [selectedImage, setSelectedImage] = useState(0);
    const user = useAppSelector(selectCurrentUser);
    const { data: userData } = useGetUserQuery({ id: user?.id });
    const router = useRouter();
    const [createOrder] = useCreateOrderMutation();
    const dispatch = useAppDispatch();
    const wishlistItems = useAppSelector((state: RootState) => state.wishlist.items);

    const handleAddToWishlist = () => {
        if (!user) {
            toast.warning("Please login to add items to wishlist");
            router.push("/login");
            return;
        }

        if (product?.data) {
            dispatch(addToWishlist(product.data));
            toast.success(`${product.data.name} added to wishlist`);
        }
    };

    const isFavorite = wishlistItems?.some(
        (wishlistItem) => wishlistItem?._id === product?.data?._id
    );

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
    };

    const handlePurchase = async () => {
        if (!user) {
            toast.warning("Please login to complete your purchase");
            router.push("/login");
            return;
        }

        if (!(userData?.data?.phone && userData?.data?.address)) {
            toast.warning("Please complete your profile first");
            router.push("/dashboard/profile");
            return;
        }

        const toastId = toast.loading("Purchasing...");

        const order = {
            buyer: user?.id,
            seller: product?.data?.userId,
            products: [{ product: product?.data?._id }],
            totalPrice: product?.data?.price,
        };

        try {
            const res = await createOrder(order);

            if (res?.data?.success) {
                toast.success("Redirecting to payment page", { id: toastId });
                window.location.href = res?.data?.data;
            } else {
                toast.error("Item Purchase Failed", { id: toastId });
            }
        } catch (error) {
            toast.error("Error while purchasing item", { id: toastId });
        }
    };

    const handleContactSeller = () => {
        if (!user) {
            toast.warning("Please login to contact the seller");
            router.push("/login");
            return;
        }
        toast.success("Message sent to seller!");
    };

    if (isLoading) {
        return (
            <div className="max-w-[90rem] py-28 mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-12">
                <ProductDetailsSkeleton />
            </div>
        );
    }

    if (!product?.data) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-12">
                    <div className="text-center py-12">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Product Not Found</h2>
                        <Link
                            href="/products"
                            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
                        >
                            <FaArrowLeft className="w-4 h-4" />
                            <span>Back to Products</span>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-12">
                {/* Back Button */}
                <motion.div

                    className="mb-8"
                >
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
                    >
                        <FaArrowLeft className="w-4 h-4" />
                        <span>Back to Products</span>
                    </Link>
                </motion.div>

                {/* Product Details */}
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Image Section */}
                    <motion.div

                        className="space-y-4"
                    >
                        <div className="relative h-[500px] rounded-2xl overflow-hidden group">
                            <Image
                                src={product.data.image}
                                alt={product.data.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Action Buttons */}
                            <div className="absolute top-4 right-4 flex gap-2">
                                <motion.button

                                    onClick={handleAddToWishlist}
                                    className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer"
                                >
                                    <FaHeart className={`w-5 h-5 ${isFavorite ? "text-red-500" : "text-gray-600"}`} />
                                </motion.button>
                                <motion.button

                                    onClick={handleShare}
                                    className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer"
                                >
                                    <FaShare className="w-5 h-5 text-gray-600" />
                                </motion.button>
                            </div>
                        </div>

                        {/* Thumbnail Gallery */}
                        <div className="grid grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div
                                    key={i}
                                    onClick={() => setSelectedImage(i - 1)}
                                    className={`relative h-24 rounded-xl overflow-hidden cursor-pointer transition-all ${selectedImage === i - 1
                                            ? "ring-2 ring-blue-500"
                                            : "hover:opacity-80"
                                        }`}
                                >
                                    <Image
                                        src={product.data.image}
                                        alt={`${product.data.name} thumbnail ${i}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Content Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-6"
                    >
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                                {product.data.name}
                            </h1>
                            <div className="flex items-center gap-4 text-gray-600">
                                <div className="flex items-center gap-1">
                                    <FaLocationDot className="w-4 h-4 text-blue-500" />
                                    <span>{product.data.location}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <FaStar className="w-4 h-4 text-yellow-400" />
                                    <span>4.5 (120 reviews)</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-3xl font-bold text-blue-600">
                                ${product.data.price}
                            </div>
                            <span className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full font-medium">
                                {product.data.condition}
                            </span>
                        </div>

                        <div className="prose prose-lg max-w-none">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
                            <p className="text-gray-600 leading-relaxed">
                                {product.data.description}
                            </p>
                        </div>

                        <div className="border-t border-gray-200 pt-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Product Details</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-4 rounded-xl">
                                    <div className="text-sm text-gray-500">Category</div>
                                    <div className="font-medium text-gray-900">{product.data.category}</div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl">
                                    <div className="text-sm text-gray-500">Condition</div>
                                    <div className="font-medium text-gray-900">{product.data.condition}</div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl">
                                    <div className="text-sm text-gray-500">Location</div>
                                    <div className="font-medium text-gray-900">{product.data.location}</div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl">
                                    <div className="text-sm text-gray-500">Posted Date</div>
                                    <div className="font-medium text-gray-900">
                                        {formatDate(product.data.createdAt)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-6">
                            {product?.data?.status === "sold" ? (
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex-1 bg-red-600 text-white py-4 rounded-xl font-semibold cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    Sold Out
                                </motion.button>
                            ) : (
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handlePurchase}
                                    className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <FaShoppingCart className="w-5 h-5" />
                                    Buy Now
                                </motion.button>
                            )}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleContactSeller}
                                className="flex-1 border-2 border-blue-600 text-blue-600 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors cursor-pointer"
                            >
                                Contact Seller
                            </motion.button>
                        </div>
                    </motion.div>
                </div>

                {/* Related Products Section */}
                {relatedItems?.data && relatedItems.data.length > 0 && (
                    <div className="mt-16">
                      <h2 className="text-2xl font-bold text-gray-900 mb-8">You May Also Like</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {relatedItems.data
                                .filter((item: TProduct) => item._id !== product.data._id)
                                .slice(0, 4)
                                .map((item: TProduct) => (
                                    <motion.div
                                        key={item._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <Link href={`/products/${item._id}`} className="block">
                                            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                                                <div className="relative h-56">
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="p-4">
                                                    <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-blue-600 font-bold">${item.price}</span>
                                                        <span className="text-sm text-gray-500">{item.condition}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                        </div>
                    </div>
                )}

                
            </div>
        </div>
    );
} 