'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { packages } from '@/lib/data';
import { useEffect, useState, useRef } from 'react';

export default function ProjectDetail() {
  const params = useParams();
  const { slug } = params;
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const overviewRef = useRef(null);
  const galleryRef = useRef(null);
  const processRef = useRef(null);
  const feedbackRef = useRef(null);
  
  useEffect(() => {
    // Find the project that matches the slug
    const foundProject = packages.find(proj => proj.slug === slug);
    setProjectData(foundProject);
    setLoading(false);
    
    // Scroll to hash if present
    if (window.location.hash) {
      const hash = window.location.hash.substring(1);
      setActiveTab(hash);
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [slug]);
  
  const scrollToSection = (sectionId) => {
    setActiveTab(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Generate mock gallery images based on the project
  const galleryImages = projectData ? [
    projectData.image,
    `/images/packages/${projectData.slug}-detail-1.jpg`,
    `/images/packages/${projectData.slug}-detail-2.jpg`,
    `/images/packages/${projectData.slug}-detail-3.jpg`,
    `/images/packages/${projectData.slug}-detail-4.jpg`,
    `/images/packages/${projectData.slug}-detail-5.jpg`,
  ] : [];
  
  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-8"></div>
          <p className="text-xl text-stone-600">Loading project details...</p>
        </div>
      </div>
    );
  }
  
  // 404 state
  if (!projectData) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-stone-800 mb-4">Project Not Found</h1>
          <p className="text-stone-600 mb-8">The design project you're looking for doesn't exist or has been moved.</p>
          <Link href="/portfolio" className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-6 rounded-md transition duration-300">
            Browse Full Portfolio
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-stone-900 min-h-screen pt-8 pb-16">
      {/* Hero Section */}
      <div className="relative h-[60vh] mb-12">
        <Image
          src={projectData.image}
          alt={projectData.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/60 to-transparent"></div>
        
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <span className="inline-block bg-amber-600 text-white text-sm font-medium py-1 px-3 rounded-full mb-4">
                {projectData.title.split(' ')[0]} Design
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{projectData.title}</h1>
              <div className="flex items-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <span className="text-stone-200 ml-2">Client Satisfaction: {projectData.rating}</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {projectData.services && projectData.services.slice(0, 4).map((service, index) => (
                  <span key={index} className="bg-white/20 text-white text-sm py-1 px-3 rounded-full">
                    {service}
                  </span>
                ))}
                {projectData.services && projectData.services.length > 4 && (
                  <span className="bg-white/20 text-white text-sm py-1 px-3 rounded-full">
                    +{projectData.services.length - 4} more
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Breadcrumb Navigation */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex items-center text-sm">
          <Link href="/" className="text-stone-300 hover:text-amber-600">
            Home
          </Link>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href="/portfolio" className="text-stone-300 hover:text-amber-600">
            Portfolio
          </Link>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-amber-600">{projectData.title}</span>
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        {/* Sticky Navigation Tabs */}
        <div className="sticky top-0 z-10 bg-stone-800 shadow-md rounded-lg mb-8">
          <div className="flex overflow-x-auto hide-scrollbar">
            <button
              onClick={() => scrollToSection('overview')}
              className={`flex-shrink-0 px-6 py-4 font-medium text-sm transition duration-300 border-b-2 ${
                activeTab === 'overview' 
                  ? 'border-amber-600 text-amber-600' 
                  : 'border-transparent text-stone-300 hover:text-amber-600'
              }`}
            >
              Project Overview
            </button>
            <button
              onClick={() => scrollToSection('gallery')}
              className={`flex-shrink-0 px-6 py-4 font-medium text-sm transition duration-300 border-b-2 ${
                activeTab === 'gallery' 
                  ? 'border-amber-600 text-amber-600' 
                  : 'border-transparent text-stone-300 hover:text-amber-600'
              }`}
            >
              Gallery
            </button>
            <button
              onClick={() => scrollToSection('process')}
              className={`flex-shrink-0 px-6 py-4 font-medium text-sm transition duration-300 border-b-2 ${
                activeTab === 'process' 
                  ? 'border-amber-600 text-amber-600' 
                  : 'border-transparent text-stone-300 hover:text-amber-600'
              }`}
            >
              Design Process
            </button>
            <button
              onClick={() => scrollToSection('feedback')}
              className={`flex-shrink-0 px-6 py-4 font-medium text-sm transition duration-300 border-b-2 ${
                activeTab === 'feedback' 
                  ? 'border-amber-600 text-amber-600' 
                  : 'border-transparent text-stone-300 hover:text-amber-600'
              }`}
            >
              Client Feedback
            </button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content Area */}
          <div className="lg:w-2/3">
            {/* Project Overview */}
            <section id="overview" ref={overviewRef} className="mb-16">
              <div className="bg-stone-800 p-8 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold text-stone-300 mb-6 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Project Overview
                </h2>
                
                <div className="prose max-w-none text-stone-300 mb-8">
                  <p className="text-lg">{projectData.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-stone-700 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-stone-200 mb-4">Project Highlights</h3>
                    <ul className="space-y-3">
                      {projectData.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-stone-700 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-stone-200 mb-4">Project Details</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center justify-between">
                        <span className="text-amber-600">Duration:</span>
                        <span className="font-medium text-stone-300">{projectData.duration}</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-amber-600">Best For:</span>
                        <span className="font-medium text-stone-300">{projectData.location}</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-amber-600">Recommended Time:</span>
                        <span className="font-medium text-stone-300">{projectData.bestTime}</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-amber-600">Ideal Room Size:</span>
                        <span className="font-medium text-stone-300">{projectData.roomSize}</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-amber-600">Starting Price:</span>
                        <span className="font-medium text-stone-300">
                          {typeof projectData.price === 'number'
                            ? `$${projectData.price.toLocaleString()}`
                            : projectData.price}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Gallery Section */}
            <section id="gallery" ref={galleryRef} className="mb-16">
              <div className="bg-stone-800 p-8 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold text-stone-300 mb-6 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Project Gallery
                </h2>
                
                {/* Featured Image */}
                <div className="relative aspect-video mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={galleryImages[selectedImageIndex]}
                    alt={`${projectData.title} - Image ${selectedImageIndex + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* Thumbnail Gallery */}
                <div className="grid grid-cols-6 gap-2">
                  {galleryImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all ${
                        selectedImageIndex === index
                          ? 'border-amber-600 opacity-100 scale-105'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${projectData.title} thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </section>
            
            {/* Design Process */}
            <section id="process" ref={processRef} className="mb-16">
              <div className="bg-stone-800 p-8 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold text-stone-300 mb-6 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Our Design Process
                </h2>
                
                <div className="space-y-8">
                  {/* Process Step 1 */}
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/4 flex justify-center md:justify-start mb-4 md:mb-0">
                      <div className="flex items-center justify-center w-14 h-14 bg-amber-100 text-amber-700 rounded-full font-bold text-xl">
                        1
                      </div>
                    </div>
                    <div className="md:w-3/4">
                      <h3 className="text-xl font-semibold text-stone-200 mb-2">Initial Consultation</h3>
                      <p className="text-stone-300 mb-3">
                        We begin with an in-depth consultation to understand your lifestyle, preferences, and 
                        functional requirements. This helps us create a design that perfectly reflects your 
                        personality while meeting your everyday needs.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-stone-700 text-stone-300 text-xs py-1 px-2 rounded">Space Analysis</span>
                        <span className="bg-stone-700 text-stone-300  text-xs py-1 px-2 rounded">Style Assessment</span>
                        <span className="bg-stone-700 text-stone-300  text-xs py-1 px-2 rounded">Functional Requirements</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Process Step 2 */}
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/4 flex justify-center md:justify-start mb-4 md:mb-0">
                      <div className="flex items-center justify-center w-14 h-14 bg-amber-100 text-amber-700 rounded-full font-bold text-xl">
                        2
                      </div>
                    </div>
                    <div className="md:w-3/4">
                      <h3 className="text-xl font-semibold text-stone-200 mb-2">Concept Development</h3>
                      <p className="text-stone-300 mb-3">
                        Our designers create comprehensive design concepts that align with your vision. 
                        We prepare mood boards, color schemes, material selections, and preliminary space plans
                        for your review and feedback.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-stone-700 text-stone-300  text-xs py-1 px-2 rounded">Mood Boards</span>
                        <span className="bg-stone-700 text-stone-300  text-xs py-1 px-2 rounded">Material Selection</span>
                        <span className="bg-stone-700 text-stone-300  text-xs py-1 px-2 rounded">Space Planning</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Process Step 3 */}
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/4 flex justify-center md:justify-start mb-4 md:mb-0">
                      <div className="flex items-center justify-center w-14 h-14 bg-amber-100 text-amber-700 rounded-full font-bold text-xl">
                        3
                      </div>
                    </div>
                    <div className="md:w-3/4">
                      <h3 className="text-xl font-semibold text-stone-200 mb-2">Design Implementation</h3>
                      <p className="text-stone-300 mb-3">
                        Once the design concept is approved, we move to implementation. Our team coordinates 
                        furniture procurement, oversees installations, and manages contractors to bring your 
                        design vision to life with minimal disruption.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-stone-700 text-stone-300  text-xs py-1 px-2 rounded">Procurement</span>
                        <span className="bg-stone-700 text-stone-300  text-xs py-1 px-2 rounded">Installation</span>
                        <span className="bg-stone-700 text-stone-300  text-xs py-1 px-2 rounded">Project Management</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Process Step 4 */}
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/4 flex justify-center md:justify-start mb-4 md:mb-0">
                      <div className="flex items-center justify-center w-14 h-14 bg-amber-100 text-amber-700 rounded-full font-bold text-xl">
                        4
                      </div>
                    </div>
                    <div className="md:w-3/4">
                      <h3 className="text-xl font-semibold text-stone-200 mb-2">Final Styling & Reveal</h3>
                      <p className="text-stone-300 mb-3">
                        The final stage involves styling your space with carefully selected accessories, 
                        artwork, and decorative elements that add personality and complete the design. 
                        We then reveal your transformed space and ensure your complete satisfaction.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-stone-700 text-stone-300  text-xs py-1 px-2 rounded">Accessories</span>
                        <span className="bg-stone-700 text-stone-300  text-xs py-1 px-2 rounded">Art Placement</span>
                        <span className="bg-stone-700 text-stone-300  text-xs py-1 px-2 rounded">Final Walk-through</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Client Feedback */}
            <section id="feedback" ref={feedbackRef} className="mb-16">
              <div className="bg-stone-800 p-8 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold text-stone-300 mb-6 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  Client Feedback
                </h2>
                
                <div className="grid grid-cols-1 gap-6">
                  {/* Testimonial */}
                  <div className="border border-stone-200 rounded-lg p-6">
                    <div className="flex items-start mb-4">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                        <Image
                          src="/images/testimonials/person1.jpg"
                          alt="Client"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-stone-200">Alexandra M.</h3>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-stone-300 italic mb-4">
                      "Working with this design team was an absolute pleasure from start to finish. 
                      They truly listened to what I wanted and translated my vision into a space that 
                      exceeded my expectations. The {projectData.title} package was perfect for my 
                      needs and every detail was thoughtfully considered."
                    </p>
                    <div className="flex justify-between text-xs text-stone-300">
                      <span>Project completed: 3 months ago</span>
                      <span>New York, USA</span>
                    </div>
                  </div>
                  
                  {/* Another Testimonial */}
                  <div className="border border-stone-200 rounded-lg p-6">
                    <div className="flex items-start mb-4">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                        <Image
                          src="/images/testimonials/person2.jpg"
                          alt="Client"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-stone-200">Michael T.</h3>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-stone-300 italic mb-4">
                      "I was impressed by the team's professionalism and attention to detail. They 
                      respected my budget constraints while still delivering a stunning design that 
                      maximized the potential of my space. The {projectData.title} package was a 
                      perfect fit, and I couldn't be happier with the results."
                    </p>
                    <div className="flex justify-between text-xs text-stone-300">
                      <span>Project completed: 2 months ago</span>
                      <span>Chicago, USA</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          
          {/* Sidebar */}
          <div className="lg:w-1/3">
            {/* Call to Action Card */}
            <div className="bg-stone-800 p-6 rounded-xl shadow-md mb-8  top-24">
              <h3 className="text-xl font-bold text-stone-200 mb-4">Interested in this design?</h3>
              <p className="text-stone-300 mb-6">
                Schedule a free consultation with our design experts to discuss how we can bring this design to your space.
              </p>
              
              <div className="mb-6">
                <h4 className="font-medium text-stone-300 mb-2">Package Price</h4>
                <div className="text-2xl font-bold text-amber-600 mb-1">
                  {typeof projectData.price === 'number'
                    ? `$${projectData.price.toLocaleString()}`
                    : projectData.price}
                </div>
                <p className="text-sm text-stone-300">Starting price, customizable to your needs</p>
              </div>
              
              <div className="mb-6">
                <h4 className="font-medium text-stone-300 mb-2">Package Includes</h4>
                <ul className="space-y-2">
                  {projectData.services.map((service, index) => (
                    <li key={index} className="flex items-center text-stone-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
              
              <Link
                href={`/contact?package=${projectData.slug}`}
                className="block w-full bg-amber-600 hover:bg-amber-700 text-white font-medium text-center py-3 px-6 rounded-md transition duration-300 mb-4"
              >
                Schedule a Free Consultation
              </Link>
              
              <Link
                href="/portfolio"
                className="block w-full bg-white border border-stone-300 text-stone-600 hover:bg-stone-50 font-medium text-center py-3 px-6 rounded-md transition duration-300"
              >
                Browse Other Designs
              </Link>
            </div>
            
            {/* Related Projects */}
            <div className="bg-stone-800 p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold text-stone-200 mb-4">Related Designs</h3>
              
              <div className="space-y-4">
                {/* Show related projects based on similar styles, filtering out current project */}
                {packages
                  .filter(pkg => pkg.id !== projectData.id)
                  .slice(0, 3)
                  .map(pkg => (
                    <Link href={`/portfolio/${pkg.slug}`} key={pkg.id} className="block group">
                      <div className="flex items-center">
                        <div className="relative w-20 h-16 rounded-md overflow-hidden mr-3">
                          <Image
                            src={pkg.image}
                            alt={pkg.title}
                            fill
                            className="object-cover group-hover:scale-110 transition duration-300"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-stone-300 group-hover:text-amber-600 transition duration-300">
                            {pkg.title}
                          </h4>
                          <div className="flex items-center text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                            <span className="text-stone-400 ml-1">{pkg.rating} ({pkg.reviewCount} reviews)</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
              
              <Link
                href="/portfolio"
                className="flex items-center justify-center text-amber-600 hover:text-amber-700 font-medium mt-4"
              >
                View All Designs
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Newsletter Section */}
      <div className="container mx-auto px-4 mt-12">
        <div className="bg-stone-800 border border-stone-100 p-8 md:p-12 rounded-xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-stone-300 mb-4">
              Get design inspiration for your space
            </h2>
            <p className="text-stone-300 mb-8">
              Join our newsletter for the latest design trends, tips, and exclusive offers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-grow px-4 py-3 rounded-md border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button className="bg-amber-600 hover:bg-amber-700 text-white font-medium px-6 py-3 rounded-md transition duration-300">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-stone-300 mt-4">
              By subscribing, you agree to receive our marketing emails. You can unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}