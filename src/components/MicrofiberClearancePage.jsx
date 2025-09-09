import { CurrencyProvider } from '../contexts/CurrencyContext.jsx';
import { LanguageProvider, useLanguage } from '../contexts/LanguageContext.jsx';
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
  const { t, isReady } = useLanguage();

  const handleRequestQuote = (product) => {
    console.log('Request quote for:', product.name);
    // This will be connected to the RFQ form later
  };

  // Show loading state while i18n is initializing
  if (!isReady) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-emerald-600 text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
      >
        {t('header.skipToMain')}
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
                {t('products.title')}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
                {t('products.subtitle')}
              </p>
              <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-semibold">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v10z"/>
                </svg>
                {t('products.containerInfo')}
              </div>
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
    <LanguageProvider initialLanguage="en">
      <CurrencyProvider initialCurrency="THB">
        <PageContent products={products} />
      </CurrencyProvider>
    </LanguageProvider>
  );
}