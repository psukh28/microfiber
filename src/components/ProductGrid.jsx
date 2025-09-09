import ProductCard from './ProductCard.jsx';
import { validateProduct } from '../utils/validation.js';
import { useLanguage } from '../contexts/LanguageContext.jsx';

export default function ProductGrid({ products = [], onRequestQuote }) {
  const { t } = useLanguage();
  // Handle empty states
  if (!Array.isArray(products) || products.length === 0) {
    return (
      <div className="text-center py-12" role="status" aria-live="polite">
        <div className="text-gray-400 dark:text-gray-500 mb-4" aria-hidden="true">
          <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2L3 7v11a2 2 0 002 2h10a2 2 0 002-2V7l-7-5zM10 12a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No products available</h3>
        <p className="text-gray-500 dark:text-gray-400">Check back later for clearance items.</p>
      </div>
    );
  }

  // Validate and filter products
  const validProducts = products
    .map(product => {
      try {
        return validateProduct(product);
      } catch (error) {
        console.warn('Invalid product data:', error);
        return null;
      }
    })
    .filter(Boolean);

  if (validProducts.length === 0) {
    return (
      <div className="text-center py-12" role="status" aria-live="polite">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No valid products found</h3>
        <p className="text-gray-500 dark:text-gray-400">Please check the product data.</p>
      </div>
    );
  }

  return (
    <div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 items-start"
      role="list"
      aria-label={`${validProducts.length} clearance products available`}
    >
      {validProducts.map((product, index) => (
        <ProductCard
          key={product.sku || product.name || `product-${index}`}
          product={product}
          onRequestQuote={onRequestQuote}
        />
      ))}
    </div>
  );
}