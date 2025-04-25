// components/sections/TaxiServices.jsx
"use client";
import { useState } from 'react';
import Image from 'next/image';

const carOptions = [
  {
    id: 'economy',
    name: 'Economy',
    image: '/images/economy-car.jpg',
    price: 25,
    features: ['4 Passengers', 'Air Conditioning', '2 Small Bags']
  },
  {
    id: 'standard',
    name: 'Standard',
    image: '/images/standard-car.jpg',
    price: 35,
    features: ['4 Passengers', 'Air Conditioning', '3 Medium Bags', 'Free WiFi']
  },
  {
    id: 'luxury',
    name: 'Luxury',
    image: '/images/luxury-car.jpg',
    price: 75,
    features: ['4 Passengers', 'Premium Interior', '4 Large Bags', 'Free WiFi', 'Refreshments']
  },
  {
    id: 'van',
    name: 'Van',
    image: '/images/van.jpg',
    price: 60,
    features: ['8 Passengers', 'Air Conditioning', '8 Bags', 'Extra Space']
  }
];

export default function TaxiServices() {
  const [selectedCar, setSelectedCar] = useState('standard');
  const [formData, setFormData] = useState({
    pickup: '',
    destination: '',
    date: '',
    time: '',
    passengers: 1,
    contactName: '',
    contactPhone: ''
  });

  const handleCarSelect = (carId) => {
    setSelectedCar(carId);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle taxi booking submission
    console.log('Taxi booking:', { car: selectedCar, ...formData });
    alert('Your taxi booking request has been submitted! We will confirm shortly.');
  };

  return (
    <section id="taxi-services" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Premium Taxi Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Reliable and comfortable transportation for your travel needs. 
            Whether it's airport transfers or daily excursions, we've got you covered.
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-4"></div>
        </div>
        
        <div className="flex flex-col lg:flex-row">
          {/* Car Options */}
          <div className="w-full lg:w-2/3 lg:pr-12 mb-10 lg:mb-0">
            <h3 className="text-2xl font-semibold mb-6">Choose Your Ride</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {carOptions.map((car) => (
                <div 
                  key={car.id}
                  className={`border rounded-lg overflow-hidden transition-all duration-300 cursor-pointer ${
                    selectedCar === car.id 
                      ? 'border-blue-600 shadow-lg transform scale-102' 
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => handleCarSelect(car.id)}
                >
                  <div className="relative h-48">
                    <Image
                      src={car.image}
                      alt={car.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-xl font-semibold">{car.name}</h4>
                      <div className="text-blue-600 font-bold">
                        ${car.price}
                        <span className="text-sm font-normal text-gray-600">/hour</span>
                      </div>
                    </div>
                    
                    <ul className="space-y-2">
                      {car.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    {selectedCar === car.id && (
                      <div className="mt-4 text-center">
                        <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          Selected
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Booking Form */}
          <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-xl p-6">
            <h3 className="text-2xl font-semibold mb-6">Book a Taxi</h3>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="pickup" className="block text-sm font-medium text-gray-700 mb-1">Pickup Location</label>
                <input
                  type="text"
                  id="pickup"
                  name="pickup"
                  value={formData.pickup}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                <input
                  type="text"
                  id="destination"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="passengers" className="block text-sm font-medium text-gray-700 mb-1">Number of Passengers</label>
                <input
                  type="number"
                  id="passengers"
                  name="passengers"
                  min="1"
                  max="8"
                  value={formData.passengers}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  id="contactName"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  id="contactPhone"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-700 transition duration-300"
              >
                Book Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}