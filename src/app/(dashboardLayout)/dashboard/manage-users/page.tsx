"use client";
import { useDeactivedUserMutation } from "@/redux/features/adminAction/adminAction";
import { useGetAllUserQuery } from "@/redux/features/user/userApi";
import { TUser } from "@/types";
import React, { useState } from "react";
import { toast } from "sonner";
import { FiLoader } from "react-icons/fi"; // Import loading spinner icon

const ManageUsers = () => {
  // Fetch user data
  const { data, isLoading, isError, refetch } = useGetAllUserQuery(undefined);
  const [deactiveUser] = useDeactivedUserMutation();

  // Handle deactivate/activate user
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

  return (
    <div className="px-4 md:px-8 min-h-screen bg-gray-50 py-12">
      <h1 className="text-3xl font-bold text-gray-800">Manage Users</h1>

      {/* Table Wrapper */}
      <div className="mt-10 rounded-2xl overflow-x-auto border-[3px] border-gray-200 bg-white  ">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-4 px-6 text-left text-gray-600 font-medium">NO</th>
              <th className="py-4 px-6 text-left text-gray-600 font-medium">NAME</th>
              <th className="py-4 px-6 text-left text-gray-600 font-medium">EMAIL</th>
              <th className="py-4 px-6 text-left text-gray-600 font-medium">ROLE</th>
              <th className="py-4 px-6 text-left text-gray-600 font-medium">STATUS</th>
              <th className="py-4 px-6 text-left text-gray-600 font-medium">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {/* Loading State */}
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

            {/* Error State */}
            {isError && (
              <tr>
                <td colSpan={6} className="py-8 text-center text-red-600">
                  Failed to load users. Please try again later.
                </td>
              </tr>
            )}

            {/* Empty State */}
            {!isLoading && !isError && data?.data?.length === 0 && (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}

            {/* Data Rows */}
            {!isLoading &&
              !isError &&
              data?.data?.map((user: TUser, index: number) => (
                <tr
                  key={user._id}
                  className="border-b border-gray-200  transition-colors"
                >
                  <td className="py-4 px-6">{index + 1}</td>
                  <td className="py-4 px-6">{user.name}</td>
                  <td className="py-4 px-6">{user.email}</td>
                  <td className="py-4 px-6 capitalize">{user.role}</td>
                  <td className="py-4 px-6">
                    <button
                      className={`w-[80px] py-1 text-sm rounded-full ${
                        user?.status === "deactive"
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {user?.status === "deactive" ? "Banned" : "Active"}
                    </button>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => handleDeactivate(user._id)}
                      className={`w-[100px] py-1 text-sm font-medium rounded-full cursor-pointer    transition-colors ${
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
    </div>
  );
};

export default ManageUsers;