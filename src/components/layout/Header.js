'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Search } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  
  // Handle scroll event to change header style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isSearchOpen) setIsSearchOpen(false);
  };
  
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };
  
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  
  // Determine if link is active
  const isActive = (path) => {
    return pathname === path;
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500  ${
        isScrolled 
          ? 'bg-stoone-600 backdrop-blur-md shadow-lg py-6' 
          : 'bg-gradient-to-b from-black/50 to-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative h-10 w-10 mr-2 overflow-hidden rounded-full">
              <Image
                src="/images/logo.png"
                alt="Wanderlust Travels Logo"
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-bold tracking-tight transition-colors duration-300 ${isScrolled ? 'text-stone-900' : 'text-white'}`}>
                Wanderlust
              </span>
              <span className={`text-xs uppercase tracking-widest -mt-1 ${isScrolled ? 'text-blue-600' : 'text-blue-300'}`}>
                Travels
              </span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {['Home', 'Packages', 'Taxi Services', 'About', 'Contact', 'Blog'].map((item) => {
              const href = item === 'Home' ? '/' : 
                          item === 'Taxi Services' ? '/#taxi-services' :
                          item === 'About' ? '/#about' :
                          `/${item.toLowerCase().replace(' ', '-')}`;
              
              return (
                <Link 
                  key={item}
                  href={href}
                  className={`px-4 py-2 mx-1 rounded-full transition-all duration-300 text-sm font-medium ${
                    isActive(href) 
                      ? isScrolled 
                        ? ' bg-stone-600' 
                        : 'text-white bg-white/20 backdrop-blur-sm' 
                      : isScrolled 
                        ? 'text-stone-100 hover:text-blue-600 hover:bg-blue-50' 
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item}
                </Link>
              );
            })}
            
            {/* Search button */}
            <button 
              onClick={toggleSearch}
              className={`p-2 rounded-full ml-2 transition-colors duration-300 ${
                isScrolled 
                  ? 'text-stone-700 hover:bg-gray-100' 
                  : 'text-white/90 hover:bg-white/10'
              }`}
              aria-label="Search"
            >
              <Search size={20} />
            </button>
          </nav>

          {/* Call to action button - desktop only */}
          <div className="hidden md:block">
            <Link 
              href="/book-now"
              className={`py-2 px-5 rounded-full transition-all duration-300 ${
                isScrolled
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
                  : 'bg-white/90 backdrop-blur-md text-blue-900 hover:bg-white shadow-md hover:shadow-lg'
              }`}
            >
              Book Now
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button 
              onClick={toggleSearch}
              className={`p-2 rounded-full mr-2 transition-colors duration-300 ${
                isScrolled 
                  ? 'text-stone-700 hover:bg-gray-100' 
                  : 'text-white/90 hover:bg-white/10'
              }`}
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            
            <button 
              className="p-2 rounded-full"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <span className={isScrolled ? 'text-stone-800' : 'text-white'}>
                {isMobileMenuOpen ? 
                  <X size={24} className="transition-transform duration-300 rotate-90" /> : 
                  <Menu size={24} className="transition-transform duration-300" />
                }
              </span>
            </button>
          </div>
        </div>
        
        {/* Search bar - slides down when active */}
        {isSearchOpen && (
          <div className="pt-4 pb-2 animate-slideDown">
            <div className={`flex items-center overflow-hidden rounded-full shadow-md border ${
              isScrolled ? 'bg-white border-gray-200' : 'bg-white/90 backdrop-blur-md border-white/30'
            }`}>
              <input 
                type="text" 
                placeholder="Search destinations..." 
                className="w-full py-2 px-4 bg-transparent focus:outline-none text-stone-800"
              />
              <button className="px-4 text-blue-600 hover:text-blue-800">
                <Search size={20} />
              </button>
            </div>
          </div>
        )}
        
        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 mt-2 animate-slideDown">
            <nav className={`rounded-lg shadow-lg overflow-hidden ${
              isScrolled ? 'bg-white' : 'bg-white/90 backdrop-blur-md'
            }`}>
              {['Home', 'Packages', 'Taxi Services', 'About', 'Contact', 'Blog'].map((item) => {
                const href = item === 'Home' ? '/' : 
                            item === 'Taxi Services' ? '/#taxi-services' :
                            item === 'About' ? '/#about' :
                            `/${item.toLowerCase().replace(' ', '-')}`;
                
                return (
                  <Link 
                    key={item}
                    href={href}
                    className={`flex items-center px-4 py-3 border-b border-gray-100 last:border-none ${
                      isActive(href) 
                        ? 'text-blue-600 font-medium bg-blue-50' 
                        : 'text-stone-800 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                    onClick={closeMobileMenu}
                  >
                    {item}
                  </Link>
                );
              })}
              
              {/* Mobile call to action */}
              <div className="px-4 py-3">
                <Link 
                  href="/book-now"
                  className="block w-full py-2 px-4 text-center bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-md"
                  onClick={closeMobileMenu}
                >
                  Book Now
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}