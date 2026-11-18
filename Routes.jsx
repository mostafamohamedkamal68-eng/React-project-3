import { Navigate, Route, Routes as ReactRoutes } from "react-router-dom";
import ShopCoLanding from "../ShopCoLanding";
import CartPage from "../Cart/CartPage";
import ProductDetailsPage from "../Product/ProductDetailsPage";
import ReservationsPage from "../Reservations/ReservationsPage";

export default function AppRoutes() {
  return (
    <ReactRoutes>
      <Route path="/" element={<ShopCoLanding />} />
      <Route path="/products" element={<ShopCoLanding />} />
      <Route path="/products/:id" element={<ProductDetailsPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/reservations" element={<ReservationsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </ReactRoutes>
  );
}
