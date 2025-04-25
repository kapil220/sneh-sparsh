'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Home, Paintbrush, Trophy, Users, ArrowRight } from 'lucide-react';

export default function AboutUs() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('about');
      if (!section) return;
      
      const sectionPosition = section.getBoundingClientRect();
      const isInViewport = sectionPosition.top < window.innerHeight * 0.75;
      
      if (isInViewport) {
        setIsVisible(true);
      }
    };
    
    // Check on initial load
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const stats = [
    { number: '12+', text: 'Years Experience' },
    { number: '250+', text: 'Projects Completed' },
    { number: '15', text: 'Design Awards' },
    { number: '30+', text: 'Expert Designers' }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-r from-stone-900 to-stone-800">
      <div className="container mx-auto px-4">
        {/* Section Header with Animation */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-5xl font-bold text-stone-100 mb-4">About Studio</h2>
          <div className="w-24 h-1 bg-stone-100 mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-stone-300 text-lg">
            Transforming spaces with thoughtful design since 2010
          </p>
        </div>
        
        {/* Main Content with Image */}
        <div className="flex flex-col lg:flex-row items-stretch gap-12 mb-20">
          {/* Left Side Content */}
          <div className={`w-full lg:w-1/2 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0 -translate-x-10'}`}>
            <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-stone-200 leading-tight">
              Creating Exceptional Spaces That Inspire and Elevate
            </h3>
            
            <p className="text-stone-300 mb-6 leading-relaxed text-lg">
              At our design studio, we believe in the transformative power of thoughtful interior design. For over 12 years,
              we've been helping clients reimagine their spaces with bespoke designs that blend aesthetics, functionality, and personal expression.
            </p>
            
            <p className="text-stone-300 mb-8 leading-relaxed">
              Our team of experienced designers approaches each project with fresh eyes and creative vision. We pride ourselves on attention to detail,
              personalized service, and creating tailor-made spaces that match your style and needs.
            </p>
            
            {/* Core Services */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {[
                { icon: <Home className="h-5 w-5" />, title: "Residential Design" },
                { icon: <Paintbrush className="h-5 w-5" />, title: "Commercial Spaces" },
                { icon: <Trophy className="h-5 w-5" />, title: "Luxury Interiors" },
                { icon: <Users className="h-5 w-5" />, title: "Consultation" },
              ].map((service, index) => (
                <div key={index} className="flex items-center">
                  <div className="bg-stone-600 p-2 rounded-md text-white mr-4">
                    {service.icon}
                  </div>
                  <h4 className="font-semibold text-lg text-stone-300">{service.title}</h4>
                </div>
              ))}
            </div>
            
            {/* Testimonial Box */}
            <div className=" text-white p-6 rounded-lg shadow-lg mb-8 relative">
              <svg className="absolute -top-4 left-6 text-stone-600 w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-lg font-medium mb-4 mt-2">
                "We don't just design spaces, we create environments that tell your story and enhance your life."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3 bg-stone-300"></div>
                <p className="font-medium">Alex Morgan, Founder & Principal Designer</p>
              </div>
            </div>
            
            {/* CTA Button */}
            <a href="/our-process" className="inline-flex items-center px-5 py-2 bg-stone-600 text-white rounded hover:bg-stone-700 transition-colors group">
              Our Design Process
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
          
          {/* Right Side Image Collage */}
          <div className={`w-full lg:w-1/2 relative transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0 translate-x-10'}`}>
            <div className="relative h-[600px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/31.jpg"
                alt="Our interior design project"
                fill
                className="object-cover"
              />
              
              {/* Stats overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-stone-900/90 to-transparent p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <p className="text-white font-bold text-2xl md:text-3xl">{stat.number}</p>
                      <p className="text-white/80 text-sm">{stat.text}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Floating accent images */}
              <div className="absolute -top-6 -right-6 w-32 h-32 rounded-lg overflow-hidden border-4 border-white shadow-lg hidden md:block">
                <Image
                  src="/images/detail.jpg"
                  alt="Design detail"
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="absolute top-1/2 -right-6 w-24 h-24 rounded-lg overflow-hidden border-4 border-white shadow-lg hidden md:block">
                <Image
                  src="/images/material.jpg"
                  alt="Material sample"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Philosophy Section */}
        <div className={`mt-20 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-stone-600 rounded-xl shadow-lg p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-stone-600/10 -skew-x-12 transform"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-stone-100">Our Design Philosophy</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div>
                  <h4 className="text-xl font-semibold mb-3 text-stone-900">Thoughtful Functionality</h4>
                  <p className="text-stone-300">We believe great design should not only look beautiful but work beautifully. Every element serves a purpose and enhances your daily experience.</p>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold mb-3 text-stone-900">Timeless Aesthetics</h4>
                  <p className="text-stone-300">While we embrace current trends, we focus on creating spaces with enduring appeal that won't feel dated after a season passes.</p>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold mb-3 text-stone-900">Sustainable Approach</h4>
                  <p className="text-stone-300">We're committed to environmentally conscious design practices, sourcing ethical materials and creating spaces that stand the test of time.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Team Preview */}
        <div className={`mt-20 text-center transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-2xl md:text-3xl font-semibold mb-8 text-stone-200">Meet Our Design Experts</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((designer) => (
              <div key={designer} className="group">
                <div className="rounded-xl overflow-hidden h-64 md:h-80 relative mb-4">
                  <div className="absolute inset-0 bg-stone-500 group-hover:opacity-20 opacity-0 transition-opacity z-10"></div>
                </div>
                <h4 className="text-lg font-semibold text-stone-300">Designer Name</h4>
                <p className="text-stone-300">Lead Designer</p>
              </div>
            ))}
          </div>
          
          <a href="/our-team" className="mt-8 inline-flex items-center text-stone-600 font-semibold hover:text-stone-800 transition-colors">
            View All Team Members
            <ArrowRight className="ml-2 w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}