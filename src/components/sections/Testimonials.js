// components/sections/Testimonials.jsx
"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "Manhattan, NY",
    photo: "/images/client-1.jpg",
    text: "Their eye for detail transformed our outdated living space into a stunning contemporary haven. The designers perfectly captured our style while introducing elements we would have never considered. Worth every penny!",
    project: "Full Home Redesign",
    rating: 5
  },
  {
    id: 2,
    name: "Marcus Chen",
    location: "Los Angeles, CA",
    photo: "/images/client-2.jpg",
    text: "As a restaurant owner, I needed a space that would stand out. Their commercial design team delivered beyond my expectations, creating an ambiance that customers constantly compliment. The increased foot traffic speaks for itself.",
    project: "Restaurant Interior",
    rating: 5
  },
  {
    id: 3,
    name: "Olivia Williams",
    location: "Chicago, IL",
    photo: "/images/client-3.jpg",
    text: "Working with this team on my apartment renovation was a dream. They maximized my small space with clever storage solutions and a gorgeous color palette. My home finally feels both functional and sophisticated.",
    project: "Apartment Renovation",
    rating: 4
  },
  {
    id: 4,
    name: "James Rodriguez",
    location: "Miami, FL",
    photo: "/images/client-4.jpg",
    text: "Our office redesign has completely transformed our company culture. The thoughtful ergonomic solutions and innovative use of space has improved workflow and employee satisfaction. Their commercial expertise is unmatched.",
    project: "Corporate Office Design",
    rating: 5
  },
  {
    id: 5,
    name: "Priya Patel",
    location: "Austin, TX",
    photo: "/images/client-5.jpg",
    text: "The premium package was worth every cent. From concept to completion, their attention to detail was impeccable. They sourced extraordinary statement pieces that make our home truly one-of-a-kind.",
    project: "Luxury Home Styling",
    rating: 5
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        setIsAnimating(true);
        setActiveIndex((current) => (current + 1) % testimonials.length);
        setTimeout(() => setIsAnimating(false), 500);
      }
    }, 6000);
    
    return () => clearInterval(interval);
  }, [isAnimating]);
  
  const handleDotClick = (index) => {
    if (!isAnimating && index !== activeIndex) {
      setIsAnimating(true);
      setActiveIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };
  
  const handlePrevClick = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };
  
  const handleNextClick = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setActiveIndex((current) => (current + 1) % testimonials.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-r from-stone-900 to-stone-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Client Testimonials</h2>
          <p className="text-stone-400 max-w-2xl mx-auto">
            See what our clients say about their transformation journey with our design team.
          </p>
          <div className="w-24 h-1 bg-stone-500 mx-auto mt-4"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto">
          {/* Decorative Elements */}
          <div className="absolute -top-10 -left-10 h-40 w-40 border-l-2 border-t-2 border-stone-700 hidden lg:block"></div>
          <div className="absolute -bottom-10 -right-10 h-40 w-40 border-r-2 border-b-2 border-stone-700 hidden lg:block"></div>
          
          {/* Testimonial Carousel */}
          <div className="relative min-h-[400px] md:min-h-[320px]">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`absolute w-full transition-all duration-500 ${
                  index === activeIndex 
                    ? 'opacity-100 z-10 translate-x-0' 
                    : index < activeIndex 
                      ? 'opacity-0 z-0 -translate-x-full' 
                      : 'opacity-0 z-0 translate-x-full'
                }`}
                style={{ display: index === activeIndex ? 'block' : 'none' }}
              >
                <div className="bg-stone-800 rounded-lg p-8 md:p-12 shadow-xl border border-stone-700">
                  <div className="flex flex-col md:flex-row items-center mb-8">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 md:mb-0 md:mr-8 border-2 border-stone-600">
                      <Image
                        src={testimonial.photo}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-semibold text-stone-100">{testimonial.name}</h3>
                      <p className="text-stone-400">{testimonial.location}</p>
                      <p className="text-stone-500 text-sm mt-1">Project: {testimonial.project}</p>
                      <div className="flex mt-2">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-5 w-5 ${i < testimonial.rating ? 'text-amber-400' : 'text-stone-600'}`}
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
                      className="absolute -top-4 -left-2 h-12 w-12 text-stone-700 opacity-50"
                      fill="currentColor"
                      viewBox="0 0 32 32"
                      aria-hidden="true"
                    >
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                    <p className="text-lg md:text-xl text-stone-300 italic leading-relaxed">
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
            className="absolute top-1/2 -left-4 md:-left-6 transform -translate-y-1/2 bg-stone-800 hover:bg-stone-700 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-stone-500 border border-stone-700 shadow-lg transition-all duration-300"
            aria-label="Previous testimonial"
            disabled={isAnimating}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={handleNextClick}
            className="absolute top-1/2 -right-4 md:-right-6 transform -translate-y-1/2 bg-stone-800 hover:bg-stone-700 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-stone-500 border border-stone-700 shadow-lg transition-all duration-300"
            aria-label="Next testimonial"
            disabled={isAnimating}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        {/* Dots Navigation */}
        <div className="flex justify-center mt-10">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-3 w-3 mx-1.5 rounded-full focus:outline-none transition-all duration-300 ${
                index === activeIndex 
                  ? 'bg-stone-300 w-6' 
                  : 'bg-stone-600 hover:bg-stone-500'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
              disabled={isAnimating}
            />
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-stone-400 mb-6 italic text-lg">Join our satisfied clients and transform your space today</p>
          <a href="/portfolio" className="inline-block bg-stone-700 hover:bg-stone-600 text-stone-200 py-3 px-8 rounded-md font-medium transition duration-300 border border-stone-600">
            View Our Portfolio
          </a>
        </div>
      </div>
    </section>
  );
}