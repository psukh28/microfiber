import { useState } from 'react';

const faqs = [
  {
    question: "What's the minimum order quantity for clearance items?",
    answer: "Minimum orders start at 1,000 units per SKU, but we offer better pricing for larger quantities. Container loads (20ft/40ft) receive the best rates. Mixed SKU orders are welcome to help you reach minimum quantities."
  },
  {
    question: "Are these products defective or seconds quality?",
    answer: "No, these are first-quality products that have passed all our standard quality control processes. All items meet the same specifications as our regular production and are ready for immediate shipment from our factory warehouse."
  },
  {
    question: "How quickly can you ship, and what are the payment terms?",
    answer: "Ready stock can ship within 2-5 business days after payment confirmation. Payment terms are 30% deposit with the balance due before shipment via T/T wire transfer. Letter of Credit is available for orders over $50,000 USD."
  },
  {
    question: "Can I get samples before placing a large order?",
    answer: "Yes, we provide free samples for serious buyers. Sample shipping costs apply, but we'll credit this against your first order. Samples typically ship within 24 hours and help you verify quality before committing to larger quantities."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleKeyDown = (event, index) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleFAQ(index);
    }
  };

  return (
    <section id="faq" className="py-16 bg-white dark:bg-gray-900" aria-labelledby="faq-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 id="faq-heading" className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Common questions about our clearance inventory and ordering process
            </p>
          </div>

          <div className="space-y-4" role="list" aria-label="Frequently asked questions">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                role="listitem"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-full px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-inset hover:bg-gray-100 dark:hover:bg-gray-700 focus-visible:bg-gray-100 dark:focus-visible:bg-gray-700 transition-colors duration-200 min-h-[56px]"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                      {faq.question}
                    </h3>
                    <svg 
                      className={`w-5 h-5 text-gray-500 dark:text-gray-400 transform transition-transform duration-200 flex-shrink-0 ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                
                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  className={openIndex === index ? 'block' : 'hidden'}
                >
                  {openIndex === index && (
                    <div className="px-6 pb-4">
                      <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Additional Help */}
          <div className="mt-12 text-center">
            <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-6 border border-emerald-200 dark:border-emerald-800">
              <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100 mb-2">
                Still Have Questions?
              </h3>
              <p className="text-emerald-800 dark:text-emerald-200 mb-4">
                Our export team is standing by to answer your specific questions about products, 
                pricing, logistics, or custom requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button 
                  onClick={() => {
                    const rfqSection = document.getElementById('rfq-form');
                    if (rfqSection) {
                      rfqSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 focus-visible:bg-emerald-700 text-white px-6 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-emerald-900 min-h-[44px]"
                  aria-label="Ask a question - navigate to quote request form"
                >
                  Ask a Question
                </button>
                <a 
                  href="mailto:lilsoft@kidskreationsco.com" 
                  className="inline-flex items-center justify-center border border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white focus-visible:bg-emerald-600 focus-visible:text-white px-6 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-emerald-900 min-h-[44px]"
                  aria-label="Send email directly to export team"
                >
                  Email Direct
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}