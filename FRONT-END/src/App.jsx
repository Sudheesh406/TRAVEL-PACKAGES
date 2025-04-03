
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
        <Route path="/" element={<HomePages />} />
        {/* <Route path="/DestinationDetail" element={<DestinationDetail />} /> */}
        <Route path="/TravelPackages" element={<TravelPackages />} />
        <Route path="/login" element={< Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/OpperatorRegister" element={<OpperatorRegister />} />
        <Route path="/OperatorDashboard" element={<OperatorDashboard />} />
        <Route path="/PackageFirstPage" element={<PackageFirstPage />} />
        <Route path="/PackageSecondPage" element={<PackageSecondPage />} />
        <Route path="/PackageDetails/:id" element={<PackageDetails />} />
        <Route path="/UserProfile" element={<UserProfile />} />
        <Route path="/BookingHistory/:id" element={<BookingHistory />} />
        <Route path="/OperatorPackages/:id" element={<OperatorPackages />} />
        <Route path="/OperatorPackageDetail/:id" element={<OperatorPackageDetail />} />
        <Route path="/OperatorBookingHistory/:id" element={<OperatorBookingHistory />} />
        <Route path="/ReviewCard" element={<ReviewCard />} />
      </Routes>
    </div>
  );
}

export default App;
