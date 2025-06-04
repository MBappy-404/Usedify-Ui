"use client";
import { useSigninMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import { toast } from "sonner";

type SignInFormData = {
  email: string;
  password: string;
};

const SignInPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<SignInFormData>();

  const [showPassword, setShowPassword] = useState(false);
  const [login] = useSigninMutation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [selectedDemo, setSelectedDemo] = useState<null | "admin" | "user">(null);

  const setDemoCredentials = (type: "admin" | "user") => {
    setSelectedDemo(type);
    if (type === "admin") {
      setValue("email", "usedifyadmin@gmail.com");
      setValue("password", "usedifyadmin@111");
    } else {
      setValue("email", "user1@gmail.com");
      setValue("password", "123456");
    }
  };

  const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
    const toastId = toast.loading("Logining........");
    const res = await login(data);

    if (res?.data?.success) {
      toast.success("Login successfully", {
        id: toastId,
        duration: 2000,
      });

      const user = jwtDecode(res?.data?.data?.token);
      dispatch(setUser({ user: user, token: res?.data?.data?.token }));

      router.push("/");
    } else {
      toast.error("Failed to login", { id: toastId });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-700 px-2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white  p-8 rounded-2xl shadow-2xl w-full max-w-md   transition-all  "
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Welcome Back
        </h2>

        {/* Demo Credentials Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <button
            type="button"
            onClick={() => setDemoCredentials("admin")}
            className={`w-full sm:w-1/2 border transition-all font-semibold py-2 px-4 rounded-lg cursor-pointer
            ${
              selectedDemo === "admin"
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-indigo-100 hover:bg-indigo-200 text-indigo-700 border-indigo-200"
            }`}
          >
            Use Admin Demo Credentials
          </button>
          <button
            type="button"
            onClick={() => setDemoCredentials("user")}
            className={`w-full sm:w-1/2 border transition-all font-semibold py-2 px-4 rounded-lg cursor-pointer
            ${
              selectedDemo === "user"
                ? "bg-purple-600 text-white border-purple-600"
                : "bg-purple-100 hover:bg-purple-200 text-purple-700 border-purple-200"
            }`}
          >
            Use User Demo Credentials
          </button>
        </div>

        {/* Email Field */}
        <div className="mb-6">
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

        {/* Password Field */}
        <div className="mb-6">
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

        {/* Submit Button */}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="w-full cursor-pointer bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all"
          >
            Sign In
          </button>
        </div>
        <div className=" text-gray-500 mt-1">
          <span>
            Don't have any account?
            <span className=" font-medium text-purple-600 ml-1">
              <Link href={"/sign-up"}>Register</Link>
            </span>
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
