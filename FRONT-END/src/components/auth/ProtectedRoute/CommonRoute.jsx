import axios from '../../../axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../../redux/user/userSlice';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

function CommonRoute() {
    const dispatch = useDispatch();
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
           dispatch(setUser(data.result));
           if(data.result.role === 'admin') {
             navigate('/AdminDashboard');
           }else if(data.result.role === 'opperator') {
             navigate('/OperatorDashboard');
           }else{
            let route = location.pathname
            navigate(route);
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

export default CommonRoute