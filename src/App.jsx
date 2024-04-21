import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./pages/main/HomePage";
import { ProductDetailPage } from "./pages/main/ProductDetailPage";
import AdminLayout from "./layouts/AdminLayout";
import { DashBoardPage } from "./pages/admin/DashBoardPage";
import LoginPage from "./pages/auth/LoginPage";
import { AdminProductDetailPage } from "./pages/admin/AdminProductDetailPage";
import NoPage from "./pages/errors/NoPage";
import MainLayout from "./layouts/MainLayout";
import { CartDetailPage } from "./pages/main/CartDetailPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { CheckoutPage } from "./pages/main/CheckoutPage";
import OrderDetailPage from "./pages/main/OrderDetailPage";

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
            {/* cart */}
            <Route path="/cart" element={<CartDetailPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order/:id" element={<OrderDetailPage />} />

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
