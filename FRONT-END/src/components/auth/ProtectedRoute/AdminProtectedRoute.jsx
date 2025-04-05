import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../../redux/user/userSlice';
import axios from '../../../axios';
import { useNavigate } from 'react-router-dom';

function AdminProtectedRoute({ children }) {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      try {
        const result = await axios.get('/getUser',{
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        if (result.data?.result) {
          if(result.data.result.role === 'opperator'){
            navigate('/OperatorDashboard');
          }else if(result.data.result.role === 'user'){
            navigate('/');
          }
        }else{
          navigate('/');
        }
      } catch (error) {
        console.error('error in getUser', error);
        navigate('/');
      }
    };

    if (!user) {
      fetchUser();
    }
  }, [user, dispatch, navigate]);

 

  return children;
}

export default AdminProtectedRoute;
