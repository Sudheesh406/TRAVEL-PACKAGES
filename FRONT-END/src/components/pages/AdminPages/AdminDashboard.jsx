import { Users, Shield, DollarSign } from "lucide-react";
import { FiMenu } from "react-icons/fi";

import { useNavigate } from "react-router-dom";
import axios from "../../../axios";
import { useState, useEffect } from "react";

function AdminDashboard() {
  const navigate = useNavigate();
  const [details, setDetails] = useState([]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  

  useEffect(() => {
    async function getAdminPageDetails() {
      const token = localStorage.getItem("token");
      try {
        let { data } = await axios.get("/Admin/getAdminPageDetails", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        if (data) {
          setDetails([
            {
              title: "Users",
              value: data.result.userCount,
              icon: Users,
              route: "/AdminUserListing",
            },
            {
              title: "Operators",
              value: data.result.operators,
              icon: Shield,
              route: "/AdminOperatorListing",
            },
            {
              title: "Total Revenue",
              value: data.result.totalAmount,
              icon: DollarSign,
              route: "/AdminPaymentDetails",
            },
          ]);
        }
      } catch (error) {
        console.error("error found in getAdminPageDetails", error);
      }
    }

    getAdminPageDetails();
  }, []);

  const handleLogout = async () => {
    try {
      let result = await axios.get("/logOut");
      if (result) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      <aside className="w-64 bg-white shadow-md px-6 py-8 hidden md:block">
        <div className="text-2xl font-bold mb-8 flex items-center gap-2">
          Admin Panel
        </div>
        <nav className="space-y-4 text-gray-700 font-medium">
          <button
            onClick={() => navigate("/AdminUserListing")}
            className="hover:text-blue-600 flex items-center gap-2"
          >
            <Users className="w-5 h-5 text-blue-500" />
            Manage users
          </button>
          <button
            onClick={() => navigate("/AdminOperatorListing")}
            className="hover:text-blue-600 flex items-center gap-2"
          >
            <Shield className="w-5 h-5 text-blue-500" />
            Manage operators
          </button>
          <button
            onClick={() => navigate("/AdminPaymentDetails")}
            className="hover:text-blue-600 flex items-center gap-2"
          >
            <DollarSign className="w-5 h-5 text-blue-500" />
            Payment details
          </button>
        </nav>
      </aside>
  
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center relative">
          <h1 className="text-xl font-semibold flex items-center gap-2">
            <button className="md:hidden" onClick={toggleMenu}>
              <FiMenu size={24} />
            </button>
            Dashboard
          </h1>
  
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
            onClick={handleLogout}
          >
            Logout
          </button>
  
          {isMenuOpen && (
            <div className="absolute top-full left-4 right-4 bg-white border rounded-lg shadow-lg z-50 mt-4 p-4 space-y-3 md:hidden">
              <button
                onClick={() => {
                  navigate("/AdminUserListing");
                  setIsMenuOpen(false);
                }}
                className="hover:text-blue-600 flex items-center gap-2"
              >
                <Users className="w-5 h-5 text-blue-500" />
                Manage users
              </button>
              <button
                onClick={() => {
                  navigate("/AdminOperatorListing");
                  setIsMenuOpen(false);
                }}
                className="hover:text-blue-600 flex items-center gap-2"
              >
                <Shield className="w-5 h-5 text-blue-500" />
                Manage operators
              </button>
              <button
                onClick={() => {
                  navigate("/AdminPaymentDetails");
                  setIsMenuOpen(false);
                }}
                className="hover:text-blue-600 flex items-center gap-2"
              >
                <DollarSign className="w-5 h-5 text-blue-500" />
                Payment details
              </button>
            </div>
          )}
        </header>
  
        <main className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {details.map((details, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-500 pb-4">{details.title}</p>
                  <h2 className="text-3xl font-bold">{details.value}</h2>
                </div>
                <details.icon className="text-3xl text-blue-500" />
              </div>
              <div className="mt-4 flex justify-end"></div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
  
}

export default AdminDashboard;
