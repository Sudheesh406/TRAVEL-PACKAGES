
import PackageDetails from "./components/pages/commonPages/PackageDetails";
import UserProfile from "./components/pages/CustomerPages/UserProfile";
import BookingHistory from "./components/pages/CustomerPages/BookingHistory";

import OperatorPackageFirstPage from "./components/forms/packagesForm/OperatorPackageFirstPage";
import OperatorPackageSecondPage from "./components/forms/packagesForm/OperatorPackageSecondPage";
import OperatorPackages from "./components/pages/operatorPages/OperatorPackages";
import OperatorBookingHistory from "./components/pages/operatorPages/OperatorBookingHistory";
import OperatorRegister from "./components/pages/operatorPages/OperatorRegister";
import OperatorDashboard from "./components/pages/operatorPages/OperatorDashboard";

import ReviewCard from "./components/pages/commonPages/ReviewCard";
import HomePages from "./components/pages/MainPage/HomePages";
import TravelPackages from "./components/pages/commonPages/TravelPackages";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";

import AdminDashboard from "./components/pages/AdminPages/AdminDashboard";
import AdminUserListing from "./components/pages/AdminPages/AdminUserListing";
import AdminOperatorListing from "./components/pages/AdminPages/AdminOperatorListing";
import AdminPaymentDetails from "./components/pages/AdminPages/AdminPaymentDetails";

import ProtectedRoute from "./components/auth/ProtectedRoute/ProtectedRoute";
import CommonRoute from "./components/auth/ProtectedRoute/CommonRoute"
import HelperRoute from "./components/auth/ProtectedRoute/HelperRoute";

import NotFound404 from "./components/pages/commonPages/NotFound404";

import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollTop";
import "./App.css";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <ScrollToTop />
      <Toaster />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/adminDashboard" element={<AdminDashboard />} />
          <Route
            path="/admin/adminUserListing"
            element={<AdminUserListing />}
          />
          <Route
            path="/admin/adminOperatorListing"
            element={<AdminOperatorListing />}
          />
          <Route
            path="/admin/adminPaymentDetails"
            element={<AdminPaymentDetails />}
          />

          <Route
            path="/operator/operatorDashboard"
            element={<OperatorDashboard />}
          />
          <Route
            path="/operator/operatorRegister"
            element={<OperatorRegister />}
          />
          <Route
            path="/operator/operatorPackageFirstPage"
            element={<OperatorPackageFirstPage />}
          />
          <Route
            path="/operator/operatorPackageSecondPage"
            element={<OperatorPackageSecondPage />}
          />
          <Route
            path="/operator/operatorPackages/:id"
            element={<OperatorPackages />}
          />
          <Route
            path="/operator/operatorBookingHistory/:id"
            element={<OperatorBookingHistory />}
          />

          <Route path="/profile/userProfile" element={<UserProfile />} />
          <Route path="/history/bookingHistory/:id" element={<BookingHistory />} />
        </Route>

        <Route element={<CommonRoute />}>
          <Route path="/" element={<HomePages />} />
          <Route path="/packages/travelPackages" element={<TravelPackages />} />
          <Route path="/review/reviewCard" element={<ReviewCard />} />
        </Route>
        
          <Route
            path="/packages/packageDetails/:operator/:id"
            element={<PackageDetails />}
          />

        <Route element={<HelperRoute />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route path="*" element={<NotFound404 />} />
        
      </Routes>
    </div>
  );
}

export default App;
