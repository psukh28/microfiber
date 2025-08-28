export default function Footer() {
  const currentYear = new Date().getFullYear();

  const downloadCatalog = () => {
    // This would trigger a PDF download in a real implementation
    console.log('Download catalog PDF');
  };

  return (
    <footer className="bg-gray-900 text-white" role="contentinfo">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-4">Kids Kreations Co., Ltd.</h3>
            <div className="text-sm text-emerald-400 font-semibold mb-2">Microfiber Division • Household & Auto Cleaning</div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Established infantwear manufacturer expanding into microfiber cleaning products. 
              Leveraging our textile expertise to deliver quality cleaning cloths, automotive accessories, 
              and household textiles with factory-direct pricing and reliable logistics.
            </p>
            <div className="space-y-2 text-sm text-gray-400" role="list" aria-label="Company details">
              <p role="listitem">
                <span aria-hidden="true">📍</span> 
                <span>Manufacturing Facility: Bangkok, Thailand</span>
              </p>
              <p role="listitem">
                <span aria-hidden="true">🌍</span> 
                <span>Exporting to 30+ Countries</span>
              </p>
              <p role="listitem">
                <span aria-hidden="true">✅</span> 
                <span>ISO 9001 Certified • BSCI Compliant</span>
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Export Sales</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <svg className="w-4 h-4 mt-0.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <a 
                    href="mailto:lilsoft@kidskreationsco.com" 
                    className="text-gray-300 hover:text-emerald-400 focus-visible:text-emerald-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
                    aria-label="Send email to export team"
                  >
                    lilsoft@kidskreationsco.com
                  </a>
                  <p className="text-gray-400">Primary contact for quotes</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <svg className="w-4 h-4 mt-0.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <a 
                    href="tel:+66802065413" 
                    className="text-gray-300 hover:text-emerald-400 focus-visible:text-emerald-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
                    aria-label="Call us at +66 80 206 5413"
                  >
                    +66 80 206 5413
                  </a>
                  <p className="text-gray-400">Business hours: 9 AM - 6 PM ICT</p>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <svg className="w-4 h-4 mt-0.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <div>
                  <a 
                    href="https://wa.me/15035601009" 
                    className="text-gray-300 hover:text-emerald-400 focus-visible:text-emerald-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
                    aria-label="Contact us on WhatsApp"
                  >
                    WhatsApp: +1 503 560 1009
                  </a>
                  <p className="text-gray-400">Quick responses during business hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <nav className="space-y-2" aria-label="Footer navigation">
              <button 
                onClick={downloadCatalog}
                className="block text-left text-gray-300 hover:text-emerald-400 focus-visible:text-emerald-400 transition-colors duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded min-h-[44px] py-1"
                aria-label="Download full product catalog as PDF"
              >
                <span aria-hidden="true">📄</span> Download Full Catalog (PDF)
              </button>
              <button 
                onClick={() => {
                  const element = document.querySelector('#products');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="block text-left text-gray-300 hover:text-emerald-400 focus-visible:text-emerald-400 transition-colors duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded min-h-[44px] py-1"
                aria-label="Navigate to available products section"
              >
                <span aria-hidden="true">🛍️</span> View Available Products
              </button>
              <button 
                onClick={() => {
                  const element = document.querySelector('#logistics');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="block text-left text-gray-300 hover:text-emerald-400 focus-visible:text-emerald-400 transition-colors duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded min-h-[44px] py-1"
                aria-label="Navigate to shipping and logistics information"
              >
                <span aria-hidden="true">🚚</span> Shipping & Logistics Info
              </button>
              <button 
                onClick={() => {
                  const element = document.querySelector('#rfq-form');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="block text-left text-gray-300 hover:text-emerald-400 focus-visible:text-emerald-400 transition-colors duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded min-h-[44px] py-1"
                aria-label="Navigate to quote request form"
              >
                <span aria-hidden="true">💬</span> Request Quote
              </button>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              <p>© {currentYear} Kids Kreations Co., Ltd. All rights reserved.</p>
              <p className="mt-1">Infantwear manufacturer • Microfiber division • Export specialist</p>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>🏭 Made in Thailand</span>
              <span>🌍 Worldwide Shipping</span>
              <span>✅ Quality Assured</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}