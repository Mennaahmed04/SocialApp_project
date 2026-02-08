import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { registerScheme } from "../../../libarary/schemes/register.scheme";
import AlertMessage from "../../Navbar/AlertMessage";
import { Link } from "react-router-dom";
import { addUser } from "../../../apis/auth/register.auth";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerScheme),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
  });

  async function onSubmit(formData) {
    setLoading(true);
    try {
      const res = await addUser(formData);
      if (res?.message === "success") {
        setLoading(false);
        toast.success("User added successfully");
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.error || "Registration failed");
      setLoading(false);
    }
  }

  // كلاس موحد للمدخلات (Inputs) لتقليل تكرار الكود ودعم الدارك مود
  const inputClass = "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-colors";
  
  // كلاس موحد للعناوين (Labels)
  const labelClass = "absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 transition-all";

  return (
    <div className="min-h-screen py-10 transition-colors duration-300 dark:bg-gray-800 ">
      <form 
        className="max-w-md mx-auto bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md transition-colors" 
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white text-center">Create Account</h2>

        {/* Name Field */}
        <div className="relative z-0 w-full mb-6 group">
          <input
            {...register("name")}
            type="text"
            id="floating_name"
            className={inputClass}
            placeholder=" "
          />
          <label htmlFor="floating_name" className={labelClass}>Name</label>
          {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>}
        </div>

        {/* Email Field */}
        <div className="relative z-0 w-full mb-6 group">
          <input
            {...register("email")}
            type="email"
            id="floating_email"
            className={inputClass}
            placeholder=" "
          />
          <label htmlFor="floating_email" className={labelClass}>Email address</label>
          {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>}
        </div>

        {/* Password Field */}
        <div className="relative z-0 w-full mb-6 group">
          <input
            {...register("password")}
            type="password"
            id="floating_password"
            className={inputClass}
            placeholder=" "
          />
          <label htmlFor="floating_password" className={labelClass}>Password</label>
          {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password.message}</p>}
        </div>

        {/* Confirm Password Field */}
        <div className="relative z-0 w-full mb-6 group">
          <input
            {...register("rePassword")}
            type="password"
            id="floating_repeat_password"
            className={inputClass}
            placeholder=" "
          />
          <label htmlFor="floating_repeat_password" className={labelClass}>Confirm password</label>
          {errors.rePassword && <p className="text-red-600 text-xs mt-1">{errors.rePassword.message}</p>}
        </div>

        {/* Date of Birth Field */}
        <div className="relative z-0 w-full mb-6 group">
          <input
            {...register("dateOfBirth")}
            type="date"
            id="floating_date"
            className={`${inputClass} dark:[color-scheme:dark]`} // color-scheme:dark تجعل أيقونة التقويم تظهر باللون الأبيض
            placeholder=" "
          />
          <label htmlFor="floating_date" className={labelClass}>Date of Birth</label>
          {errors.dateOfBirth && <p className="text-red-600 text-xs mt-1">{errors.dateOfBirth.message}</p>}
        </div>

        {/* Gender Selection */}
        <div className="mb-6">
          <span className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Gender:</span>
          <div className="flex gap-4">
            <div className="flex items-center">
              <input
                {...register("gender")}
                id="female"
                type="radio"
                value="female"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor="female" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer">Female</label>
            </div>
            <div className="flex items-center">
              <input
                {...register("gender")}
                id="male"
                type="radio"
                value="male"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor="male" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer">Male</label>
            </div>
          </div>
          {errors.gender && <p className="text-red-600 text-xs mt-1">{errors.gender.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          {isLoading ? (
            <i className="fa-solid fa-spin fa-spinner"></i>
          ) : (
            "Register"
          )}
        </button>

        <p className="mt-6 text-sm text-center text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link to={"/"} className="text-blue-600 dark:text-blue-500 hover:underline font-semibold">
            Login
          </Link>
        </p>
      </form>
      <Toaster />
    </div>
  );
}