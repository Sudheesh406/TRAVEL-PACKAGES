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
      try {
        const result = await axios.get('/getUser');
        console.log(result.data.result);
        if (result.data?.result) {
          if(result.data.result.role === 'admin'){
            navigate('/AdminDashboard');
          }
        }
      } catch (error) {
        console.error('error in getUser', error);
        // navigate('/login');
      }
    };

    if (!user) {
      fetchUser();
    }
  }, [user, dispatch, navigate]);

  // if (!user) {
  //   return <div>Loading...</div>; 
  // }

  return children;
}

export default AdminProtectedRoute;
