const logisticsInfo = [
  {
    title: "Payment Terms",
    content: "30% deposit, 70% before shipment",
    description: "T/T wire transfer • LC available for large orders",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    )
  },
  {
    title: "Lead Time",
    content: "2-5 business days",
    description: "Stock items ship immediately • Custom packaging available on request (extra charge)",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: "Packaging",
    content: "Export-grade cartons",
    description: "Retail-ready presentation • Professional labeling",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    )
  },
  {
    title: "Quality Samples",
    content: "Free samples provided",
    description: "Verify quality before ordering • Fast sample delivery",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
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
            Order & Delivery Details
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Clear terms and fast processing for your bulk microfiber orders
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" role="list" aria-label="Business terms and logistics information">
            {logisticsInfo.map((item, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-lg transition-all duration-300"
                role="listitem"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-lg" aria-hidden="true">
                    <div className="text-emerald-600 dark:text-emerald-400">
                      {item.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-emerald-700 dark:text-emerald-300 font-semibold text-base mb-2">
                      {item.content}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}