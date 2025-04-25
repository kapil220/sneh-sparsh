// components/sections/Testimonials.jsx
"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    name: "Emily Johnson",
    location: "New York, USA",
    photo: "/images/testimonial-1.jpg",
    text: "Our trip to Bali was absolutely magical! Everything was perfectly arranged, from the beautiful villa to the private tours. The local guides were knowledgeable and friendly, making our experience truly special.",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "Toronto, Canada",
    photo: "/images/testimonial-2.jpg",
    text: "The European tour exceeded all expectations. The itinerary was well-balanced between structured activities and free time to explore. The accommodations were superb and the transportation arrangements went smoothly.",
    rating: 5
  },
  {
    id: 3,
    name: "Sarah Williams",
    location: "London, UK",
    photo: "/images/testimonial-3.jpg",
    text: "Morocco was a dream come true! The desert camping experience under the stars was unforgettable. I appreciated the attention to detail and how the team handled every aspect of our journey.",
    rating: 4
  },
  {
    id: 4,
    name: "David Rodriguez",
    location: "Madrid, Spain",
    photo: "/images/testimonial-4.jpg",
    text: "The Thailand adventure package was perfect for our family. The kids loved the elephant sanctuary and we enjoyed the beautiful beaches. The travel coordinator was responsive and helpful throughout our trip.",
    rating: 5
  },
  {
    id: 5,
    name: "Aisha Patel",
    location: "Mumbai, India",
    photo: "/images/testimonial-5.jpg",
    text: "Japan in cherry blossom season was breathtaking! Our travel agent curated a perfect blend of traditional and modern experiences. The detailed itinerary with restaurant recommendations was incredibly helpful.",
    rating: 5
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleDotClick = (index) => {
    setActiveIndex(index);
  };
  
  const handlePrevClick = () => {
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  };
  
  const handleNextClick = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 bg-blue-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Travelers Say</h2>
          <p className="text-blue-200 max-w-2xl mx-auto">
            Discover the experiences of travelers who have explored the world with us.
          </p>
          <div className="w-24 h-1 bg-blue-400 mx-auto mt-4"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Carousel */}
          <div className="relative min-h-[400px] md:min-h-[300px]">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`absolute w-full transition-opacity duration-500 ${
                  index === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
                style={{ display: index === activeIndex ? 'block' : 'none' }}
              >
                <div className="bg-blue-800 rounded-lg p-8 shadow-xl">
                  <div className="flex flex-col md:flex-row items-center mb-6">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden mb-4 md:mb-0 md:mr-6">
                      <Image
                        src={testimonial.photo}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                      <p className="text-blue-200">{testimonial.location}</p>
                      <div className="flex mt-1">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-400'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <svg
                      className="absolute -top-4 -left-4 h-8 w-8 text-blue-500 opacity-50"
                      fill="currentColor"
                      viewBox="0 0 32 32"
                      aria-hidden="true"
                    >
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                    <p className="text-lg text-blue-100 italic">
                      "{testimonial.text}"
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation Buttons */}
          <button
            onClick={handlePrevClick}
            className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 bg-blue-700 hover:bg-blue-600 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Previous testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={handleNextClick}
            className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 bg-blue-700 hover:bg-blue-600 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Next testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        {/* Dots Navigation */}
        <div className="flex justify-center mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-3 w-3 mx-1 rounded-full focus:outline-none ${
                index === activeIndex ? 'bg-white' : 'bg-blue-400 hover:bg-blue-300'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}