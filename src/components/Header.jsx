import { useState } from 'react';
import CurrencySwitcher from './CurrencySwitcher.jsx';
import DarkModeToggle from './DarkModeToggle.jsx';
import { useCurrency } from '../contexts/CurrencyContext.jsx';

const navigation = [
  { name: 'Products', href: '#products' },
  { name: 'Logistics', href: '#logistics' },
  { name: 'RFQ', href: '#rfq-form' },
  { name: 'FAQ', href: '#faq' }
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currency, changeCurrency } = useCurrency();

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const scrollToRFQ = () => {
    scrollToSection('#rfq-form');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-blue-100 dark:border-blue-800/50" role="banner">
      <div className="container mx-auto px-2 sm:px-4 xl:px-6 2xl:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Brand */}
          <div className="flex-shrink-0 flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 14H9v-2h2v2zm0-4H9V7h2v6zm6 4h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
              </div>
              <h1 className="text-lg sm:text-xl xl:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
                <a href="#" className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded" aria-label="Microfiber Sale - Home">
                  <span className="hidden sm:inline">Microfiber Sale</span>
                  <span className="sm:hidden">Microfiber Sale</span>
                </a>
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" role="navigation" aria-label="Main navigation">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus-visible:text-blue-600 dark:focus-visible:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 focus-visible:bg-blue-50 dark:focus-visible:bg-blue-900/20 px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded-lg min-h-[44px] relative group"
                aria-label={`Navigate to ${item.name} section`}
              >
                {item.name}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-200 group-hover:w-full group-hover:left-0 group-focus-visible:w-full group-focus-visible:left-0"></span>
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-3 xl:space-x-4">
            <DarkModeToggle />
            <CurrencySwitcher
              currency={currency}
              onCurrencyChange={changeCurrency}
            />
            <button
              onClick={scrollToRFQ}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus-visible:from-blue-700 focus-visible:to-blue-800 text-white px-4 lg:px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 min-h-[44px] shadow-lg hover:shadow-xl transform hover:scale-105 focus-visible:scale-105"
              aria-label="Get clearance pricing - navigate to quote form"
            >
              <span className="hidden lg:inline flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 4V2C7 1.45 7.45 1 8 1S9 1.55 9 2V4H15V2C15 1.45 15.45 1 16 1S17 1.55 17 2V4H20C21.1 4 22 4.9 22 6V20C22 21.1 21.1 22 20 22H4C2.9 22 2 21.1 2 20V6C2 4.9 2.9 4 4 4H7ZM20 8H4V20H20V8ZM12 17L7 12L8.41 10.59L11 13.17L15.59 8.58L17 10L12 17Z" />
                </svg>
                Get Quote
              </span>
              <span className="lg:hidden">Quote</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-1 sm:space-x-2">
            <DarkModeToggle />
            <CurrencySwitcher
              currency={currency}
              onCurrencyChange={changeCurrency}
            />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus-visible:text-blue-600 dark:focus-visible:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded-lg p-2 min-h-[44px] min-w-[44px] transition-all duration-200"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? "Close main menu" : "Open main menu"}
            >
              <span className="sr-only">{mobileMenuOpen ? "Close" : "Open"} main menu</span>
              {!mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div id="mobile-menu" className="md:hidden border-t border-blue-100 dark:border-blue-800/50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md" role="navigation" aria-label="Mobile navigation">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus-visible:text-blue-600 dark:focus-visible:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:bg-blue-50 dark:focus:bg-blue-900/20 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset min-h-[44px]"
                  aria-label={`Navigate to ${item.name} section`}
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={scrollToRFQ}
                className="block w-full text-left mt-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus-visible:from-blue-700 focus-visible:to-blue-800 text-white px-4 py-3 rounded-lg text-base font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset min-h-[44px] shadow-lg"
                aria-label="Get clearance pricing - navigate to quote form"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7 4V2C7 1.45 7.45 1 8 1S9 1.55 9 2V4H15V2C15 1.45 15.45 1 16 1S17 1.55 17 2V4H20C21.1 4 22 4.9 22 6V20C22 21.1 21.1 22 20 22H4C2.9 22 2 21.1 2 20V6C2 4.9 2.9 4 4 4H7ZM20 8H4V20H20V8ZM12 17L7 12L8.41 10.59L11 13.17L15.59 8.58L17 10L12 17Z" />
                  </svg>
                  Get Clearance Pricing
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}