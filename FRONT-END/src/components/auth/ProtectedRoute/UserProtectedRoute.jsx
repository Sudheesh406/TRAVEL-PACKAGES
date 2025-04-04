import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../../redux/user/userSlice';
import axios from '../../../axios';
import { useNavigate } from 'react-router-dom';

function UserProtectedRoute({ children }) {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const result = await axios.get('/getUser',{
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        if (result.data?.result) {
          if(result.data.result.role !== 'user'){
            navigate('/');
          }else{
            dispatch(setUser(result.data.result));
          }
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('error in getUser', error);
        navigate('/login');
      }
    };

    if (!user) {
      fetchUser();
    }
  }, [user, dispatch, navigate]);

  if (!user) {
    return <div>Loading...</div>; 
  }

  return children;
}

export default UserProtectedRoute;
