'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { packages } from '@/lib/data';

export default function PortfolioGallery() {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  
  // Extract unique design styles for filtering
  const designStyles = [...new Set(packages.map(pkg => pkg.title.split(' ')[0]))];
  
  // Filter and sort packages
  const filteredProjects = packages.filter(project => {
    if (filter === 'all') return true;
    return project.title.toLowerCase().includes(filter.toLowerCase());
  });
  
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'title-asc') return a.title.localeCompare(b.title);
    if (sortBy === 'title-desc') return b.title.localeCompare(a.title);
    // Default: most recent (by ID in this case)
    return b.id - a.id;
  });

  return (
    <div className="bg-gradient-to-b from-stone-900 to-stone-800 min-h-screen">
      {/* Hero Section */}
      <div className="relative  py-24">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900 to-transparent"></div>
          <div className="grid grid-cols-3 h-full">
            {packages.slice(0, 3).map((pkg, index) => (
              <div key={index} className="relative h-full">
                <Image
                  src={pkg.image}
                  alt="Portfolio background"
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Design Portfolio</h1>
            <p className="text-xl text-stone-300 mb-8">
              Explore our collection of thoughtfully crafted interior transformations, each reflecting our commitment to creating spaces that balance aesthetics, functionality, and personal expression.
            </p>
            <div className="w-24 h-1 bg-amber-600 mx-auto"></div>
          </div>
        </div>
      </div>

      {/* Portfolio Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Filter & Sort Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          {/* Style Filter */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition duration-300 ${
                filter === 'all' 
                  ? 'bg-amber-600 text-white' 
                  : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
              }`}
            >
              All Styles
            </button>
            
            {designStyles.map((style, index) => (
              <button
                key={index}
                onClick={() => setFilter(style)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition duration-300 ${
                  filter === style 
                    ? 'bg-amber-600 text-white' 
                    : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                }`}
              >
                {style}
              </button>
            ))}
          </div>
          
          {/* Sort Options */}
          <div className="flex items-center">
            <label htmlFor="sort" className="text-stone-600 mr-3">Sort by:</label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-stone-300 text-stone-700 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="recent">Most Recent</option>
              <option value="rating">Highest Rated</option>
              <option value="title-asc">Title (A-Z)</option>
              <option value="title-desc">Title (Z-A)</option>
            </select>
          </div>
        </div>
        
        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProjects.map((project) => (
            <div 
              key={project.id} 
              className="bg-stone-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-stone-700"
            >
              <div className="relative h-64 group">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-stone-900/80 text-white py-1 px-3 rounded-full text-xs font-semibold">
                  {project.location}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Link 
                    href={`/portfolio/${project.slug}`}
                    className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-stone-300 text-stone-600 text-xs px-3 py-1 rounded-full font-medium">
                    {project.title.split(' ')[0]} Design
                  </span>
                  <div className="flex items-center">
                   
                    
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-stone-800 mb-2">{project.title}</h3>
                
                <p className="text-stone-300 text-sm mb-4">
                  {project.description.length > 100 
                    ? project.description.substring(0, 100) + '...' 
                    : project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.services && project.services.slice(0, 3).map((service, i) => (
                    <span 
                      key={i} 
                      className="text-xs text-stone-300 bg-stone-600 px-2 py-1 rounded"
                    >
                      {service}
                    </span>
                  ))}
                  {project.services && project.services.length > 3 && (
                    <span className="text-xs text-stone-300">+{project.services.length - 3} more</span>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-stone-300 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {project.duration}
                  </div>
                  
                  <Link 
                    href={`/portfolio/${project.slug}`} 
                    className="text-amber-600 hover:text-amber-700 font-medium text-sm inline-flex items-center"
                  >
                    Read More
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Empty State */}
        {sortedProjects.length === 0 && (
          <div className="bg-white rounded-lg p-8 text-center border border-stone-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-stone-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-bold text-stone-700 mb-2">No projects found</h3>
            <p className="text-stone-500 mb-4">
              No projects match your current filter criteria. Try changing your filters or check back later for new additions.
            </p>
            <button
              onClick={() => setFilter('all')}
              className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-6 rounded-md transition duration-300"
            >
              View All Projects
            </button>
          </div>
        )}
        
        {/* Contact CTA */}
        <div className="mt-20  rounded-2xl p-10 text-center ">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Transform Your Space?</h2>
          <p className="text-stone-300 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can create a personalized design that perfectly suits your style, needs, and space. Contact us today to schedule a consultation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact" className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-8 rounded-md transition duration-300">
              Schedule a Consultation
            </Link>
            <Link href="/services" className="bg-white text-stone-900 hover:bg-stone-100 font-medium py-3 px-8 rounded-md transition duration-300">
              Explore Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}