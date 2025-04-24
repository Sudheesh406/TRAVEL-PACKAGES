
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../redux/user/userSlice";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "../../../axios";
import {useState} from "react"

function CommonRoute() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector(state => state.user.user);
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    const checkUser = async () => {
      let currentUser = user;

      if (!currentUser) {
        try {
          const token = localStorage.getItem("token");
          const { data } = await axios.get("/getUser", {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true
          });
          if (data?.result) {
            dispatch(setUser(data.result));
            currentUser = data.result;
          }
        } catch (err) {
          
        }
      }

      if (currentUser?.role === "admin") navigate("/admin/adminDashboard");
      else if (currentUser?.role === "operator") navigate("/operator/operatorDashboard");

      setLoading(false)
   
    };

    checkUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin-slow"></div>
        <div className="absolute top-3 left-3 right-3 bottom-3 border-4 border-yellow-400 border-b-transparent rounded-full animate-spin-reverse"></div>
      </div>
    </div>
    );
  }

  return <Outlet />;
}

export default CommonRoute;
