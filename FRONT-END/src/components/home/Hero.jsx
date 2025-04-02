import { Search } from 'lucide-react';


const Hero = () => {

  return (
<div
  className="relative h-[80vh] bg-cover bg-center"
  style={{
    backgroundImage: `url('/hero.jpg')`, 
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
       <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Discover the World s Beauty</h1>
        <p className="text-xl text-white mb-8 max-w-2xl">Explore breathtaking destinations and create unforgettable memories with our premium travel packages.</p>
      </div>
    </div>
  );
};

export default Hero;