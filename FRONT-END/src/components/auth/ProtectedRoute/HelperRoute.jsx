import axios from '../../../axios';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

function HelperRoute() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {

    const fetchUserData = async () => {
      try {
        const { data } = await axios.get('/getUser', {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        })
        if (data?.result) {
          if(data.result.role === 'admin') {
            navigate('/AdminDashboard');
          }else if(data.result.role === 'operator') {
            navigate('/OperatorDashboard');
          }else if(data.result.role === 'user') {
            navigate('/');
          }
        }else{
          let route = location.pathname
          navigate(route);
        }
      } catch (error) {
       let route = location.pathname
       navigate(route);
      } 
    };

    fetchUserData()

   },[])

  return <Outlet />;
}

export default HelperRoute