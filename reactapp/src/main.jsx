import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './index.css'
import Home from "./pages/Home";
import About from "./pages/About";
import Layout from "./pages/Layout";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes >
      <Route element={<Layout />}> {/* 共用 Navbar 的外層版型 */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path='*'
          element={
                  <main >
                        <p>There's nothing here!</p>
                  </main>
                  }
        />
      </Route>
        
    </Routes>

  </BrowserRouter>
);