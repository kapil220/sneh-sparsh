// components/sections/InteriorDesignServices.jsx
"use client";
import { useState } from 'react';
import Image from 'next/image';

const designOptions = [
  {
    id: 'consultation',
    name: 'Consultation',
    image: '/images/consultation-design.jpg',
    price: 150,
    features: ['2-Hour Session', 'Color Scheme Advice', 'Layout Recommendations', 'Style Direction', 'Budget Planning']
  },
  {
    id: 'standard',
    name: 'Standard Package',
    image: '/images/standard-design.jpg',
    price: 450,
    features: ['Full Room Design', 'Furniture Selection', '3D Visualization', 'Shopping List', 'Two Revision Rounds']
  },
  {
    id: 'premium',
    name: 'Premium Package',
    image: '/images/premium-design.jpg',
    price: 950,
    features: ['Complete Home Design', 'Custom Furniture', 'Material Samples', 'Project Management', 'Contractor Coordination']
  },
  {
    id: 'commercial',
    name: 'Commercial Spaces',
    image: '/images/commercial-design.jpg',
    price: 1200,
    features: ['Office/Retail Design', 'Brand Integration', 'Ergonomic Solutions', 'Acoustic Planning', 'Traffic Flow Optimization']
  }
];

export default function InteriorDesignServices() {
  const [selectedDesign, setSelectedDesign] = useState('standard');

  const handleDesignSelect = (designId) => {
    setSelectedDesign(designId);
  };

  return (
    <section id="interior-design-services" className="py-20 bg-gradient-to-r from-stone-900 to-stone-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-100 mb-4">Bespoke Interior Design Services</h2>
          <p className="text-stone-300 max-w-2xl mx-auto">
            Transform your space with our expert interior design solutions. 
            From single-room makeovers to complete home transformations, we bring your vision to life.
          </p>
          <div className="w-24 h-1 bg-stone-500 mx-auto mt-4"></div>
        </div>
        
        {/* Design Options */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-8 text-stone-200 text-center">Our Design Packages</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {designOptions.map((design) => (
              <div 
                key={design.id}
                className={`border rounded-lg overflow-hidden transition-all duration-300 cursor-pointer h-full ${
                  selectedDesign === design.id 
                    ? 'border-stone-400 shadow-lg transform scale-102 bg-stone-800' 
                    : 'border-stone-700 hover:border-stone-500 bg-stone-800'
                }`}
                onClick={() => handleDesignSelect(design.id)}
              >
                <div className="relative h-52">
                  <Image
                    src={design.image}
                    alt={design.name}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="p-5">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-xl font-semibold text-stone-200">{design.name}</h4>
                    <div className="text-stone-300 font-bold">
                      ${design.price}
                      <span className="text-sm font-normal text-stone-400">/package</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-2">
                    {design.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-stone-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-stone-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-6 text-center">
                    <button className={`px-6 py-2 rounded-md font-medium transition duration-300 ${
                      selectedDesign === design.id 
                        ? 'bg-stone-600 text-stone-100' 
                        : 'bg-stone-700 text-stone-300 hover:bg-stone-600 hover:text-stone-200'
                    }`}>
                      {selectedDesign === design.id ? 'Selected' : 'Select Package'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

       
        
        {/* Contact CTA */}
        <div className="mt-20 text-center">
          <div className="bg-stone-800 p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
            <h3 className="text-2xl font-semibold text-stone-200 mb-4">Ready to Transform Your Space?</h3>
            <p className="text-stone-400 mb-6">Contact our design team to discuss your project and schedule a consultation.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="/contact" className="bg-stone-600 text-stone-100 py-3 px-8 rounded-md font-medium hover:bg-stone-500 transition duration-300">
                Contact Us
              </a>
              <a href="/portfolio" className="border border-stone-600 text-stone-300 py-3 px-8 rounded-md font-medium hover:bg-stone-700 hover:border-stone-500 transition duration-300">
                View Portfolio
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}