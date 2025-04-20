import { useEffect,useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../../redux/user/userSlice';
import axios from '../../../axios';

function HelperRoute() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
    const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      let currentUser = user;

      if (!currentUser) {
        try {
          const token = localStorage.getItem('token');
          const { data } = await axios.get('/getUser', {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true
          });
          if (data?.result) {
            dispatch(setUser(data.result));
            currentUser = data.result;
          }
        } catch (err) {
          return; 
        }
      }

      if (currentUser?.role === 'admin') navigate('/Admin/AdminDashboard');
      else if (currentUser?.role === 'operator') navigate('/Operator/OperatorDashboard');
      else if (currentUser?.role === 'user') navigate('/');
    };

      setLoading(false);
    checkIfLoggedIn();
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

export default HelperRoute;
