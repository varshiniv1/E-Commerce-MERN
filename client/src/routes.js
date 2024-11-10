import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Updated import
import MainLayout from "./hoc/mainLayout";
import Loader from "./utils/loader";
import { AuthGuard } from "./hoc/authGuard";
import { useDispatch, useSelector } from "react-redux";
import { userIsAuth, userSignOut } from "./store/actions/user.actions";
import Header from "./components/navigation/header";
import Footer from "./components/navigation/footer";
import Home from "./components/home";
import RegisterLogin from "./components/auth";
import Dashboard from "./components/dashboard";
import UserInfo from "./components/dashboard/user/info";
import AdminProducts from "./components/dashboard/admin/products";
import AddProduct from "./components/dashboard/admin/products/addit/add";
import Shop from "./components/shop";
import UserCart from './components/dashboard/user/cart';

const RoutesComponent = () => {
  const [loading, setLoading] = useState(true);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userIsAuth());
  }, [dispatch]);

  useEffect(() => {
    if (users?.auth !== null) {
      setLoading(false);
    }
  }, [users]);

  const signOutUser = () => {
    dispatch(userSignOut());
  };

  return (
    <BrowserRouter>
      {loading ? (
        <Loader full={true} />
      ) : (
        <>
          <Header users={users} signOutUser={signOutUser} />
          <MainLayout>
            <Routes>
              {" "}
              {/* Updated to use Routes */}
              <Route path="/" element={<Home />} />{" "}
              {/* Updated to use element prop */}
              <Route
                path="/dashboard/admin/admin_products"
                element={
                  <AuthGuard>
                    <AdminProducts />
                  </AuthGuard>
                }
              />
              <Route
                path="/dashboard/admin/add_products"
                element={
                  <AuthGuard>
                    <AddProduct />
                  </AuthGuard>
                }
              />
              <Route
                path="/dashboard/user/user_cart"
                element={
                  <AuthGuard>
                    <UserCart />
                  </AuthGuard>
                }
              />
              {/* Updated to use element prop */}
              <Route
                path="/dashboard"
                element={
                  <AuthGuard>
                    <Dashboard users={users} />
                  </AuthGuard>
                }
              />{" "}
              <Route
                path="/dashboard/user/user_info"
                element={
                  <AuthGuard>
                    <UserInfo users={users} />
                  </AuthGuard>
                }
              />{" "}
              
              <Route path="/shop" element={<Shop />} />
              {/* Updated to use element prop */}
              <Route path="/sign_in" element={<RegisterLogin />} />{" "}
              {/* Updated to use element prop */}
            </Routes>
          </MainLayout>
          <Footer />
        </>
      )}
    </BrowserRouter>
  );
};

export default RoutesComponent;
