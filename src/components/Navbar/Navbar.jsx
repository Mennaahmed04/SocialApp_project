import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import SplitText from "../../uitlities/text";
import { authContext } from "../../context/auth.context";
import { getLoggedUserData } from "../../apis/auth/user.api"; // تأكدي من المسار

export default function Navbar({ changeTheme, theme }) {
  const { isLogin, setLogin } = useContext(authContext);
  const [isOpen, setOpen] = useState(true);
  const navigate = useNavigate();

  // جلب بيانات المستخدم لعرض الصورة الشخصية
  const { data: userData } = useQuery({
    queryKey: ["loggedUser"],
    queryFn: getLoggedUserData,
    enabled: !!isLogin, // لا يتم الطلب إلا إذا كان المستخدم مسجلاً
  });

  const userPhoto = userData?.user?.photo;

  function handleLogOut() {
    localStorage.removeItem("token");
    setLogin(null);
    navigate("/");
  }

  function handleToggle() {
    setOpen(!isOpen);
  }

  return (
    <div className="sticky top-0 z-50 transition-colors duration-300">
      <nav className="bg-white border-b border-gray-100 dark:bg-gray-800 dark:border-gray-800 shadow-sm">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          
          {/* Logo */}
          <NavLink to={"/home"} className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-blue-600 text-2xl font-semibold whitespace-nowrap dark:text-white">
              <SplitText
                text="Social App"
                className="text-2xl font-semibold text-center"
                delay={100}
                duration={0.6}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="center"
              />
            </span>
          </NavLink>

          {/* Mobile Menu Button */}
          <button
            onClick={handleToggle}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>

          <div className={`${isOpen && "hidden"} w-full md:block md:w-auto`} id="navbar-default">
            <ul className="font-medium flex flex-col items-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-[#242526] md:dark:bg-transparent dark:border-gray-700">
              
              {isLogin ? (
                <>
                 
                  {/* --- الجزء المعدل: صورة البروفايل بدلاً من الكلمة --- */}
                  <li>
                    <NavLink
                      to="/profile"
                      className={({ isActive }) => 
                        `block transition-all ${isActive ? 'ring-2 ring-blue-600 rounded-full p-[2px]' : 'hover:scale-105'}`
                      }
                    >
                      {userPhoto ? (
                        <img 
                          src={userPhoto} 
                          alt="Profile" 
                          className="w-9 h-9 rounded-full object-cover border border-gray-200 dark:border-gray-600"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          <i className="fa-solid fa-user text-gray-400"></i>
                        </div>
                      )}
                    </NavLink>
                  </li>
                   <li>
  <NavLink
    to="/changepassword"
    className={({ isActive }) => 
      `block py-2 px-3 transition-colors ${isActive ? 'text-blue-500' : 'text-black dark:text-gray-300'}`
    }
    title="Change Password"
  >
    <i className="fa-solid fa-user-shield hover:text-green-500 text-lg animate-hover-spin"></i>
  </NavLink>
</li>
                  {/* Logout Button */}
                  <li
                    onClick={handleLogOut}
                    className="block cursor-pointer py-2 dark:text-gray-300 px-3 hover:text-red-600 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-700 md:p-0 transition-colors"
                    title="Logout"
                  >
                    <i className="fa-solid fa-right-from-bracket text-lg"></i>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink to="/" className="block py-2 px-3 text-blue-600 rounded-sm md:p-0 dark:text-gray-300 font-bold">Login</NavLink>
                  </li>
                  <li>
                    <NavLink to="/register" className="block py-2 px-3 text-blue-600 rounded-sm md:p-0 dark:text-gray-300 font-bold">Register</NavLink>
                  </li>
                </>
              )}

              {/* Dark Mode Toggle */}
              <li className="flex items-center py-2 md:py-0">
                <label className="inline-flex items-center cursor-pointer group">
                  <div className="relative">
                    <input type="checkbox" checked={theme === "dark"} onChange={changeTheme} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-300 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </div>
                  <span className="ms-3 text-sm font-medium">
                    {theme === "dark" ? (
                      <i className="fa-solid fa-sun text-gray-200 text-lg transition-transform hover:rotate-45"></i>
                    ) : (
                      <i className="fa-solid fa-moon text-blue-600 text-lg transition-transform hover:-rotate-12"></i>
                    )}
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}