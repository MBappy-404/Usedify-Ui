"use client";
import { useCreateUserMutation } from "@/redux/features/auth/authApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaUser,
} from "react-icons/fa";
import { toast } from "sonner";

type SignUpFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

const SignUpPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormData>();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [createUser] = useCreateUserMutation();
  const router = useRouter()
  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    const toastId = toast.loading("Creating user");
    const userDta = {
      ...data,
      name: data.firstName + " " + data.lastName,
    };
    const res = await createUser(userDta).unwrap();
    if (res.success) {
      toast.success("Registration successfully", {
        id: toastId,
        duration: 2000,
      });
      router.push('/login')
    } else {
      toast.error("Registration failed", { id: toastId });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-700 p-2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl   transition-all  "
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Create Your Account
        </h2>

        {/* First Name and Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="firstName"
            >
              First Name
            </label>
            <div className="relative">
              <input
                {...register("firstName", {
                  required: "First Name is required",
                })}
                type="text"
                id="firstName"
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="John"
              />
              <FaUser className="absolute left-3 top-4.5 text-gray-400" />
            </div>
            {errors.firstName && (
              <p className="text-red-500 text-xs italic mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <div className="relative">
              <input
                {...register("lastName", { required: "Last Name is required" })}
                type="text"
                id="lastName"
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Doe"
              />
              <FaUser className="absolute left-3 top-4.5 text-gray-400" />
            </div>
            {errors.lastName && (
              <p className="text-red-500 text-xs italic mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        {/* Email and Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                id="email"
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="john.doe@example.com"
              />
              <FaEnvelope className="absolute left-3 top-4.5 text-gray-400" />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs italic mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Phone Number
            </label>
            <div className="relative">
              <input
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{11}$/,
                    message: "Invalid phone number",
                  },
                })}
                type="tel"
                id="phone"
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="1234567890"
              />
              <FaPhone className="absolute left-3 top-4.5 text-gray-400" />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-xs italic mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        {/* Password and Confirm Password */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Password"
              />
              <FaLock className="absolute left-3 top-4.5 text-gray-400" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs italic mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                className="w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Confirm Password"
              />
              <FaLock className="absolute left-3 top-4.5 text-gray-400" />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs italic mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="w-full md:w-1/2 cursor-pointer bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all"
          >
            Sign Up
          </button>
        </div>
        <div className=" text-gray-500 mt-1 text-center">
          <span>
             Already have account? 
            <span className=" font-medium text-purple-600 ml-1">
              
              <Link href={"/login"}>Login</Link> 
            </span>
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
