import { CurrencyProvider } from '../contexts/CurrencyContext.jsx';
import Header from './Header.jsx';
import HeroSection from './HeroSection.jsx';
import FeatureHighlights from './FeatureHighlights.jsx';
import ManufacturingVideo from './ManufacturingVideo.jsx';
import ProductGrid from './ProductGrid.jsx';
import LogisticsSection from './LogisticsSection.jsx';

import FAQSection from './FAQSection.jsx';
import RFQForm from './RFQForm.jsx';
import StickyBottomBar from './StickyBottomBar.jsx';
import Footer from './Footer.jsx';

function PageContent({ products }) {

  const handleRequestQuote = (product) => {
    console.log('Request quote for:', product.name);
    // This will be connected to the RFQ form later
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-emerald-600 text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
      >
        Skip to main content
      </a>
      
      <Header />
      <HeroSection />
      
      <main id="main-content" role="main">
        <FeatureHighlights />
        
        {/* Manufacturing Video Section */}
        <ManufacturingVideo />
        
        {/* Products Section */}
        <section id="products" className="py-16 bg-white dark:bg-gray-900" aria-labelledby="products-heading">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 id="products-heading" className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Available Clearance Products
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Proven microfiber essentials, ready for immediate export at unbeatable clearance prices
              </p>
            </div>
            <ProductGrid 
              products={products} 
              onRequestQuote={handleRequestQuote}
            />
          </div>
        </section>

        {/* Logistics Section */}
        <LogisticsSection />



        {/* FAQ Section */}
        <FAQSection />

        {/* RFQ Form */}
        <RFQForm />
      </main>

      {/* Footer */}
      <Footer />

      {/* Sticky Bottom Bar */}
      <StickyBottomBar />
    </div>
  );
}

export default function MicrofiberClearancePage({ products }) {
  return (
    <CurrencyProvider initialCurrency="THB">
      <PageContent products={products} />
    </CurrencyProvider>
  );
}