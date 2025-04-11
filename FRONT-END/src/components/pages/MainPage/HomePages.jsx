import Navbar from '../../homeComponents/Navbar';
import Hero from '../../homeComponents/Hero';
import Destinations from '../../homeComponents/Destinations';
import Packages from '../../homeComponents/Packages';
import Testimonials from '../../homeComponents/Testimonials';
import Gallery from '../../homeComponents/Gallery';
import Footer from '../../homeComponents/Footer';


function HomePages() {

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