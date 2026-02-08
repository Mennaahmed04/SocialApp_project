import { createContext, useEffect, useState } from "react";

export const authContext = createContext();

export default function AuthContextProvider({ children }) {
    const [isLogin, setLogin] = useState(localStorage.getItem("token"));

    // --- الجزء الخاص بالـ Auto Login ---
    useEffect(() => {
        // 1. بنشوف هل فيه توكن متخزن في المتصفح؟
        const token = localStorage.getItem("token");
        
        if (token) {
            // 2. لو موجود، بنحدث حالة الدخول فوراً
            setLogin(token);
        }
    }, []); // المصفوفة الفاضية دي معناها "اشتغل مرة واحدة بس أول ما الأبلكيشن يفتح"

    return (
        <authContext.Provider value={{ isLogin, setLogin }}>
            {children}
        </authContext.Provider>
    );
}