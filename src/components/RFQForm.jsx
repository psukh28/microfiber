import { useState } from 'react';
import { validateRFQForm } from '../utils/validation.js';

export default function RFQForm() {
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    country: '',
    products: '',
    quantity: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const validation = validateRFQForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('https://formspree.io/f/mjkeazaz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          company: formData.company,
          name: formData.name,
          phone: formData.phone,
          country: formData.country,
          products: formData.products,
          quantity: formData.quantity,
          message: formData.message,
          _replyto: formData.email,
          _subject: `Container Quote Request - ${formData.company}`,
          _format: 'plain'
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          company: '',
          name: '',
          email: '',
          phone: '',
          country: '',
          products: '',
          quantity: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="rfq-form" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              GET CONTAINER PRICING
            </div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Request Your Quote
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Get factory-direct pricing for your container order. Simple, fast, professional.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            {/* Success Message */}
            {submitStatus === 'success' && (
              <div className="bg-green-50 dark:bg-green-900/20 border-b border-green-200 dark:border-green-800 p-6">
                <div className="flex items-center justify-center">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded-full">
                      <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">Quote Request Sent!</h3>
                      <p className="text-green-700 dark:text-green-300">We'll respond within 24 hours with your container pricing.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {submitStatus === 'error' && (
              <div className="bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800 p-6">
                <div className="flex items-center justify-center">
                  <div className="flex items-center gap-3">
                    <div className="bg-red-100 dark:bg-red-900/50 p-2 rounded-full">
                      <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">Submission Failed</h3>
                      <p className="text-red-700 dark:text-red-300">Please try again or email us directly.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="p-8" noValidate>
              {/* Essential Information */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors ${
                        errors.company ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                    />
                    {errors.company && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.company}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors ${
                        errors.name ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors ${
                        errors.email ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Order Details */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  Order Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Container Quantity
                    </label>
                    <select
                      id="quantity"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
                    >
                      <option value="">Select quantity</option>
                      <option value="1 x 20ft container">1 x 20ft container</option>
                      <option value="2 x 20ft containers">2 x 20ft containers</option>
                      <option value="3+ x 20ft containers">3+ x 20ft containers</option>
                      <option value="Regular monthly orders">Regular monthly orders</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="products" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Product Interest
                    </label>
                    <select
                      id="products"
                      name="products"
                      value={formData.products}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
                    >
                      <option value="">Select product type</option>
                      <option value="Cleaning cloths & towels">Cleaning cloths & towels</option>
                      <option value="Wash mitts & gloves">Wash mitts & gloves</option>
                      <option value="Mixed assortment">Mixed assortment</option>
                      <option value="Specific products (see message)">Specific products (see message)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  Additional Details
                </h3>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message (Optional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
                      placeholder="Any specific requirements, timeline, or questions..."
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-3">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending Request...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                      </svg>
                      Send Quote Request
                    </span>
                  )}
                </button>
                
                <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                  * Required fields • We respond within 24 hours • No spam, ever
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}