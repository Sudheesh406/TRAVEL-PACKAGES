import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "../../../axios";
import { setUser } from "../../../redux/user/userSlice";

const allowedRoutes = {
  admin: ["admin"],
  operator: ["operator"],
  user: ["profile", "history"],
};

const ProtectedRoute = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const checkUserAccess = async () => {
      let currentUser = user;

      if (!currentUser) {
        try {
          const token = localStorage.getItem("token");
          const { data } = await axios.get("/getUser", {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          });
          if (data?.result) {
            dispatch(setUser(data.result));
            currentUser = data.result;
          } else {
            navigate("/");
            return;
          }
        } catch (err) {
          console.error("Auth error:", err);
          
          navigate("/");
          return;
        }
      }

      const currentPath = location.pathname;
      const mainRoute = currentPath.split("/")[1];


      if (
        !allowedRoutes[currentUser.role]?.some((path) =>
          currentPath.includes(path)
        )
      ) {
        navigate("/");
      }
        setLoading(false);
      
    };

    checkUserAccess();
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
};

export default ProtectedRoute;
