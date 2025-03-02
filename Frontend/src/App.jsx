import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/user/userHome.jsx";
import UserLogin from "./pages/user/userLogin.jsx";
import UserSignup from "./pages/user/userSignup.jsx";
import OwnerSignup from "./pages/owner/ownerSignup.jsx";
import OwnerLogin from "./pages/owner/ownerLogin.jsx";
import OwnerHomePage from "./pages/owner/ownerHome.jsx";
import HeroPage from "./pages/HeroPage.jsx";
import UserVerify from "./pages/UserVerifyPage.jsx";
import OwnerVerify from "./pages/OwnerVerifyPage.jsx";
import AddRestaurant from "./pages/restaurant/AddRestaurant.jsx";
import RestaurantDetails from "./pages/restaurant/restaurantDetails.jsx";
import Payment from "./components/Payment.jsx";



function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<HeroPage />} />



        {/* //user part */}
        <Route path="/user/login/:id" element={<UserLogin />} />
        <Route path="/user/signup" element={<UserSignup />} />

        <Route path="/user/home/:id" element={
          <UserVerify>
            <HomePage />
          </UserVerify>
        }
        />

        <Route path="/user/payment" element={
          <UserVerify>
            <Payment />
          </UserVerify>
        }
        />

        {/* owner part */}
        <Route path="/owner/signup" element={<OwnerSignup />} />
        <Route path="/owner/login" element={<OwnerLogin />} />
        <Route path="/owner/home" element={
          <OwnerVerify>
            <OwnerHomePage />
          </OwnerVerify>} />
        <Route path="/owner/add-restaurant" element={
          <OwnerVerify>
            <AddRestaurant />
          </OwnerVerify>} />
        <Route path="/owner/restaurant-details/:id" element={
          <OwnerVerify>
            <RestaurantDetails />
          </OwnerVerify>} />
      </Routes>
    </Router>
  );
}

export default App;