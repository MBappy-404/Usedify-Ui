"use client";
import { useGetAllUserQuery } from "@/redux/features/user/userApi";
import { useGetAllProductsQuery } from "@/redux/features/Item/itemApi";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import {
  FaUsers,
  FaBoxOpen,
  FaShoppingCart,
  FaCheckCircle,
  FaDollarSign,
} from "react-icons/fa";
import { TOrder } from "@/types";
import { useGetAllOrdersQuery } from "@/redux/features/transactions/transactionsApi";

const DashboardHome = () => {
  const { data: userData, isLoading: userLoading } =
    useGetAllUserQuery(undefined);
  const { data: productData, isLoading: productLoading } =
    useGetAllProductsQuery(undefined);
  const { data: orderData, isLoading: orderLoading } = useGetAllOrdersQuery([]);
  const user = useAppSelector(selectCurrentUser);

  // Only admin can see this page
  if (!user || user.role !== "admin") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h1>
        <p className="text-lg text-gray-600">
          You do not have permission to view this page.
        </p>
      </div>
    );
  }

  const totalUsers = userData?.data?.length || 0;
  const totalItems = productData?.data?.length || 0;
  const totalAvailable =
    productData?.data?.filter((item: any) => item.status !== "sold").length ||
    0;

  // Use only paid orders for purchases and revenue
  const paidOrders =
    orderData?.data?.filter(
      (order: any) =>
        order?.transaction?.sp_message === "Success" ||
        order?.transaction?.bank_status === "Success"
    ) || [];
  const totalPaidPurchases = paidOrders.length;
  const totalRevenue = paidOrders.reduce(
    (sum: number, order: any) => sum + (order.totalPrice || 0),
    0
  );

  // Calculate revenue from sold items
  const soldItems =
    productData?.data?.filter((item: any) => item.status === "sold") || [];
  const soldRevenue = soldItems.reduce(
    (sum: number, item: any) => sum + (item.price || 0),
    0
  );

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl shadow p-6 flex items-center gap-4">
          <div className="bg-blue-600 text-white p-4 rounded-full text-3xl">
            <FaUsers />
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-900">
              {userLoading ? "..." : totalUsers}
            </div>
            <div className="text-gray-600">Total Users</div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-indigo-100 to-indigo-50 rounded-xl shadow p-6 flex items-center gap-4">
          <div className="bg-indigo-600 text-white p-4 rounded-full text-3xl">
            <FaBoxOpen />
          </div>
          <div>
            <div className="text-2xl font-bold text-indigo-900">
              {productLoading ? "..." : totalItems}
            </div>
            <div className="text-gray-600">Total Items</div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-xl shadow p-6 flex items-center gap-4">
          <div className="bg-green-600 text-white p-4 rounded-full text-3xl">
            <FaCheckCircle />
          </div>
          <div>
            <div className="text-2xl font-bold text-green-900">
              {productLoading ? "..." : totalAvailable}
            </div>
            <div className="text-gray-600">Available Items</div>
          </div>
        </div>
    
        <div className="bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-xl shadow p-6 flex items-center gap-4">
          <div className="bg-yellow-600 text-white p-4 rounded-full text-3xl">
           <FaDollarSign/>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-900">
              {productLoading ? "..." : `$${soldRevenue.toLocaleString()}`}
            </div>
            <div className="text-gray-600">Sold Items Revenue</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
