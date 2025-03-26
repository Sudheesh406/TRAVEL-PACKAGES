import Navbar from './home/Navbar';
import Hero from './home/Hero';
import Destinations from './home/Destinations';
import Packages from './home/Packages';
import Testimonials from './home/Testimonials';
import Gallery from './home/Gallery';
import Footer from './home/Footer';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../axios';
import { setUser, clearUser } from '../redux/userSlice';

function HomePages() {
 let dispatch = useDispatch()
//  dispatch(clearUser());

 const user = useSelector((state) => state.user.user);
  async function getUser(){
      try {
        let result = await axios.get('/getUser');
        if(result.data){
            if(!user){
              dispatch(setUser(result.data.result));
            }
        }
      } catch (error) {  
        console.error('error in getUser', error);
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