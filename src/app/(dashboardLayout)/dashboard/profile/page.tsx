"use client";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetUserQuery, useUpdateUserMutation } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
 
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaMapMarker,
  FaCheckCircle,
  FaTimesCircle,
  FaEdit,
} from "react-icons/fa";
import { toast } from "sonner";

const ProfilePage = () => {
  const user = useAppSelector(selectCurrentUser);
  const { data: userData } = useGetUserQuery({ id: user?.id });
  const [updateUser] = useUpdateUserMutation()

  // Edit mode state
  const [editMode, setEditMode] = useState(false);
  const router = useRouter()

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (userData) {
      reset({
        name: userData?.data?.name || "",
        email: userData?.data?.email || "",
        phone: userData?.data?.phone || null,
        address: userData?.data?.address || "",
      });
    }
  }, [userData, reset]);

  // Handle form submission
  const onSubmit = async(data: FieldValues) => {

    const toastId = toast.loading("Updating profile...");
      try {
        const res = await updateUser({
          id: user?.id,
          ...data,
        }).unwrap();
        if(res.success){
          toast.success("Your profile updated success", { id: toastId });
          setEditMode(false); // Exit edit mode
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error("Failed to update profile", { id: toastId });
      }
   
     
  };

  // Handle cancel edit
  const handleCancel = () => {
    router.refresh()
    setEditMode(false); // Exit edit mode
  };

  const handleUpdate : SubmitHandler<FieldValues> = async (data) => {
    
    };

  return (
    <div className=" min-h-screen bg-gray-100">
      <div className="  overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <h1 className="text-2xl md:text-3xl font-bold">Profile Settings</h1>
          <p className="text-sm md:mt-2">
            Manage your account information and settings.
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Profile Information */}
          {!editMode ? (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <FaUser className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{userData?.data?.name}</h2>
                  <p className="text-gray-600">{userData?.data?.role}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-4">
                  <FaEnvelope className="w-5 h-5 text-blue-600" />
                  <span>{userData?.data?.email}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <FaPhone className="w-5 h-5 text-blue-600" />
                  <span>{userData?.data?.phone}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <FaMapMarker className="w-5 h-5 text-blue-600" />
                  <span>{userData?.data?.address || "No address found"}</span>
                </div>
                <div className="flex items-center space-x-4">
                  {userData?.data?.status === "active" ? (
                    <FaCheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <FaTimesCircle className="w-5 h-5 text-red-600" />
                  )} 
                  <span
                    className={`font-medium capitalize ${
                      userData?.data?.status === "active"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {userData?.data?.status} Account
                  </span>
                </div>
              </div>

              <button
                onClick={() => setEditMode(true)}
                className="w-full cursor-pointer md:w-auto bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <FaEdit />
                <span>Edit Profile</span>
              </button>
            </div>
          ) : (
            // Edit Form
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-600 mb-2">Name</label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                        placeholder="Add your  name"
                      {...register("name", { required: "Name is required" })}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg outline-none border-gray-400"
                    />
                  </div>
                  {errors.name && (
                    <span className="text-red-500 text-sm">
                      {errors.name.message as string}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-gray-600 mb-2">Email</label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                        placeholder="Add your email"
                      className="w-full pl-10 pr-4 py-2 border rounded-lg outline-none border-gray-400"
                    />
                  </div>
                  {errors.email && (
                    <span className="text-red-500 text-sm">
                      {errors.email.message as string}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-gray-600 mb-2">Phone</label>
                  <div className="relative">
                    <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                        placeholder="Add your phone number"
                      {...register("phone", {
                        required: "Phone is required",
                        pattern: {
                          value:
                            /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                          message: "Invalid phone number",
                        },
                      })}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg outline-none border-gray-400"
                    />
                  </div>
                  {errors.phone && (
                    <span className="text-red-500 text-sm">
                      {errors.phone.message as string}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-gray-600 mb-2">Address</label>
                  <div className="relative">
                    <FaMapMarker className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Add your address"
                      {...register("address", {
                        required: "Address is required",
                      })}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg outline-none border-gray-400"
                    />
                  </div>
                  {errors.address && (
                    <span className="text-red-500 text-sm">
                      {errors.address.message as string}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-full md:w-auto cursor-pointer bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <FaTimesCircle />
                  <span>Cancel</span>
                </button>
                <button
                  type="submit"
                  className="w-full md:w-auto cursor-pointer bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <FaCheckCircle />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
