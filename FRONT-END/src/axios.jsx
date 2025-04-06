import axios from 'axios'

const token = localStorage.getItem("token")
const apiClient = axios.create({
  baseURL:import.meta.env.VITE_BACKEND_URL, 
  headers: {
    'Content-Type': 'application/json', 
     Authorization: `Bearer ${token}`
  },
  withCredentials:true
});

export default apiClient