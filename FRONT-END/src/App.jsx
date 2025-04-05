
import HomePages from './components/pages/MainPage/HomePages';
import TravelPackages from './components/pages/commonPages/TravelPackages';
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import OpperatorRegister from './components/pages/operatorPages/OpperatorRegister';
import OperatorDashboard from './components/pages/operatorPages/OperatorDashboard'
import PackageFirstPage from './components/forms/packagesForm/PackageFirstPage'
import PackageSecondPage from './components/forms/packagesForm/PackageSecondPage'
import PackageDetails from './components/pages/commonPages/PackageDetails'
import UserProfile from './components/pages/CustomerPages/UserProfile'
import BookingHistory from './components/pages/CustomerPages/BookingHistory'
import OperatorPackages from './components/pages/operatorPages/OperatorPackages';
import OperatorPackageDetail from './components/pages/operatorPages/OperatorPackageDetail';
import OperatorBookingHistory from './components/pages/operatorPages/OperatorBookingHistory';
import ReviewCard from './components/pages/commonPages/ReviewCard';
import UserProtectedRoute from './components/auth/ProtectedRoute/UserProtectedRoute';
import OperatorProtectedRoute from './components/auth/ProtectedRoute/OperatorProtectedRoute';
import AdminProtectedRoute from './components/auth/ProtectedRoute/AdminProtectedRoute';
import DashboardCard from './components/pages/AdminPages/AdminDashboard'
import UtilProtectedRoute from './components/auth/ProtectedRoute/utilProtectorRoute';
import AdminUserListing from './components/pages/AdminPages/AdminUserListing';
import AdminOperatorListing from './components/pages/AdminPages/AdminOperatorListing';
import AdminPaymentDetails from './components/pages/AdminPages/AdminPaymentDetails';
import LoginProtectRoute from './components/auth/ProtectedRoute/LoginProtectedRoute';

import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollTop";
import './App.css';
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
       <ScrollToTop />
       <Toaster/>
      <Routes>

      <Route path="/login" element={
          <LoginProtectRoute>
            <Login />
        </LoginProtectRoute>} />

      <Route path="/signup" element={
          <LoginProtectRoute>
            <Signup />
        </LoginProtectRoute>} />
        

        <Route path="/" element={
          <UtilProtectedRoute>
            <HomePages />
        </UtilProtectedRoute>} />

        <Route path="/TravelPackages" element={
          <UtilProtectedRoute>
            <TravelPackages />
        </UtilProtectedRoute>} />

        <Route path="/PackageDetails/:id" element={
          <UtilProtectedRoute>
            <PackageDetails />
        </UtilProtectedRoute>} />
        
        <Route path="/ReviewCard" element={
          <UtilProtectedRoute>
            <ReviewCard />
        </UtilProtectedRoute>} />


        <Route path="/UserProfile" element={
          <UserProtectedRoute>
            <UserProfile />
        </UserProtectedRoute>} />

        <Route path="/BookingHistory/:id" element={
        <UserProtectedRoute>
          <BookingHistory />
        </UserProtectedRoute>} />


        <Route path="/OpperatorRegister" element={
        <OperatorProtectedRoute>
          <OpperatorRegister />
        </OperatorProtectedRoute>} />

        <Route path="/OperatorDashboard" element={
        <OperatorProtectedRoute>
          <OperatorDashboard />
        </OperatorProtectedRoute>} />

        <Route path="/PackageFirstPage" element={
        <OperatorProtectedRoute>
          <PackageFirstPage />
        </OperatorProtectedRoute>} />

        <Route path="/PackageSecondPage" element={
        <OperatorProtectedRoute>
          <PackageSecondPage />
        </OperatorProtectedRoute>} />

        <Route path="/OperatorPackages/:id" element={
        <OperatorProtectedRoute>
          <OperatorPackages />
        </OperatorProtectedRoute>} />

        <Route path="/OperatorPackageDetail/:id" element={
        <OperatorProtectedRoute>
          <OperatorPackageDetail />
        </OperatorProtectedRoute>} />

        <Route path="/OperatorBookingHistory/:id" element={
        <OperatorProtectedRoute>
          <OperatorBookingHistory />
        </OperatorProtectedRoute>} />


        <Route path="/AdminDashboard" element={
        <AdminProtectedRoute>
          <DashboardCard />
        </AdminProtectedRoute>} />

        <Route path="/AdminUserListing" element={
        <AdminProtectedRoute>
          <AdminUserListing />
        </AdminProtectedRoute>} />

        <Route path="/AdminOperatorListing" element={
        <AdminProtectedRoute>
          <AdminOperatorListing />
        </AdminProtectedRoute>} />

        <Route path="/AdminPaymentDetails" element={
        <AdminProtectedRoute>
          <AdminPaymentDetails />
        </AdminProtectedRoute>} />

        
        <Route path="/LoginProtectRoute" element={<LoginProtectRoute />} />
        <Route path="/UserProtectedRoute" element={<UserProtectedRoute />} />
        <Route path="/UtilProtectedRoute" element={<UtilProtectedRoute />} />
        <Route path="/OperatorProtectedRoute" element={<OperatorProtectedRoute />} />
        <Route path="/AdminProtectedRoute" element={<AdminProtectedRoute />} />
      </Routes>
    </div>
  );
}

export default App;
