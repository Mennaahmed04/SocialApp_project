import React from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from '@tanstack/react-query';
import { changePasswordApi } from './apis/auth/user.api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function ChangePassword() {
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: changePasswordApi,
    onSuccess: () => {
      toast.success("Password changed successfully! Please login again.");
      localStorage.removeItem("token"); // بنمسح التوكن عشان يدخل بالجديدة
      navigate("/");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Check your old password");
    }
  });

  const formik = useFormik({
    initialValues: {
      password: '',
      newPassword: '',
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Old password is required"),
      newPassword: Yup.string()
        .min(6, "At least 6 characters")
        .required("New password is required"),
    }),
    onSubmit: (values) => {
      mutate(values);
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">Change Password</h2>
        
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium dark:text-gray-300">Old Password</label>
            <input
              name="password"
              type="password"
              className="w-full p-2 border rounded mt-1 dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
              {...formik.getFieldProps('password')}
            />
            {formik.touched.password && formik.errors.password && <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium dark:text-gray-300">New Password</label>
            <input
              name="newPassword"
              type="password"
              className="w-full p-2 border rounded mt-1 dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
              {...formik.getFieldProps('newPassword')}
            />
            {formik.touched.newPassword && formik.errors.newPassword && <p className="text-red-500 text-xs mt-1">{formik.errors.newPassword}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 transition-colors disabled:bg-gray-400"
          >
            {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}