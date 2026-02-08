import { React, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'

export default function Layout() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  function changeTheme() {
    if (theme === 'dark') {
      setTheme('light');
      document.documentElement.classList.remove('dark'); // مهم جداً عشان التيلويند يلقط
      localStorage.setItem('theme', 'light');
    } else {
      setTheme('dark');
      document.documentElement.classList.add('dark'); // بيضيف كلاس dark للـ html كله
      localStorage.setItem('theme', 'dark');
    }
  }

  // عشان لما الصفحة تعمل ريفريش يفضل محافظ على الثيم
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    /* 1. أضفنا w-full و bg متغيرة عشان تغطي الشاشة كلها */
    <div className={`${theme === "dark" ? "dark" : ""} flex flex-col min-h-screen bg-gray-50 dark:bg-[#18191a] transition-colors duration-300`}>
      
      <Navbar changeTheme={changeTheme} theme={theme}></Navbar>

      {/* 2. شيلنا كلاس "container" القاتل وحطينا w-full */}
      <div className="w-full flex-grow">
        <Outlet></Outlet>
      </div>

      <Footer></Footer>
    </div>
  );
}