"use client";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import {
  useGetAllProductsQuery,
  useUpdateProductMutation,
} from "@/redux/features/Item/itemApi";
import { useSalesHistoryQuery } from "@/redux/features/transactions/transactionsApi";
import { useAppSelector } from "@/redux/hooks";
import { TOrder, TProduct } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import {
  FiCheckCircle,
  FiDollarSign,
  FiEye,
  FiTag,
  FiLoader,
  FiXCircle,
  FiPackage,
  FiDatabase,
  FiAlertCircle,
} from "react-icons/fi";
import { toast } from "sonner";

// pages/dashboard/sales.js
export default function SalesTracking() {
  const user = useAppSelector(selectCurrentUser);
  const { data, isLoading, isError, refetch } = useSalesHistoryQuery({
    userId: user?.id,
  });
  const { data: products } = useGetAllProductsQuery(undefined);
  const router = useRouter();
  const filteredItems = products?.data?.filter(
    (product: TProduct) => product?.userId?._id === user?.id
  );
  const [updateItem] = useUpdateProductMutation();
  // Format amount with currency
  const formatAmount = (amount: number) => {
    return `${amount.toFixed(2)}`;
  };

  // Get status color based on status
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Calculate total earnings
  const totalEarnings =
    data?.data?.reduce(
      (sum: number, transaction: TOrder) => sum + transaction.totalPrice,
      0
    ) || 0;

  // Calculate active listings (example: assume 24 for now)
  const activeListings = filteredItems?.length || 0;

  // Calculate items sold
  const itemsSold = data?.data?.length || 0;

  // Calculate total views (example: assume 2800 for now)
  const totalViews = 100;

  const handleMarkItem = async (item: TOrder) => {
    const toastId = toast.loading("Updating Item....");
    const itemInfo = item?.products?.map((product) => product?.product)?.[0];
    const product = {
      ...itemInfo,
      status: "sold",
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(product));

    const res = await updateItem({ productId: itemInfo?._id, formData });

    if (!res?.data?.success) {
      toast.error("Failed to update item! Contact admin", { id: toastId });
      router.refresh();
    } else {
      toast.success(res?.data?.message, { id: toastId });
      refetch();
      router.refresh();
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen mx-auto px-4 lg:px-8 py-6 lg:py-12">
      <h1 className="text-2xl lg:text-3xl font-bold mb-6 lg:mb-8">Sales Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
        <DashboardCard
          title="Total Earnings"
          value={formatAmount(totalEarnings)}
          icon={<FiDollarSign />}
          color="bg-green-100"
        />
        <DashboardCard
          title="Active Listings"
          value={activeListings}
          icon={<FiTag />}
          color="bg-blue-100"
        />
        <DashboardCard
          title="Items Sold"
          value={itemsSold}
          icon={<FiCheckCircle />}
          color="bg-purple-100"
        />
        <DashboardCard
          title="Total Views"
          value={`${totalViews}`}
          icon={<FiEye />}
          color="bg-orange-100"
        />
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
        <h3 className="text-lg lg:text-xl font-semibold mb-4">Recent Transactions</h3>
        
        {/* Mobile Card View */}
        <div className="lg:hidden space-y-4">
          {isLoading && (
            <div className="py-6 text-center">
              <div className="flex justify-center items-center">
                <FiLoader className="w-5 h-5 animate-spin text-blue-600" />
                <span className="ml-2 text-sm text-gray-600">
                  Loading transactions...
                </span>
              </div>
            </div>
          )}

          {isError && (
            <div className="py-6 text-center">
              <div className="text-red-600 flex items-center justify-center">
                <FiAlertCircle className="w-4 h-4 mr-2" />
                Failed to load data. Please try again later.
              </div>
            </div>
          )}

          {!isLoading && !isError && data?.data?.length === 0 && (
            <div className="py-6 text-center text-gray-500">
              <div className="flex items-center justify-center">
                <FiDatabase className="w-4 h-4 mr-2" />
                No transactions found.
              </div>
            </div>
          )}

          {!isLoading &&
            !isError &&
            data?.data?.map((transaction: TOrder) => (
              <div key={transaction._id} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
                    <Image
                      src={transaction?.products?.map((item) => item.product?.image)?.[0]}
                      alt="sales image"
                      width={500}
                      height={500}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">
                      {transaction?.products?.map((item) => item.product?.name).join(", ").slice(0, 30)}
                    </h4>
                    <p className="text-sm text-gray-500">Buyer: {transaction.buyer?.name}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                  <div>
                    <p className="text-gray-500">Date</p>
                    <p className="text-gray-900">
                      {transaction?.createdAt
                        ? new Date(transaction.createdAt).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Amount</p>
                    <p className="text-gray-900 font-semibold">
                      {formatAmount(transaction.totalPrice)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      transaction.status
                    )}`}
                  >
                    {transaction?.status}
                  </span>
                  {transaction?.products?.map(
                    (item) => item.product?.status === "sold"
                  )?.[0] ? (
                    <button className="px-2 py-1 cursor-not-allowed bg-red-50 text-red-700 rounded-full text-xs hover:bg-red-100 transition-colors flex items-center">
                      Sold out
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMarkItem(transaction)}
                      className="px-2 py-1 cursor-pointer bg-green-50 text-green-700 rounded-full text-xs hover:bg-green-100 transition-colors flex items-center"
                    >
                      <FiTag className="w-3 h-3 mr-1" />
                      Mark as Sold
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto border-[3px] border-gray-200 rounded-2xl">
          <table className="w-full rounded-t-2xl overflow-hidden shadow-sm">
            <thead className="bg-gray-100">
              <tr className="text-left text-gray-600">
                <th className="px-6 py-4 text-lg font-medium">ITEM</th>
                <th className="px-6 py-4 text-lg font-medium">BUYER</th>
                <th className="px-6 py-4 text-lg font-medium">DATE</th>
                <th className="px-6 py-4 text-lg font-medium">AMOUNT</th>
                <th className="px-6 py-4 text-lg font-medium">STATUS</th>
                <th className="px-6 py-4 text-lg font-medium">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading && (
                <tr>
                  <td colSpan={6} className="py-8 text-center">
                    <div className="flex justify-center items-center">
                      <FiLoader className="w-6 h-6 animate-spin text-blue-600" />
                      <span className="ml-2 text-base text-gray-600">
                        Loading transactions...
                      </span>
                    </div>
                  </td>
                </tr>
              )}

              {isError && (
                <tr>
                  <td colSpan={6} className="py-8 text-center">
                    <div className="text-red-600 flex items-center justify-center">
                      <FiAlertCircle className="w-5 h-5 mr-2" />
                      Failed to load data. Please try again later.
                    </div>
                  </td>
                </tr>
              )}

              {!isLoading && !isError && data?.data?.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500">
                    <div className="flex items-center justify-center">
                      <FiDatabase className="w-5 h-5 mr-2" />
                      No transactions found.
                    </div>
                  </td>
                </tr>
              )}

              {!isLoading &&
                !isError &&
                data?.data?.map((transaction: TOrder) => (
                  <tr key={transaction._id} className="transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center">
                          <Image
                            src={transaction?.products?.map((item) => item.product?.image)?.[0]}
                            alt="sales image"
                            width={500}
                            height={500}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                        <div className="ml-4">
                          <p className="text-gray-900 font-medium">
                            {transaction?.products?.map((item) => item.product?.name).join(", ").slice(0, 15)}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-900">{transaction.buyer?.name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-900">
                        {transaction?.createdAt
                          ? new Date(transaction.createdAt).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-900 font-semibold">
                        {formatAmount(transaction.totalPrice)}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          transaction.status
                        )}`}
                      >
                        {transaction?.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        {transaction?.products?.map(
                          (item) => item.product?.status === "sold"
                        )?.[0] ? (
                          <button className="px-3 py-1 cursor-not-allowed bg-red-50 text-red-700 rounded-full text-sm hover:bg-red-100 transition-colors flex items-center">
                            Sold out
                          </button>
                        ) : (
                          <button
                            onClick={() => handleMarkItem(transaction)}
                            className="px-3 py-1 cursor-pointer bg-green-50 text-green-700 rounded-full text-sm hover:bg-green-100 transition-colors flex items-center"
                          >
                            <FiTag className="w-4 h-4 mr-1" />
                            Mark as Sold
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const DashboardCard = ({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: string | number;
  icon: ReactNode;
  color: string;
}) => (
  <div className={`${color} p-4 lg:p-6 rounded-xl flex items-center justify-between`}>
    <div>
      <p className="text-sm lg:text-base text-gray-600 mb-1">{title}</p>
      <p className="text-xl lg:text-2xl font-bold">{value}</p>
    </div>
    <div className="text-2xl lg:text-3xl p-3 lg:p-4 bg-white rounded-lg">{icon}</div>
  </div>
);
