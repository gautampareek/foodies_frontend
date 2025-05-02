import { Routes, Route, useLocation } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";

// Admin Pages
import AddFood from "./pages/admin/AddFood/AddFood";
import ListFood from "./pages/admin/ListFood/ListFood";
import Order from "./pages/admin/Order/Order";
import { useEffect } from "react";
import Home from "./pages/user/Home/Home";
import Explore from "./pages/user/Explore/Explore";
import ContactUs from "./pages/user/ContactUs/ContactUs";
import FoodItemDetails from "./pages/user/FoodItemDetail/FoodItemDetails";
import Cart from "./pages/user/Cart/Cart";
import PlaceOrder from "./pages/user/PlaceOrder/PlaceOrder";
import Login from "./pages/user/Login/Login";
import Register from "./pages/user/Register/Register";

// User Pages

const App = () => {
  const location = useLocation();

  useEffect(() => {
    const { pathname } = location;

    if (pathname.startsWith('/admin')) {
      document.title = 'Admin Dashboard | Foodies';
    } else if (pathname.startsWith('/user')) {
      document.title = 'User Panel | Foodies';
    } else {
      document.title = 'Foodies';
    }
  }, [location]);
  return (
    <Routes>
      
      {/* Admin Side */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="add" element={<AddFood />} />
        <Route path="list" element={<ListFood />} />
        <Route path="order" element={<Order />} />
      </Route>
     
{
      //use side
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="explore" element={<Explore />} />
        <Route path="contact-us" element={<ContactUs />} />
        <Route path="/food/:id" element={<FoodItemDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/placeOrder" element={<PlaceOrder />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
}
    </Routes>
  );
};

export default App;
