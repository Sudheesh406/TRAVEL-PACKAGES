import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../../redux/user/userSlice';
import axios from '../../../axios';
import { useNavigate } from 'react-router-dom';

function OperatorProtectedRoute({ children }) {
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

          if(result.data.result.role !== 'opperator'){
            navigate('/OperatorDashboard');
          }
          if(result.data.result.role !== 'admin'){

            navigate('/AdminDashboard');
          }
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

 

  return children;
}

export default OperatorProtectedRoute;
