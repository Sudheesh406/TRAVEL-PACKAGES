
import HomePages from './components/HomePages';
import DestinationDetail from './components/pages/DestinationDetail';
import TravelPackages from './components/pages/TravelPackages';
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import OpperatorRegister from './components/pages/OpperatorRegister';
import OperatorDashboard from './components/pages/OperatorDashboard'
import PackageFirstPage from './components/forms/packagesForm/PackageFirstPage'
import PackageSecondPage from './components/forms/packagesForm/PackageSecondPage'
import PackageDetails from './components/pages/PackageDetails'
import UserProfile from './components/pages/UserProfile'

import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollTop";
import './App.css';


function App() {
  return (
    <div>
       <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePages />} />
        <Route path="/DestinationDetail" element={<DestinationDetail />} />
        <Route path="/TravelPackages" element={<TravelPackages />} />
        <Route path="/login" element={< Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/OpperatorRegister" element={<OpperatorRegister />} />
        <Route path="/OperatorDashboard" element={<OperatorDashboard />} />
        <Route path="/PackageFirstPage" element={<PackageFirstPage />} />
        <Route path="/PackageSecondPage" element={<PackageSecondPage />} />
        <Route path="/PackageDetails/:id" element={<PackageDetails />} />
        <Route path="/UserProfile" element={<UserProfile />} />
      </Routes>
    </div>
  );
}

export default App;
