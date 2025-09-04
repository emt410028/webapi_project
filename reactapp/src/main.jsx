import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './index.css'
import RequireAuth from "./pages/RequireAuth";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Layout from "./pages/Layout";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import { AuthProvider } from "./pages/AuthContext";



ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        {/* Layout（含 Navbar）永遠顯示 */}
        <Route element={<Layout />}>
          {/* 公開頁面 */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 受保護頁面：把元素包進 RequireAuth */}
          <Route
            index
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          
          {/* 其他受保護路由同理... */}
          {/* 捕捉所有未定義的路由 */}
          <Route path="*" element={<NotFound />} /> 
        </Route>
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);