import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import MainLayout from "./pages/MainLayout";
import NoPage from "./pages/NoPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import AdminLayout from "./pages/admin/AdminLayout";
import { DashBoardPage } from "./pages/admin/DashBoardPage";
import { ProductChangePage } from "./pages/admin/ProductChangePage";
import LoginPage from "./pages/auth/LoginPage";

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
            <Route path="product/create" element={<ProductChangePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
