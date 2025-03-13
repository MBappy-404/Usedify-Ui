"use client";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useCreateOrderMutation } from "@/redux/features/transactions/transactionsApi";
import { useGetUserQuery } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hooks";
import { TProduct } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaLocationDot } from "react-icons/fa6";
import { toast } from "sonner";

interface ItemDetailsModalProps {
  item: TProduct;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

const ItemDetailsModal = ({
  item,
  isModalOpen,
  setIsModalOpen,
}: ItemDetailsModalProps) => {
  const closeModal = () => setIsModalOpen(false);
  const user = useAppSelector(selectCurrentUser);
  const { data: userData } = useGetUserQuery({ id: user?.id });
  const router = useRouter();
  const [createOrder] = useCreateOrderMutation();

  const handlePurchase = async () => {
    // Check if user exists
    if (!user) {
      toast.warning("Please login to complete your purchase");
      router.push("/login"); // Redirect to login if user is not logged in
      return;
    }
  
    // Check if user data (phone and address) is complete
    if (!(userData?.data?.phone && userData?.data?.address)) {
      toast.warning("Please complete your profile first");
      router.push("/dashboard/profile"); // Redirect to profile page to complete information
      return;
    }
  
    // Proceed with purchasing logic if user is authenticated and data is complete
    const toastId = toast.loading("Purchasing...");
    
    const order = {
      buyer: user?.id,
      seller: item?.userId,
      products: [{ product: item?._id }],
      totalPrice: item.price,
    };
  
    try {
      const res = await createOrder(order);
      console.log(res);
      
      if (res?.data?.success) {
        toast.success("Item Purchased Success", { id: toastId });
        window.location.href = res?.data?.data;
      } else {
        toast.error("Item Purchase Failed", { id: toastId });
      }
    } catch (error) {
      toast.error("Error while purchasing item", { id: toastId });
      console.error(error);
    }
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div
            className="bg-white rounded-xl w-[98%] md:w-[70%] lg:w-[70%] max-h-[90vh] overflow-y-auto p-4 md:p-6 relative transform transition-all duration-300 ease-out scale-95 opacity-0"
            style={{
              animation: "modalEnter 0.3s ease-out forwards",
            }}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
            >
              <svg
                className="md:w-6 md:h-6 w-4 h-4 cursor-pointer"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Modal Content */}
            <div className="w-full mx-auto px-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5  mx-auto">
                {/* Product Image */}
                <div className="img">
                  <div className="img-box h-full max-lg:mx-auto">
                    <Image
                      width={500}
                      height={500}
                      src={item?.image}
                      alt={item?.name}
                      className="max-h-[400px] object-cover shadow-sm rounded-lg"
                    />
                    {/* Available/Sold Badge */}
                    <span
                      className={`absolute top-2 left-2 px-3 py-1 rounded-full text-sm font-medium ${
                        item?.status === "sold"
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {item?.status === "sold" ? "Sold" : "Available"}
                    </span>
                  </div>
                </div>

                {/* Product Details */}
                <div className=" w-full  xl:justify-start justify-center flex items-center ">
                  <div className=" w-full">
                    <div className="flex justify-between">
                      {/* Category */}
                      <p className="text-lg font-medium   text-indigo-600  ">
                        #{item?.category || "Uncategorized"}
                      </p>
                      {/* Location */}
                      <div className="flex items-center mr-8 text-sm text-gray-500  ">
                        <FaLocationDot className="w-5 h-5 mr-1.5 text-gray-400" />
                        <span>{item?.location}</span>
                      </div>
                    </div>

                    {/* Product Name */}
                    <h2 className=" font-semibold text-lg md:text-3xl leading-10 text-gray-900 mb-2 capitalize">
                      {item?.name}
                    </h2>

                    {/* Price and Condition */}
                    <div className="flex  items-center mb-6">
                      <h6 className=" font-bold text-xl md:text-2xl leading-9 text-gray-900 pr-5 sm:border-r border-gray-200 mr-5">
                        ${item?.price}
                      </h6>
                      <span className="text-sm bg-green-100 text-green-800 px-2.5 py-1 rounded-full font-medium mt-2 sm:mt-0">
                        {item?.condition}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-500 text-base font-normal mb-5">
                      {item?.description}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                      {/* Save Button */}
                      <button className="group transition-all cursor-pointer duration-500 p-4 rounded-full bg-indigo-50 hover:bg-indigo-100 hover:shadow-sm hover:shadow-indigo-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="26"
                          height="26"
                          viewBox="0 0 26 26"
                          fill="none"
                        >
                          <path
                            d="M4.47084 14.3196L13.0281 22.7501L21.9599 13.9506M13.0034 5.07888C15.4786 2.64037 19.5008 2.64037 21.976 5.07888C24.4511 7.5254 24.4511 11.4799 21.9841 13.9265M12.9956 5.07888C10.5204 2.64037 6.49824 2.64037 4.02307 5.07888C1.54789 7.51738 1.54789 11.4799 4.02307 13.9184M4.02307 13.9184L4.04407 13.939M4.02307 13.9184L4.46274 14.3115"
                            stroke="#4F46E5"
                            strokeWidth="1.6"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>

                      {/* Buy Now Button */}
                      {item?.status === "sold" ? (
                        <button className="text-center cursor-not-allowed w-full   px-5 py-3 rounded-[100px] bg-red-600 flex items-center justify-center font-semibold text-lg text-white shadow-sm transition-all duration-500 hover:bg-red-700 hover:shadow-red-400">
                          Sold Out
                        </button>
                      ) : (
                        <button
                          onClick={handlePurchase}
                          className="text-center w-full cursor-pointer px-5 py-3 rounded-[100px] bg-indigo-600 flex items-center justify-center font-semibold text-lg text-white shadow-sm transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-400"
                        >
                          Buy Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Animation Keyframes */}
      <style>
        {`
          @keyframes modalEnter {
            0% {
              transform: scale(0.95);
              opacity: 0;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}
      </style>
    </>
  );
};

export default ItemDetailsModal;
