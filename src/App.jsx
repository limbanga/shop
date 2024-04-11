import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import MainLayout from "./pages/MainLayout";
import HomePage from "./pages/HomePage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import AdminLayout from "./pages/admin/AdminLayout";
import { DashBoardPage } from "./pages/admin/DashBoardPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import { AdminProductDetailPage } from "./pages/admin/AdminProductDetailPage";
import NoPage from "./pages/errors/NoPage";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            {/* auth */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {/* ... */}
            <Route
              path="/product/:productSlug"
              element={<ProductDetailPage />}
            />
            <Route path="*" element={<NoPage />} />
          </Route>
          <Route path="/admin/" element={<AdminLayout />}>
            <Route index element={<DashBoardPage />} />
            <Route path="product/:id" element={<AdminProductDetailPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
