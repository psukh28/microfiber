const logisticsInfo = [
  {
    title: "Minimum Order",
    content: "20ft container minimum",
    description: "Mix and match any products • Approximately 1,000-1,500 units per container",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )
  },
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
            Container Export Program
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Streamlined bulk ordering with 20ft container minimums for maximum value
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="Container export program details">
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