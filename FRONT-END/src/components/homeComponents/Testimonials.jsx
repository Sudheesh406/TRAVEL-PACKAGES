
import { Star, Quote } from 'lucide-react';

  import {useState, useEffect} from 'react'
  import { useNavigate } from 'react-router-dom';
  import axios from '../../axios'
const Testimonials = () => {

  const navigate = useNavigate()

    const [testimonials,setTestimonials] = useState()
  useEffect(()=>{
    async function getReviews() {
      try {
        let {data} = await axios.get('/Review/getReviews')
        if(data) setTestimonials(data.result)           
      } catch (error) {
        console.error("error found getReviews",error );
      }
    }
    getReviews()
  },[])

const handleclick = ()=>{
  navigate('/ReviewCard')
}

  return (
    <section id="testimonials" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Travelers Say</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">Read testimonials from our satisfied customers who have experienced our travel services.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials && testimonials.map((testimonial ,index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg relative">
              <div className="absolute -top-4 -right-4 bg-blue-600 rounded-full p-2">
                <Quote className="h-6 w-6 text-white" />
              </div>
              
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.userProfile} 
                  alt={testimonial.name} 
                  className="w-14 h-14 rounded-full object-cover mr-4" 
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{testimonial.userName}</h3>
                </div>
              </div>

              <div className='flex justify-between'>
              <h3 className="font-semibold text-gray-900">{testimonial.packageName}</h3>
              <div className="flex mb-4 ">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${i < testimonial.star ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              </div>
              <p className="text-gray-700">{testimonial.review}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4"> Read Their Experiences</h3>
          <p className="text-gray-700 mb-6">See what other travelers have to say! Browse reviews and discover real experiences from fellow explorers.</p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300"
          onClick={handleclick}>
            Reviews
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;