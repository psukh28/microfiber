const logisticsInfo = [
  {
    title: "Incoterms",
    content: "FOB Bangkok, CIF, DDP available",
    description: "Flexible shipping terms to match your import requirements and budget.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    )
  },
  {
    title: "Payment Terms",
    content: "30% deposit, 70% before shipment",
    description: "Standard B2B payment terms with T/T wire transfer. LC available for large orders.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    )
  },
  {
    title: "Lead Time",
    content: "2-5 days (stock items)",
    description: "Ready inventory ships immediately. Custom packaging may require additional time.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: "Packaging",
    content: "Export cartons, retail-ready",
    description: "Professional packaging suitable for retail display or warehouse distribution.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    )
  },
  {
    title: "Compliance",
    content: "CE, CPSIA, REACH compliant",
    description: "All products meet international safety and quality standards for global markets.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: "Samples",
    content: "Free samples available",
    description: "Request product samples to verify quality before placing your order.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2z" />
      </svg>
    )
  }
];

export default function LogisticsSection() {
  return (
    <section id="logistics" className="py-16 bg-white dark:bg-gray-900" aria-labelledby="logistics-heading">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 id="logistics-heading" className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Logistics & Terms
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Streamlined processes and flexible terms designed for international B2B buyers. 
            We handle the complexity so you can focus on your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="list" aria-label="Logistics information and terms">
          {logisticsInfo.map((item, index) => (
            <div 
              key={index}
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md focus-within:shadow-md transition-shadow duration-300"
              role="listitem"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 text-emerald-600 dark:text-emerald-400 mt-1" aria-hidden="true">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-emerald-600 dark:text-emerald-400 font-medium mb-2">
                    {item.content}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-8 border border-emerald-200 dark:border-emerald-800">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-4">
              Need Custom Logistics Solutions?
            </h3>
            <p className="text-emerald-800 dark:text-emerald-200 mb-6 max-w-2xl mx-auto">
              Our logistics team can arrange door-to-door delivery, customs clearance, and special handling 
              for large orders. Contact us to discuss your specific requirements.
            </p>
            <button 
              onClick={() => {
                const rfqSection = document.getElementById('rfq-form');
                if (rfqSection) {
                  rfqSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-emerald-600 hover:bg-emerald-700 focus-visible:bg-emerald-700 text-white px-6 py-3 rounded-md font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-emerald-900 min-h-[48px]"
              aria-label="Discuss custom logistics solutions - navigate to quote request form"
            >
              Discuss Logistics
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}