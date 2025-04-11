
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
import CommonRoute from "./components/auth/ProtectedRoute/commonRoute";
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
          <Route path="/Admin/AdminDashboard" element={<AdminDashboard />} />
          <Route
            path="/Admin/AdminUserListing"
            element={<AdminUserListing />}
          />
          <Route
            path="/Admin/AdminOperatorListing"
            element={<AdminOperatorListing />}
          />
          <Route
            path="/Admin/AdminPaymentDetails"
            element={<AdminPaymentDetails />}
          />

          <Route
            path="/Operator/OperatorDashboard"
            element={<OperatorDashboard />}
          />
          <Route
            path="/Operator/OperatorRegister"
            element={<OperatorRegister />}
          />
          <Route
            path="/Operator/OperatorPackageFirstPage"
            element={<OperatorPackageFirstPage />}
          />
          <Route
            path="/Operator/OperatorPackageSecondPage"
            element={<OperatorPackageSecondPage />}
          />
          <Route
            path="/Operator/OperatorPackages/:id"
            element={<OperatorPackages />}
          />
          <Route
            path="/Operator/OperatorBookingHistory/:id"
            element={<OperatorBookingHistory />}
          />

          <Route path="/UserProfile" element={<UserProfile />} />
          <Route path="/BookingHistory/:id" element={<BookingHistory />} />
        </Route>

        <Route element={<CommonRoute />}>
          <Route path="/" element={<HomePages />} />
          <Route path="/TravelPackages" element={<TravelPackages />} />
          <Route path="/ReviewCard" element={<ReviewCard />} />
          <Route
            path="/PackageDetails/:operator/:id"
            element={<PackageDetails />}
          />
        </Route>

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
