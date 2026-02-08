import React from 'react'

export default function Loading() {
  return (
    /* أضفنا dark:bg-[#18191a] لتغطية الشاشة باللون الغامق أثناء التحميل */
    <div className="h-screen w-full flex justify-center items-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        
        {/* أضفنا dark:text-white للأيقونة عشان تبان في الضلمة */}
        <i className='fa-solid fa-3x fa-spin fa-spinner text-blue-600 dark:text-white'></i>
        
    </div>
  )
}