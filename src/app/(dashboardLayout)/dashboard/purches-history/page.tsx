"use client";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { usePurchaseHistoryQuery } from "@/redux/features/transactions/transactionsApi";
import { useAppSelector } from "@/redux/hooks";
import { TOrder } from "@/types";
import Link from "next/link";
import { FaLocationDot } from "react-icons/fa6";
import {
  FiSearch,
  FiPackage,
  FiCheckCircle,
  FiTruck,
  FiLoader,
} from "react-icons/fi";

export default function Purchases() {
  const user = useAppSelector(selectCurrentUser);
  const { data, isLoading } = usePurchaseHistoryQuery({ userId: user?.id });
  // console.log(data);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className=" mx-auto px-4 lg:px-8 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Purchase History</h1>
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search purchases..."
              className="w-full pl-10 pr-4 py-2 focus:outline-none  rounded-lg border border-gray-200"
            />
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>

        {/* Orders Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data?.data?.map((order: TOrder) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                {/* Product Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={order?.products?.[0]?.product?.image}
                      alt={"item"}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-semibold line-clamp-1">
                        {order?.products?.map((item) => item?.product?.name)}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Sold by {order?.seller?.name}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`${
                      order?.transaction?.sp_message === "Success"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    } px-3 py-1 rounded-full text-sm`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Order Timeline */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <FiCheckCircle className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Order Confirmed</p>
                      <p className="text-xs text-gray-500">
                        {order?.createdAt
                          ? new Date(order.createdAt).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <FaLocationDot className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Form</p>
                      <p className="text-xs text-gray-500">
                        {order?.products?.map(
                          (item) => item?.product?.location
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Details */}
                <div className="border-t border-gray-300 pt-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">Total Paid</p>
                      <p className="text-xl font-bold text-blue-600">
                        ${order.totalPrice}
                      </p>
                    </div>
                    <div className="space-x-3">
                      {order?.transaction?.transactionStatus === null && (
                        <Link
                          href={`/dashboard/purches-history/invoice?order_id=${order?.transaction?.id}`}
                        >
                          <button className="bg-blue-600 text-white px-4 py-2 cursor-pointer rounded-lg hover:bg-blue-700 text-sm">
                            Invoice
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {isLoading && (
          <div className="flex justify-center">
            <div className="flex justify-center items-center">
              <FiLoader className="w-8 h-8 animate-spin text-blue-600" />
              <span className="ml-2 text-base text-gray-600">
                Loading Purchase History...
              </span>
            </div>
          </div>
        )}

        {/* Empty State */}
        {data?.data?.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-block p-8 bg-white rounded-2xl shadow-sm">
              <FiPackage className="w-16 h-16 text-gray-300 mx-auto" />
              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                No Purchases Yet
              </h3>
              <p className="mt-2 text-gray-600">
                Your purchased items will appear here
              </p>
              <Link href={"/products"}>
                <button className="mt-6 cursor-pointer bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700">
                  Start Shopping
                </button>
              </Link>
            </div>
          </div>
        )}

        {/* Pagination */}
        {/* <div className="mt-8 flex justify-center gap-2">
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              className="w-10 h-10 rounded-lg bg-white border border-gray-200 hover:bg-gray-50"
            >
              {page}
            </button>
          ))}
        </div> */}
      </div>
    </div>
  );
}
