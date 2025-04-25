'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { packages } from '@/lib/data';

export default function AllPackages() {
  const [sortBy, setSortBy] = useState('recommended');

  // Sort packages
  const sortedPackages = [...packages].sort((a, b) => {
    const levels = { 'Basic': 1, 'Standard': 2, 'Premium': 3, 'Complete': 4 };
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'level-basic') return levels[a.duration] - levels[b.duration];
    if (sortBy === 'level-premium') return levels[b.duration] - levels[a.duration];
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // recommended
  });

  return (
    <div className="bg-stone-900 text-stone-300 min-h-screen py-32">
      <div className="bg-stone-900 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-stone-100 mb-4">Explore Our Design Packages</h1>
          <p className="text-stone-400 max-w-2xl mx-auto">
            Discover our carefully crafted interior design services created to transform your living spaces into stunning, functional environments that reflect your unique style.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-stone-400">
            Showing <span className="font-semibold text-stone-200">{sortedPackages.length}</span> packages
          </p>
          <div className="flex items-center">
            <label htmlFor="sort" className="text-stone-400 mr-2">Sort by:</label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-stone-800 border border-stone-600 text-stone-200 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="level-basic">Service Level: Basic to Complete</option>
              <option value="level-premium">Service Level: Complete to Basic</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {sortedPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {sortedPackages.map((pkg) => (
              <div key={pkg.id} className="bg-stone-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2 border border-stone-700">
                <div className="relative h-60">
                  <Image src={pkg.image} alt={pkg.title} fill className="object-cover" />
                  <div className="absolute top-4 right-4 bg-amber-600 text-white py-1 px-3 rounded-full font-semibold">{pkg.duration}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-stone-100 mb-2">{pkg.title}</h3>
                  <div className="flex items-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <span className="text-stone-400 ml-1">{pkg.rating} ({pkg.reviewCount} reviews)</span>
                  </div>
                  <p className="text-stone-300 mb-4">
                    {pkg.description.length > 100 ? pkg.description.substring(0, 100) + '...' : pkg.description}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-stone-400 ml-2">{pkg.location}</span>
                    </div>
                    <div className="text-2xl font-bold text-amber-500">
                      ${pkg.price}
                      <span className="text-sm font-normal text-stone-400">/room</span>
                    </div>
                  </div>
                  <Link href={`/packages/${pkg.slug}`} className="block w-full text-center bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-md transition duration-300">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-stone-800 rounded-lg border border-stone-700">
            <h3 className="text-xl font-bold text-stone-200 mb-2">No packages available</h3>
          </div>
        )}
      </div>
    </div>
  );
}
