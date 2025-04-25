'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { packages } from '@/lib/data';

export default function PortfolioSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredProjects = packages.slice(0, 5); // Using the first 5 projects

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredProjects.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [featuredProjects.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredProjects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? featuredProjects.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="bg-gradient-to-r from-stone-900 to-stone-800 py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-100 mb-4">Signature Projects</h2>
          <p className="text-stone-300 max-w-2xl mx-auto">
            Transforming spaces into personalized sanctuaries that reflect your unique style and elevate everyday living.
          </p>
          <div className="w-24 h-1 bg-amber-600 mx-auto mt-4"></div>
        </div>

        <div className="relative h-[600px] overflow-hidden rounded-xl shadow-2xl">
          {/* Slide background */}
          <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
            <div className="relative w-full h-full">
              <Image
                src={featuredProjects[currentIndex].image}
                alt={featuredProjects[currentIndex].title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/60 to-transparent"></div>
            </div>
          </div>

          {/* Slide content */}
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 pb-16 md:pb-24">
              <div className="max-w-2xl">
                <span className="inline-block px-4 py-1 bg-amber-600 text-white text-sm font-medium rounded-full mb-4">
                  {featuredProjects[currentIndex].title.split(' ')[0]} Design
                </span>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {featuredProjects[currentIndex].title}
                </h3>
                <p className="text-stone-200 mb-6">
                  {featuredProjects[currentIndex].description.substring(0, 150)}...
                </p>
                <div className="flex flex-wrap gap-3 mb-8">
                  {featuredProjects[currentIndex].services && 
                    featuredProjects[currentIndex].services.slice(0, 3).map((service, i) => (
                      <span key={i} className="bg-stone-800/70 text-stone-200 px-3 py-1 text-sm rounded-full">
                        {service}
                      </span>
                    ))
                  }
                </div>
                <Link 
                  href={`/portfolio/${featuredProjects[currentIndex].slug}`}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-8 rounded-md transition duration-300 inline-flex items-center"
                >
                  View Project Details
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="absolute right-6 bottom-6 flex gap-3">
            <button 
              onClick={prevSlide}
              className="bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition duration-300"
              aria-label="Previous project"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={nextSlide}
              className="bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition duration-300"
              aria-label="Next project"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Slide indicators */}
          <div className="absolute left-0 right-0 bottom-6 flex justify-center space-x-2">
            {featuredProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index ? 'w-8 bg-amber-600' : 'w-2 bg-white/30'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link href="/portfolio" className="inline-flex items-center text-amber-500 font-semibold hover:text-amber-400 transition duration-300">
            Explore All Projects
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
