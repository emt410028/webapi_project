import { createContext, useContext, useState, useEffect } from "react";

// 建立一個 AuthContext，預設值為 null
const AuthContext = createContext(null);

// 提供 Auth 狀態的元件
export function AuthProvider({ children }) {
  // 從 localStorage 取得 access_token 作為初始值
  const [token, setToken] = useState(() => localStorage.getItem("access_token"));

  // 當 token 改變時，同步更新到 localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("access_token", token);
    } else {
      localStorage.removeItem("access_token");
    }
  }, [token]);

  // 將 token 和 setToken 透過 Context 提供給子元件
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

// 自訂 hook，方便取得 AuthContext 的值
export function useAuth() {
  return useContext(AuthContext);
}