
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    location: 'New York, USA',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    rating: 5,
    text: 'Our trip to Bali was absolutely amazing! The TravelWorld team took care of everything, from accommodations to activities. The guides were knowledgeable and friendly. I highly recommend their services!',
  },
  {
    id: 2,
    name: 'Michael Chen',
    location: 'Toronto, Canada',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    rating: 4,
    text: 'The Greek Islands tour exceeded my expectations. The itinerary was well-planned, allowing us to see all the major attractions while still having free time to explore on our own. Great value for the price!',
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    location: 'Madrid, Spain',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1961&q=80',
    rating: 5,
    text: 'Japan Cultural Tour was the trip of a lifetime! Our guide was incredibly knowledgeable about Japanese history and culture. The accommodations were excellent, and the food was amazing. I cant wait to book my next trip with TravelWorld!',
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Travelers Say</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">Read testimonials from our satisfied customers who have experienced our travel services.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-lg relative">
              <div className="absolute -top-4 -right-4 bg-blue-600 rounded-full p-2">
                <Quote className="h-6 w-6 text-white" />
              </div>
              
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-14 h-14 rounded-full object-cover mr-4" 
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-gray-600 text-sm">{testimonial.location}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              
              <p className="text-gray-700">{testimonial.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Share Your Experience</h3>
          <p className="text-gray-700 mb-6">We'd love to hear about your travel experience with us. Leave a review and help others find their perfect vacation!</p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300">
            Write a Review
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;