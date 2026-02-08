import React, { useState, useContext } from "react";
import { authContext } from "../../../context/auth.context";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginScheme } from "../../../libarary/schemes/login.scheme";
import toast, { Toaster } from "react-hot-toast";
import { loginUser } from "../../../apis/auth/login.auth";

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const { setLogin } = useContext(authContext);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginScheme),
    defaultValues: {
      email: "",
      password: "",
    }
  });

  async function onSubmit(data) {
    setLoading(true);
    try {
      const res = await loginUser(data);
      if (res?.message === 'success') {
        setLoading(false);
        localStorage.setItem('token', res?.token);
        setLogin(res?.token);
        navigate('/home');
        toast.success("Welcome back!");
      }
    } catch (error) {
      toast.error(error?.response?.data?.error || "Login failed");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen dark:bg-gray-800 transition-colors duration-300 py-5 px-0 flex items-center justify-center">
      <form className="w-full max-w-lg mx-auto bg-white dark:bg-gray-900 p-10 rounded-xl shadow-2xl" onSubmit={handleSubmit(onSubmit)}>
        
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">Login</h2>

        {/* حقل الإيميل */}
        <div className="relative z-0 w-full mb-8 group">
          <input
            type="email"
            id="floating_email"
            {...register("email")}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_email"
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
          {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
        </div>

        {/* حقل الباسورد */}
        <div className="relative z-0 w-full mb-2 group">
          <input
            type="password"
            id="floating_password"
            {...register("password")}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_password"
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
          {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
        </div>

        {/* --- زر تغيير كلمة السر (رابط فرعي) --- */}
        <div className="flex justify-end mb-6">
          <Link 
            to="/changepassword" 
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Change Password?
          </Link>
        </div>

        {/* زر الدخول */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-all"
        >
          {isLoading ? <i className="fa-solid fa-spin fa-spinner"></i> : "Login"}
        </button>

        <div className="text-center mt-4">
          <p className="text-gray-600 dark:text-gray-400">
            Do not have an account?{" "}
            <Link to={"/register"} className="text-blue-600 dark:text-blue-500 hover:underline font-semibold">
              Register Now
            </Link>
          </p>
        </div>
      </form>
      <Toaster />
    </div>
  );
}