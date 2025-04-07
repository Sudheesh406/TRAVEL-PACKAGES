import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import axios from '../../../axios';
import { setUser } from '../../../redux/user/userSlice';

const ProtectedRoute = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem('token') || '';
  const [isLoading, setIsLoading] = useState(true);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get('/getUser', {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        if (data?.result) {
          dispatch(setUser(data.result));
        } else {
          navigate('/');
        }
      } catch (error) {
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    if (token) fetchUserData()
    else {
      navigate('/login');
      setIsLoading(false);
    }
  }, [dispatch, navigate, token]);

  useEffect(() => {
    if (!isLoading && user) {
      let redirected = false;

      if (user.role === 'admin' && !location.pathname.startsWith('/Admin')) {
        navigate('/AdminDashboard');
        redirected = true;
      } else if (user.role === 'opperator' && !location.pathname.startsWith('/Operator')) {
        navigate('/OperatorDashboard');
        redirected = true;
      } else if (user.role === 'user' && location.pathname.startsWith('Operator') || location.pathname.startsWith('Admin')) {
        navigate('/');
        redirected = true;
      }

      setIsRedirecting(redirected);
    }
  }, [user, isLoading, location.pathname, navigate]);

  if (isLoading || isRedirecting) return null;

  return <Outlet />;
};

export default ProtectedRoute;
