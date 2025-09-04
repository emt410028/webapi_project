import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children }) {
  const token = localStorage.getItem("access_token");
  const location = useLocation();

  if (!token) {
    // 記住使用者原本要去的頁面
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}