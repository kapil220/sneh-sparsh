// components/sections/Packages.jsx
import Link from 'next/link';
import Image from 'next/image';
import { packages } from '@/lib/data';

export default function Packages() {
  return (
    <section id="packages" className="py-20 bg-stone-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-100 mb-4">Premium Design Packages</h2>
          <p className="text-stone-300 max-w-2xl mx-auto">
            Explore our carefully curated interior design packages created to transform your space into a stunning reflection of your style and personality.
          </p>
          <div className="w-24 h-1 bg-amber-600 mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div key={pkg.id} className="bg-stone-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2">
              <div className="relative h-60">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 bg-stone-600 text-white py-1 px-3 rounded-full font-semibold">
                  {pkg.duration}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-stone-100 mb-2">{pkg.title}</h3>
                <div className="flex items-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <span className="text-stone-400 ml-1">{pkg.rating} ({pkg.reviewCount} reviews)</span>
                </div>
                <p className="text-stone-300 mb-4">{pkg.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                <Link href={`/packages/${pkg.slug}`} className="block w-full text-center bg-stone-600 hover:bg-stone-700 text-white font-medium py-2 px-4 rounded-md transition duration-300">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/packages" className="inline-flex items-center text-amber-500 font-semibold hover:text-amber-400 transition duration-300">
            View All Design Packages
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}