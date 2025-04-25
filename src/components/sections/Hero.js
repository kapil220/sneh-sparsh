'use client';
import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const [scale, setScale] = useState(1);
  const [opacity, setOpacity] = useState(0);
  
  useEffect(() => {
    // Fade in content on component mount
    setTimeout(() => setOpacity(1), 300);
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxZoom = 1.2;
      const zoomFactor = Math.min(scrollY / 800, 0.2);
      setScale(1 + zoomFactor);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Video section taking 75% of height */}
      <div className="relative h-3/4">
        <video
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-500 ease-out"
          style={{ transform: `scale(${scale})` }}
        >
          <source src="/video/1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/70 z-10" />
        
        {/* Centered Headline */}
        <div 
          className="absolute inset-0 flex items-center justify-center z-20 transition-opacity duration-1000"
          style={{ opacity }}
        >
          <h1 className="text-white text-5xl md:text-7xl font-bold text-center px-4 tracking-tight">
            <span className="block mb-2">Design That</span>
            <span className="block text-6xl md:text-8xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Inspires
            </span>
          </h1>
        </div>
      </div>
      
      {/* Bottom content section taking 25% of height */}
      <div className="relative h-1/4 bg-gradient-to-r from-stone-900 to-stone-800 z-20">
        <div className="container mx-auto px-6 h-full">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 h-full py-6">
            <div className="text-white w-full md:w-1/2">
              <p className="text-lg md:text-xl mb-4 leading-relaxed font-light opacity-90">
                Transform your space with bold creativity and timeless elegance.
              </p>
              <div className="flex flex-row gap-4">
                <button className="bg-white text-stone-900 py-2 px-6 rounded-full text-lg font-semibold hover:bg-blue-50 transition duration-300 flex items-center justify-center gap-2 group">
                  Explore Designs
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button className="border border-white text-white py-2 px-6 rounded-full text-lg font-semibold hover:bg-white/10 transition duration-300">
                  Our Portfolio
                </button>
              </div>
            </div>
            
            <div className="w-full md:w-1/3 hidden md:block">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20 h-full">
                <h3 className="text-white text-xl font-medium mb-3">Ready to transform your space?</h3>
                <div className="bg-white/10 p-2 rounded mb-2 cursor-pointer hover:bg-white/20 transition">
                  <p className="text-white font-medium">Schedule a consultation</p>
                </div>
                <div className="bg-white/10 p-2 rounded cursor-pointer hover:bg-white/20 transition">
                  <p className="text-white font-medium">Request a quote</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}