"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import {
  removeFromWishlist,
  clearWishlist,
} from "@/redux/features/wishlist/wishlistSlice";
import { FaRemoveFormat, FaStar, FaTrash, FaTrashAlt } from "react-icons/fa";
import { IoHeartCircleOutline } from "react-icons/io5";
import Link from "next/link";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetUserQuery } from "@/redux/features/user/userApi";
import { useCreateOrderMutation } from "@/redux/features/transactions/transactionsApi";
import { toast } from "sonner";
import { TProduct } from "@/types";
import { useRouter } from "next/navigation";

export default function Wishlist() {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector(
    (state: RootState) => state.wishlist.items
  );
  const user = useAppSelector(selectCurrentUser);
  const { data: userData } = useGetUserQuery({ id: user?.id });
  const router = useRouter();
  const [createOrder] = useCreateOrderMutation();

  // Handle removing an item from the wishlist
  const handleRemoveItem = (id: string) => {
    dispatch(removeFromWishlist(id));
  };

  // Handle clearing the entire wishlist
  const handleClearWishlist = () => {
    dispatch(clearWishlist());
  };

  // Handle "Pay Now" action
  const handlePayNow = async(item: TProduct) => {
    if (!(userData?.data?.phone || userData?.data?.address)) {
      router.push("/dashboard/profile");
      toast.warning("Please complete your profile first");
    } else {
      const toastId = toast.loading("Purchasing...");
      const order = {
        buyer: user?.id,
        seller: item?.userId,
        products: [{ product: item?._id }],
        totalPrice: item.price,
      };

      const res = await createOrder(order);
      console.log(res);
      if (res?.data?.success) {
        toast.success("Item Purchased Success", { id: toastId });
        window.location.href = res?.data?.data;
        dispatch(removeFromWishlist(item?._id));
      } else {
        toast.error("Item Purchased Failed", { id: toastId });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className=" mx-auto px-2 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl md:text-3xl font-bold text-gray-900">Your Wish List</h1>
          <div className="flex items-center space-x-4">
            {wishlistItems.length > 0 && (
              <button
                onClick={handleClearWishlist}
                className="bg-red-600 text-white flex justify-center  items-center gap-1.5 cursor-pointer text-sm px-4 py-1.5  md:px-6 md:py-2 rounded-lg hover:bg-red-700"
              >
                <FaTrashAlt/> 
                <span>Clear Wishlist</span>
              </button>
            )}
          </div>
        </div>

        {/* Wishlist Items */}
        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {wishlistItems.map((item) => (
              <div
                key={item?._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow md:p-6 p-3"
              >
                <div className="flex md:flex-row flex-col gap-4">
                  <img
                    src={item?.image}
                    alt="Product"
                    className="w-full md:w-40  h-40 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <div className="flex justify-between cursor-pointer items-center">
                      <h3 className="text-lg font-semibold">{item?.name}</h3>
                      <button
                        onClick={() => handleRemoveItem(item?._id)}
                        className="text-red-500 bg-gray-200 p-2 rounded-full hover:text-red-700"
                      >
                        <FaTrash
                          title="Remove wishlist"
                          className="w-4 h-4 cursor-pointer"
                        />
                      </button>
                    </div>

                    <div className="mt-2 space-y-1">
                      <p className="text-blue-600 font-bold">${item?.price}</p>
                      <p className="text-sm text-gray-500">{item?.condition}</p>
                       
                    </div>

                    <div className="mt-4 flex space-x-4">
                      <button
                        onClick={() => handlePayNow(item)}
                        className=" bg-blue-600 text-white py-2  w-full md:w-[200px] cursor-pointer rounded hover:bg-blue-500"
                      >
                        Pay Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-20">
            <div className="inline-block p-8 bg-gray-100 rounded-2xl shadow-sm">
              <IoHeartCircleOutline className="w-16 h-16 text-gray-300 mx-auto" />
              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                Your Wish List is Empty
              </h3>
              <p className="mt-2 text-gray-600">Start saving items you love!</p>
              <Link href={"/products"}>
                <button className="mt-6 cursor-pointer bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700">
                  Browse Items
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
