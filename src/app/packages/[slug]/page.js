// app/packages/[slug]/page.js
'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { packages } from '@/lib/data';
import { useEffect, useState } from 'react';

export default function PackageDetail() {
  const params = useParams();
  const { slug } = params;
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Find the package that matches the slug
    const foundPackage = packages.find(pkg => pkg.slug === slug);
    setPackageData(foundPackage);
    setLoading(false);
  }, [slug]);
  
  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-8"></div>
          <p className="text-xl text-gray-600">Loading package details...</p>
        </div>
      </div>
    );
  }
  
  // 404 state
  if (!packageData) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Package Not Found</h1>
          <p className="text-gray-600 mb-8">The travel package you're looking for doesn't exist or has been removed.</p>
          <Link href="/packages" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-300">
            Browse All Packages
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center mb-8 text-sm">
        <Link href="/" className="text-gray-600 hover:text-blue-600">
          Home
        </Link>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <Link href="/packages" className="text-gray-600 hover:text-blue-600">
          Packages
        </Link>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-blue-600">{packageData.title}</span>
      </div>
      
      {/* Package Header */}
      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        <div className="lg:w-2/3">
          <div className="relative h-96 rounded-xl overflow-hidden">
            <Image
              src={packageData.image}
              alt={packageData.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute top-4 right-4 bg-blue-600 text-white py-1 px-3 rounded-full font-semibold">
              {packageData.duration}
            </div>
          </div>
        </div>
        
        <div className="lg:w-1/3">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{packageData.title}</h1>
          
          <div className="flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <span className="text-gray-600 ml-1">{packageData.rating} ({packageData.reviewCount} reviews)</span>
          </div>
          
          <div className="flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-gray-600 ml-2">{packageData.location}</span>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              ${packageData.price}
              <span className="text-sm font-normal text-gray-600">/person</span>
            </div>
            
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition duration-300 mb-4">
              Book This Package
            </button>
            
            <button className="w-full bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-3 px-4 rounded-md transition duration-300">
              Add to Wishlist
            </button>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-bold text-gray-800 mb-4">Tour Details</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-600 ml-3">Duration: {packageData.duration}</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-600 ml-3">Best Time: {packageData.bestTime || 'All Year'}</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-gray-600 ml-3">Group Size: {packageData.groupSize || 'Max 12 people'}</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <span className="text-gray-600 ml-3">Payment: Secure Online Payment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Package Description */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">About This Package</h2>
        <div className="prose max-w-none">
          <p className="text-gray-600 mb-4">{packageData.description}</p>
          <p className="text-gray-600 mb-4">
            Experience the beauty and wonders of {packageData.location} with our expertly guided tour. This {packageData.duration} adventure is designed to immerse you in the local culture, breathtaking landscapes, and unforgettable experiences.
          </p>
          <p className="text-gray-600">
            Our packages include accommodation, transportation, guided tours, and select meals to ensure your comfort and enjoyment throughout the journey. Whether you're seeking adventure, relaxation, or cultural enrichment, this package offers the perfect balance for an extraordinary travel experience.
          </p>
        </div>
      </div>
      
      {/* Package Highlights */}
      {packageData.highlights && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Package Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {packageData.highlights.map((highlight, index) => (
              <div key={index} className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mt-0.5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-gray-600">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Itinerary */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Itinerary</h2>
        <div className="space-y-6">
          <div className="border-l-4 border-blue-600 pl-4">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Day 1: Arrival</h3>
            <p className="text-gray-600">
              Arrive at your destination. Transfer to your hotel. Welcome dinner and orientation meeting with your tour guide.
            </p>
          </div>
          <div className="border-l-4 border-blue-600 pl-4">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Day 2: Exploration</h3>
            <p className="text-gray-600">
              Guided tour of main attractions. Free time for shopping and personal exploration. Evening cultural show.
            </p>
          </div>
          <div className="border-l-4 border-blue-600 pl-4">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Day 3: Adventure</h3>
            <p className="text-gray-600">
              Full-day excursion to nearby natural attractions. Optional adventure activities. Dinner at a local restaurant.
            </p>
          </div>
          <div className="border-l-4 border-blue-600 pl-4">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Final Day: Departure</h3>
            <p className="text-gray-600">
              Morning at leisure. Farewell lunch. Transfer to departure point. End of services.
            </p>
          </div>
        </div>
      </div>
      
      {/* Inclusions/Exclusions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">What's Included</h2>
          <ul className="space-y-2">
            {[
              'Accommodation in selected hotels',
              'All transportation as per itinerary',
              'Professional English-speaking guide',
              'Daily breakfast and select meals',
              'Entrance fees to attractions',
              'Welcome and farewell dinners',
              '24/7 customer support'
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">What's Not Included</h2>
          <ul className="space-y-2">
            {[
              'International or domestic flights',
              'Travel insurance',
              'Personal expenses',
              'Optional activities not in itinerary',
              'Tips and gratuities',
              'Visa fees (if applicable)',
              'Meals not specified in itinerary'
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* FAQs */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            {
              question: 'What is the cancellation policy?',
              answer: 'Free cancellation up to 30 days before departure. 50% refund for cancellations 15-29 days before departure. No refund for cancellations less than 15 days before departure.'
            },
            {
              question: 'Is travel insurance required?',
              answer: 'Travel insurance is not included but highly recommended. It should cover trip cancellation, medical expenses, and emergency evacuation.'
            },
            {
              question: 'What is the group size?',
              answer: 'Our tours typically have a maximum of 12 travelers to ensure a personalized experience.'
            },
            {
              question: 'Are meals included?',
              answer: 'Daily breakfast is included. Some lunches and dinners are included as specified in the itinerary. This gives you the flexibility to explore local cuisine on your own.'
            },
            {
              question: 'Do I need a visa?',
              answer: 'Visa requirements depend on your nationality and the destination country. Please check with the respective embassy or consulate before traveling.'
            }
          ].map((faq, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-gray-800 mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Reviews Section */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Customer Reviews</h2>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300">
            Write a Review
          </button>
        </div>
        
        <div className="space-y-6">
          {/* Review Card */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mr-4">
                JD
              </div>
              <div>
                <h4 className="font-bold text-gray-800">John Doe</h4>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                  <span className="text-sm text-gray-500 ml-2">3 months ago</span>
                </div>
              </div>
            </div>
            <p className="text-gray-600">
              Amazing experience! The tour was well organized, and our guide was knowledgeable and friendly. The accommodations exceeded our expectations, and the itinerary offered a perfect balance of scheduled activities and free time. Highly recommend!
            </p>
          </div>
          
          {/* Review Card */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold mr-4">
                JS
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Jane Smith</h4>
                <div className="flex items-center">
                  {[1, 2, 3, 4].map((star) => (
                    <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <span className="text-sm text-gray-500 ml-2">5 months ago</span>
                </div>
              </div>
            </div>
            <p className="text-gray-600">
              Overall a good tour but some of the activities felt rushed. The hotel choices were excellent and the guide was very knowledgeable. Would suggest adding an extra day to the itinerary to make it more relaxed.
            </p>
          </div>
          
          <button className="w-full py-3 border border-gray-300 rounded-md text-gray-600 font-medium hover:bg-gray-50 transition duration-300">
            Load More Reviews
          </button>
        </div>
      </div>
      
      {/* Related Packages */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 transition duration-300 hover:shadow-md">
              <div className="relative h-48">
                <div className="absolute inset-0 bg-gray-200"></div>
                <div className="absolute top-4 right-4 bg-blue-600 text-white py-1 px-3 rounded-full text-xs font-semibold">
                  7 Days
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-gray-800 mb-2">Similar Tour Package</h3>
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-600 text-sm ml-2">Destination Location</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <span className="text-gray-600 text-sm ml-1">4.5 (120)</span>
                  </div>
                  <span className="font-bold text-blue-600">$1,299</span>
                </div>
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-md transition duration-300">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="bg-blue-50 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready for Your Next Adventure?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Book this package now to secure your spot. Our customer service team is available 24/7 to assist with any questions or special requests.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-md transition duration-300">
            Book Now
          </button>
          <button className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-3 px-8 rounded-md transition duration-300">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}