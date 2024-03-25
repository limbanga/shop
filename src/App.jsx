import React from "react";
import MainLayout from "./pages/MainLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NoPage from "./pages/NoPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import AdminLayout from "./pages/admin/AdminLayout";
import { DashBoardPage } from "./pages/admin/DashBoardPage";
import { ProductChangePage } from "./pages/admin/ProductChangePage";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/product/:productSlug" element={<ProductDetailPage />} />
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
