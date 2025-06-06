"use client";
import React, { useState } from "react";
import { useDeactivedUserMutation } from "@/redux/features/adminAction/adminAction";
import { useGetAllUserQuery } from "@/redux/features/user/userApi";
import { TUser } from "@/types";
import { toast } from "sonner";
import { FiLoader, FiUser, FiMail, FiShield, FiAlertCircle } from "react-icons/fi";

const ITEMS_PER_PAGE = 10;

const ManageUsers = () => {
  const { data, isLoading, isError, refetch } = useGetAllUserQuery(undefined);
  const [deactiveUser] = useDeactivedUserMutation();
  const [currentPage, setCurrentPage] = useState(1);

  const handleDeactivate = async (id: string) => {
    const toastId = toast.loading("Updating user status...");
    const res = await deactiveUser({ userId: id });

    if (res?.data?.success) {
      toast.success("User status updated successfully", { id: toastId });
      refetch();
    } else {
      toast.error("Failed to update user status", {
        id: toastId,
      });
    }
  };

  const users = data?.data || [];
  const totalItems = users.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const paginatedUsers = users.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Manage Users</h1>

      {/* Mobile View - Card Layout */}
      <div className="lg:hidden space-y-4">
        {isLoading && (
          <div className="flex justify-center items-center py-8">
            <FiLoader className="w-6 h-6 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">Loading users...</span>
          </div>
        )}

        {isError && (
          <div className="text-center py-8">
            <div className="text-red-600 flex items-center justify-center">
              <FiAlertCircle className="w-5 h-5 mr-2" />
              Failed to load users. Please try again later.
            </div>
          </div>
        )}

        {!isLoading && !isError && data?.data?.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No users found.
          </div>
        )}

        {!isLoading &&
          !isError &&
          data?.data?.map((user: TUser, index: number) => (
            <div
              key={user._id}
              className="bg-white rounded-xl shadow-sm p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <FiUser className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{user.name}</h3>
                    <p className="text-sm text-gray-500">#{index + 1}</p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    user?.status === "deactive"
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {user?.status === "deactive" ? "Banned" : "Active"}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <FiMail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FiShield className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600 capitalize">{user.role}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => handleDeactivate(user._id)}
                  className={`w-full py-2 text-sm font-medium rounded-lg cursor-pointer transition-colors ${
                    user.status === "deactive"
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : "bg-red-500 text-white hover:bg-red-600"
                  }`}
                >
                  {user.status === "deactive" ? "Unban User" : "Ban User"}
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Desktop View - Table Layout */}
      <div className="hidden lg:block">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <tr>
                  <th scope="col" className="py-3.5 px-4 text-left text-sm font-bold text-gray-700 whitespace-nowrap">NO</th>
                  <th scope="col" className="py-3.5 px-4 text-left text-sm font-bold text-gray-700 whitespace-nowrap">NAME</th>
                  <th scope="col" className="py-3.5 px-4 text-left text-sm font-bold text-gray-700 whitespace-nowrap">EMAIL</th>
                  <th scope="col" className="py-3.5 px-4 text-left text-sm font-bold text-gray-700 whitespace-nowrap">ROLE</th>
                  <th scope="col" className="py-3.5 px-4 text-left text-sm font-bold text-gray-700 whitespace-nowrap">STATUS</th>
                  <th scope="col" className="py-3.5 px-4 text-left text-sm font-bold text-gray-700 whitespace-nowrap">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {isLoading && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center">
                      <div className="flex justify-center items-center">
                        <FiLoader className="w-6 h-6 animate-spin text-blue-600" />
                        <span className="ml-2 text-gray-600">Loading users...</span>
                      </div>
                    </td>
                  </tr>
                )}

                {isError && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center">
                      <div className="text-red-600 flex items-center justify-center">
                        <FiAlertCircle className="w-5 h-5 mr-2" />
                        Failed to load users. Please try again later.
                      </div>
                    </td>
                  </tr>
                )}

                {!isLoading && !isError && paginatedUsers.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-gray-500">
                      No users found.
                    </td>
                  </tr>
                )}

                {!isLoading &&
                  !isError &&
                  paginatedUsers.map((user: TUser, index: number) => (
                    <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 text-sm text-gray-900">{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{user.name}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{user.email}</td>
                      <td className="py-3 px-4 text-sm text-gray-900 capitalize">{user.role}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user?.status === "deactive"
                              ? "bg-red-100 text-red-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {user?.status === "deactive" ? "Banned" : "Active"}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleDeactivate(user._id)}
                          className={`px-3 py-1.5 text-sm font-medium rounded-full cursor-pointer transition-colors ${
                            user.status === "deactive"
                              ? "bg-green-500 text-white hover:bg-green-600"
                              : "bg-red-500 text-white hover:bg-red-600"
                          }`}
                        >
                          {user.status === "deactive" ? "Unban" : "Ban"}
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {/* Pagination Controls (Bottom, premium look) */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 py-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-gray-100">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg font-semibold bg-white text-blue-600 border border-blue-100 shadow-sm hover:bg-blue-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Prev
              </button>
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`px-4 py-2 rounded-lg font-semibold border shadow-sm transition-all duration-200
                    ${currentPage === idx + 1
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-600 shadow-md'
                      : 'bg-white text-blue-700 border-blue-100 hover:bg-blue-50'}`}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg font-semibold bg-white text-blue-600 border border-blue-100 shadow-sm hover:bg-blue-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;