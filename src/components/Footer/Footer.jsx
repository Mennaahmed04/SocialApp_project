import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          {/* Logo Section */}
          <div className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <i className="fa-solid fa-share-nodes text-blue-600 text-2xl"></i>
            <span className="self-center text-xl font-bold whitespace-nowrap dark:text-white">
              SocialApp
            </span>
          </div>

          {/* Links Section */}
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">About</a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Contact</a>
            </li>
          </ul>
        </div>

        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />

        {/* Bottom Section */}
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © {new Date().getFullYear()}{" "}
            <a href="https://github.com/Mennaahmed04" className="hover:underline">
              Menna Ahmed™
            </a>
            . All Rights Reserved.
          </span>
          
          {/* Social Icons */}
          <div className="flex mt-4 sm:justify-center sm:mt-0 space-x-5 rtl:space-x-reverse">
            <a href="#" className="text-gray-500 hover:text-blue-600 dark:hover:text-white transition-colors">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-400 dark:hover:text-white transition-colors">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-500 hover:text-pink-600 dark:hover:text-white transition-colors">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
              <i className="fa-brands fa-github"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}