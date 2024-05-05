import React, { useContext } from "react";
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
import OrderDetailPage from "./pages/main/OrderDetailPage";
import OrdersPage from "./pages/main/OrdersPage";
import { AuthenticationContext } from "./contexts/AuthenticationContext";
import UserLayout from "./layouts/UserLayout";

const App = () => {
  const { currentUser } = useContext(AuthenticationContext);
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* required logged in */}
          <Route path="/" element={<UserLayout />}>
            {/* cart */}
            <Route path="/cart" element={<CartDetailPage />} />
            <Route path="/orders/:id" element={<OrderDetailPage />} />
            <Route path="/orders/" element={<OrdersPage />} />
          </Route>

          {/* required admin */}
          <Route path="/admin/" element={<AdminLayout />}>
            <Route index element={<DashBoardPage />} />
            <Route path="product/:id" element={<AdminProductDetailPage />} />
          </Route>
          
          {/* guest */}
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
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
