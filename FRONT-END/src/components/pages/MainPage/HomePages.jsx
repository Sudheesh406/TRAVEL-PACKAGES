import Navbar from '../../homeComponents/Navbar';
import Hero from '../../homeComponents/Hero';
import Destinations from '../../homeComponents/Destinations';
import Packages from '../../homeComponents/Packages';
import Testimonials from '../../homeComponents/Testimonials';
import Footer from '../../homeComponents/Footer';
import {useState} from 'react'
function HomePages() {
  const [loading,setLoading] =useState(true)

  setTimeout(() => {
    setLoading(false)
  }, 1000)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin-slow"></div>
        <div className="absolute top-3 left-3 right-3 bottom-3 border-4 border-yellow-400 border-b-transparent rounded-full animate-spin-reverse"></div>
      </div>
    </div>
    );
  }
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Destinations />
      <Packages />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default HomePages;