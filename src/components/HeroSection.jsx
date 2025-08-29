export default function HeroSection() {
  const scrollToRFQ = () => {
    const element = document.querySelector('#rfq-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const downloadCatalog = () => {
    // Create a temporary link element and trigger download
    const link = document.createElement('a');
    link.href = '/catalog/microfiber-clearance-catalog.pdf';
    link.download = 'Drivers-Choice-Microfiber-Clearance-Catalog.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section 
      className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white relative overflow-hidden"
      role="banner"
      aria-labelledby="hero-heading"
    >


      <div className="container mx-auto px-2 sm:px-4 xl:px-6 2xl:px-8 py-12 sm:py-16 lg:py-20 xl:py-24 relative">
        <div className="text-center max-w-xs sm:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto">
          {/* Main Heading */}
          <h1 id="hero-heading" className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
            <span className="block">Microfiber Stock</span>
            <span className="block text-yellow-300">Clearance Sale</span>
          </h1>
          
          {/* Subheading */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 opacity-90 leading-relaxed px-2 sm:px-0">
            Practical cleaning solutions for automotive detailing & household use.
            <br className="hidden sm:block" />
            <span className="text-yellow-200 font-semibold">Unbeatable bulk pricing • 1M+ units in stock • Ready to ship</span>
          </p>

          {/* Product Categories */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 px-2 sm:px-0" role="list" aria-label="Product categories">
            <div className="bg-white/20 backdrop-blur-sm px-3 sm:px-4 lg:px-5 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-medium border border-white/30 flex items-center gap-2" role="listitem">
              <svg className="w-4 h-4 text-blue-200" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 14H9v-2h2v2zm0-4H9V7h2v6zm6 4h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
              <span className="hidden xs:inline">Car Wash Mitts</span>
              <span className="xs:hidden">Car Mitts</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-3 sm:px-4 lg:px-5 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-medium border border-white/30 flex items-center gap-2" role="listitem">
              <svg className="w-4 h-4 text-green-200" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span className="hidden xs:inline">Cleaning Towels</span>
              <span className="xs:hidden">Towels</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-3 sm:px-4 lg:px-5 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-medium border border-white/30 flex items-center gap-2" role="listitem">
              <svg className="w-4 h-4 text-yellow-200" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
              <span className="hidden xs:inline">Steering Covers</span>
              <span className="xs:hidden">Covers</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-2 sm:px-0">
            <button
              onClick={scrollToRFQ}
              className="w-full sm:w-auto bg-yellow-400 text-blue-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-yellow-300 focus-visible:bg-yellow-300 transition-all duration-200 transform hover:scale-105 focus-visible:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300/50 shadow-xl min-h-[48px] sm:min-h-[56px] flex items-center justify-center gap-2"
              aria-label="Get clearance pricing - navigate to quote request form"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 4V2C7 1.45 7.45 1 8 1S9 1.55 9 2V4H15V2C15 1.45 15.45 1 16 1S17 1.55 17 2V4H20C21.1 4 22 4.9 22 6V20C22 21.1 21.1 22 20 22H4C2.9 22 2 21.1 2 20V6C2 4.9 2.9 4 4 4H7ZM20 8H4V20H20V8ZM12 17L7 12L8.41 10.59L11 13.17L15.59 8.58L17 10L12 17Z"/>
              </svg>
              Get Bulk Quote Now
            </button>
            <button
              onClick={downloadCatalog}
              className="w-full sm:w-auto border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-white/10 focus-visible:bg-white/10 transition-all duration-200 transform hover:scale-105 focus-visible:scale-105 focus:outline-none focus:ring-4 focus:ring-white/30 backdrop-blur-sm min-h-[48px] sm:min-h-[56px]"
              aria-label="Download product catalog as PDF"
            >
              <span className="flex items-center justify-center space-x-2">
                <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="hidden xs:inline">Product Catalog</span>
                <span className="xs:hidden">Catalog</span>
              </span>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/20">
            <p className="text-xs sm:text-sm opacity-75 mb-3 sm:mb-4">Ready for immediate shipment worldwide</p>
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 lg:gap-8 opacity-70" role="list" aria-label="Quality certifications and capabilities">
              <div className="flex items-center gap-1 text-xs font-medium" role="listitem">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                Quality Value
              </div>
              <div className="w-1 h-1 bg-white rounded-full hidden sm:block" aria-hidden="true"></div>
              <div className="flex items-center gap-1 text-xs font-medium" role="listitem">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                ISO Certified
              </div>
              <div className="w-1 h-1 bg-white rounded-full hidden sm:block" aria-hidden="true"></div>
              <div className="flex items-center gap-1 text-xs font-medium" role="listitem">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Global Shipping
              </div>
              <div className="w-1 h-1 bg-white rounded-full hidden sm:block" aria-hidden="true"></div>
              <div className="flex items-center gap-1 text-xs font-medium" role="listitem">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
                Fast Delivery
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}