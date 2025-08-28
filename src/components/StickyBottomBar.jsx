import { useState, useEffect } from 'react';

export default function StickyBottomBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      const footer = document.querySelector('footer');
      
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Show sticky bar after scrolling past hero but hide when footer is visible
        const showAfterHero = window.scrollY > heroHeight * 0.8;
        const hideForFooter = footerRect.top < windowHeight - 80; // Account for sticky bar height
        
        setIsVisible(showAfterHero && !hideForFooter);
      } else {
        // Fallback if footer not found
        setIsVisible(window.scrollY > heroHeight * 0.8);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Add/remove body padding based on sticky bar visibility
  useEffect(() => {
    if (isVisible) {
      document.body.style.paddingBottom = '80px';
    } else {
      document.body.style.paddingBottom = '0';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.paddingBottom = '0';
    };
  }, [isVisible]);

  const scrollToRFQ = () => {
    const element = document.querySelector('#rfq-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg"
      role="banner"
      aria-label="Sticky contact bar"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                Factory-Direct Microfiber Stock
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Special bulk pricing • 1M+ units ready
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <a 
              href="tel:+66802065413" 
              className="hidden sm:flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 focus-visible:text-emerald-700 dark:focus-visible:text-emerald-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded-md px-2 py-1 min-h-[44px]"
              aria-label="Call us now at +66 80 206 5413"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-sm font-medium">Call Now</span>
            </a>
            
            <button
              onClick={scrollToRFQ}
              className="bg-emerald-600 hover:bg-emerald-700 focus-visible:bg-emerald-700 text-white px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 min-h-[44px]"
              aria-label="Talk to sales - navigate to quote request form"
            >
              Talk to Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}