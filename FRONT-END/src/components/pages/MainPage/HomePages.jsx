import Navbar from '../../homeComponents/Navbar';
import Hero from '../../homeComponents/Hero';
import Destinations from '../../homeComponents/Destinations';
import Packages from '../../homeComponents/Packages';
import Testimonials from '../../homeComponents/Testimonials';
import Gallery from '../../homeComponents/Gallery';
import Footer from '../../homeComponents/Footer';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../../axios';
import { setUser, clearUser } from '../../../redux/user/userSlice';

function HomePages() {
 let dispatch = useDispatch()
 const user = useSelector((state) => state.user.user);
 const token = localStorage.getItem("token");

  async function getUser(){
      try {
        let result = await axios.get('/getUser',{
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        if(result.data){
            if(!user){
              dispatch(setUser(result.data.result));
            }
        }
      } catch (error) {  

      }
    }
    getUser()

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Destinations />
      <Packages />
      <Gallery />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default HomePages;