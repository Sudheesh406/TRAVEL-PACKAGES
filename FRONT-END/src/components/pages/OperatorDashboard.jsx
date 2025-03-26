import {
  Users,
  Package,
  Star,
  Calendar
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { setCompany } from "../../redux/companySlice";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../axios";

export default function OperatorDashboard() {
  const [details, setDetails] = useState(null);
  const [Packages, setPackages] = useState([]);
  const [PackagesCount, setPackagesCount] = useState(0);

  const dispatch = useDispatch();
  const company = useSelector((state) => state.company.company); // Get company data from Redux

  useEffect(() => {
    async function fetchCompanyDetails() {
      if (!company) { // Fetch only if company is not in Redux state
        try {
          let { data } = await axios.get("/Company/getCompany");
          if (data) {
            dispatch(setCompany(data.result)); // Save to Redux
            setDetails(data.result);
            setPackages(data.tourPackages);
            setPackagesCount(data.totalCount);
          }
        } catch (error) {
          console.error("Error fetching company details", error);
        }
      } else {
        setDetails(company); // Use Redux state when available
      }
    }

    fetchCompanyDetails();
  }, [company, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Operator Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <img
              src={details?.logo || ""}
              alt={details?.companyName || "Company Logo"}
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {details?.companyName || "Company Name"}
              </h1>
              <p className="text-gray-600 mb-4">{details?.Tagline || "No tagline available"}</p>
              <div className="flex flex-wrap gap-4">
                <Link to="/PackageFirstPage">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Add New Package
                  </button>
                </Link>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  View Analytics
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold">1,234</p>
                <p className="text-green-600 text-sm">+12% from last month</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Package className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-gray-600">Active Packages</p>
                <p className="text-2xl font-bold">{PackagesCount}</p>
                <p className="text-green-600 text-sm">+3 new this month</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Star className="text-yellow-600" size={24} />
              </div>
              <div>
                <p className="text-gray-600">Average Rating</p>
                <p className="text-2xl font-bold">4.8</p>
                <p className="text-green-600 text-sm">+0.2 from last month</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Packages */}
        <h2 className="text-2xl font-bold mt-12 mb-6">Recently Added Packages</h2>
        <div className="space-y-4">
          {Packages.length > 0 ? (
            Packages.map((pkg, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4"
              >
                <img
                  src={pkg?.images?.[0] || ""}
                  alt={pkg?.name || "Package Image"}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{pkg?.name || "No Name"}</h3>
                  <div className="flex items-center gap-4 text-gray-600">
                    <span className="flex items-center gap-1">
                      <Calendar size={16} />
                      {pkg?.Date ? new Date(pkg.Date).toLocaleDateString("en-GB") : "No Date"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={16} />
                      {pkg?.bookings || 0} bookings
                    </span>
                    <span className="flex items-center gap-1">
                      <Star size={16} />
                      {pkg?.rating || "No Rating"}
                    </span>
                  </div>
                </div>
                <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                  View Details
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No packages available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
