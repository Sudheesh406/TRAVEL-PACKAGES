

import PackageDetails from './components/pages/commonPages/PackageDetails'
import UserProfile from './components/pages/CustomerPages/UserProfile'
import BookingHistory from './components/pages/CustomerPages/BookingHistory'

import OperatorPackageFirstPage from './components/forms/packagesForm/OperatorPackageFirstPage'
import OperatorPackageSecondPage from './components/forms/packagesForm/OperatorPackageSecondPage'
import OperatorPackages from './components/pages/operatorPages/OperatorPackages';
import OperatorBookingHistory from './components/pages/operatorPages/OperatorBookingHistory';
import OperatorRegister from './components/pages/operatorPages/OperatorRegister';
import OperatorDashboard from './components/pages/operatorPages/OperatorDashboard';

import ReviewCard from './components/pages/commonPages/ReviewCard';
import HomePages from './components/pages/MainPage/HomePages';
import TravelPackages from './components/pages/commonPages/TravelPackages';
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'

import AdminDashboard from './components/pages/AdminPages/AdminDashboard'
import AdminUserListing from './components/pages/AdminPages/AdminUserListing';
import AdminOperatorListing from './components/pages/AdminPages/AdminOperatorListing';
import AdminPaymentDetails from './components/pages/AdminPages/AdminPaymentDetails';

import ProtectRoute from './components/auth/ProtectedRoute/ProtectedRoute';
import NotFound404 from './components/pages/commonPages/NotFound404';

import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollTop";
import './App.css';
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <ScrollToTop />
      <Toaster />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

          <Route path="/" element={<HomePages />} />
          <Route path="/TravelPackages" element={<TravelPackages />} />
          <Route path="/ReviewCard" element={<ReviewCard />} />
          <Route path="/PackageDetails/:operator/:id" element={<PackageDetails />} />

         <Route path='/' element={<ProtectRoute />}>

          <Route path="/UserProfile" element={<UserProfile />} />
          <Route path="/BookingHistory/:id" element={<BookingHistory />} />
          <Route path="/OperatorRegister" element={<OperatorRegister />} />
          <Route path="/OperatorDashboard" element={<OperatorDashboard />} />
          <Route path="/OperatorPackageFirstPage" element={<OperatorPackageFirstPage />} />
          <Route path="/OperatorPackageSecondPage" element={<OperatorPackageSecondPage />} />
          <Route path="/OperatorPackages/:id" element={<OperatorPackages />} />
          <Route path="/OperatorBookingHistory/:id" element={<OperatorBookingHistory />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/AdminUserListing" element={<AdminUserListing />} />
          <Route path="/AdminOperatorListing" element={<AdminOperatorListing />} />
          <Route path="/AdminPaymentDetails" element={<AdminPaymentDetails />} />
        </Route>
        <Route path="*" element={<NotFound404 />} />


      </Routes>
    </div>
  );
}

export default App;
