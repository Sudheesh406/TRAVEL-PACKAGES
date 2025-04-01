import { Menu, X, MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../../redux/userSlice';
import axios from '../../axios';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [firstLetter, setFirstLetter] = useState("Guest");

  const isExist = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isExist && isExist.username) {
      setFirstLetter(isExist.username.charAt(0).toUpperCase());
    }
  }, [isExist]);

  const handleLogout = async () => {
    try {
      let result = await axios.get('/logOut');
      if (result) {
        dispatch(clearUser());
        setDropdownOpen(false);
        setFirstLetter("Guest");
      }
    } catch (error) {
      console.error('Error during logout:', error);
      alert('There was an error logging out. Please try again later.');
    }
  };

  const handleProfileClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <MapPin className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">TravelWorld</span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 font-medium">Home</a>
            <a href="#destinations" className="text-gray-700 hover:text-blue-600 px-3 py-2 font-medium">Destinations</a>
            <a href="#packages" className="text-gray-700 hover:text-blue-600 px-3 py-2 font-medium">Packages</a>
            <a href="#testimonials" className="text-gray-700 hover:text-blue-600 px-3 py-2 font-medium">Testimonials</a>
            <Link to="/TravelPackages">
              <button className="mt-2 w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                Book Now
              </button>
            </Link>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                aria-haspopup="true"
                aria-expanded={dropdownOpen ? "true" : "false"}
                className="w-10 h-10 bg-blue-500 rounded-full cursor-pointer flex items-center justify-center"
                onClick={handleProfileClick}
              >
                {isExist && isExist.image ? (
                  <img src={isExist.image} alt={firstLetter} className="w-full h-full object-cover rounded-full" />
                ) : (
                  <span className="text-white font-bold">{firstLetter}</span>
                )}
              </button>

              {dropdownOpen && (
                <div className="absolute left-0 top-8 mt-2 w-40 bg-white shadow-lg rounded-md py-2">
                  {isExist ? (
                    <>
                      <Link
                        to="/UserProfile"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Login
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#" className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium">Home</a>
            <a href="#destinations" className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium">Destinations</a>
            <a href="#packages" className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium">Packages</a>
            <a href="#testimonials" className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium">Testimonials</a>
            <Link to="/TravelPackages">
              <button className="mt-2 w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                Book Now
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
