export default function WhyClearanceSection() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900" aria-labelledby="clearance-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 id="clearance-heading" className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Factory-Direct Stock Available
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Special bulk pricing on ready-to-ship microfiber inventory
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <span className="text-blue-500 mr-2">🏭</span>
                  Factory-Direct Availability
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  We are offering factory-direct microfiber stock at special bulk pricing, ready to ship immediately. 
                  As the manufacturer, we can provide exceptional value by eliminating distributor markups 
                  on this ready-to-ship inventory.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <span className="text-green-500 mr-2">⚡</span>
                  Immediate Shipment Ready
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Over 1 million units are warehoused and ready for immediate shipment. 
                  This allows us to offer faster delivery times and better pricing than typical 
                  made-to-order production runs.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  Quality Assurance
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  These aren't defective or substandard products. Every item has passed our standard 
                  quality control processes and meets the same specifications as our regular production. 
                  The only difference is the exceptional pricing due to the circumstances.
                </p>
              </div>
            </div>

            {/* Visual Element */}
            <div className="lg:text-center">
              <div className="bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/30 rounded-2xl p-8 border border-emerald-300 dark:border-emerald-700">
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100 mb-4">
                  1,000,000+ Units
                </h3>
                <p className="text-emerald-800 dark:text-emerald-200 mb-6">
                  Ready for immediate shipment from our Thailand facility
                </p>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-center space-x-2 text-emerald-700 dark:text-emerald-300">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Quality controlled & tested</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-emerald-700 dark:text-emerald-300">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Retail-ready packaging</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-emerald-700 dark:text-emerald-300">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>International compliance</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                  "This situation won't last long. Once word gets out, 
                  this inventory will move quickly."
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                  — Export Sales Manager
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100 mb-2">
                📈 Limited-Time Bulk Pricing
              </h3>
              <p className="text-emerald-800 dark:text-emerald-200 mb-4">
                Special factory-direct pricing available while inventory lasts. 
                Contact us to discuss volume discounts and secure your allocation.
              </p>
              <button 
                onClick={() => {
                  const rfqSection = document.getElementById('rfq-form');
                  if (rfqSection) {
                    rfqSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-emerald-600 hover:bg-emerald-700 focus-visible:bg-emerald-700 text-white px-6 py-3 rounded-md font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-emerald-900 min-h-[48px]"
                aria-label="Request bulk pricing - navigate to quote request form"
              >
                Request Bulk Pricing
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}