import { useState, useEffect } from 'react';
import { convertAndFormatPrice } from '../utils/currency.js';
import { safeDisplay, safeJoin } from '../utils/validation.js';
import { useCurrency } from '../contexts/CurrencyContext.jsx';

export default function ProductCard({ product, onRequestQuote }) {
  const [imageError, setImageError] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [availableImages, setAvailableImages] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const { currency } = useCurrency();

  // Create unique ID for this card to avoid state conflicts
  const cardId = `product-${product.sku || product.name?.replace(/\s+/g, '-').toLowerCase() || 'unknown'}-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;

  const handleRequestQuote = () => {
    if (onRequestQuote) {
      onRequestQuote(product);
    }
    // Scroll to RFQ form
    const rfqSection = document.getElementById('rfq-form');
    if (rfqSection) {
      rfqSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const priceDisplay = product.unit_price_thb_no_vat
    ? convertAndFormatPrice(product.unit_price_thb_no_vat, currency)
    : 'Request bulk quote';

  // Generate possible image filenames based on your current naming pattern
  const generateImagePaths = (productName) => {
    const baseName = productName?.toLowerCase()
      .replace(/[^a-z0-9]/g, '-')  // Replace non-alphanumeric with hyphens
      .replace(/-+/g, '-')         // Replace multiple consecutive hyphens with single hyphen
      .replace(/^-|-$/g, '');      // Remove leading/trailing hyphens
    const images = [];

    // Add main product image
    images.push(`/images/products/${baseName}.jpg`);

    // Also try without "SET" for backward compatibility with existing images
    const baseNameWithoutSet = baseName.replace(/-set$/, '');
    if (baseNameWithoutSet !== baseName) {
      images.push(`/images/products/${baseNameWithoutSet}.jpg`);
    }

    // Add color variations based on product colors
    if (product.colors && product.colors.length > 0) {
      product.colors.forEach(color => {
        const colorName = color.toLowerCase().replace(/[^a-z0-9]/g, '');
        images.push(`/images/products/${baseName}-${colorName}.jpg`);
        // Also try without "SET" for color variations
        if (baseNameWithoutSet !== baseName) {
          images.push(`/images/products/${baseNameWithoutSet}-${colorName}.jpg`);
        }
      });
    }

    // Add common variations with hyphen separator
    images.push(`/images/products/${baseName}-bulk.jpg`);
    images.push(`/images/products/${baseName}-strip.jpg`);
    images.push(`/images/products/${baseName}-multi.jpg`);

    // Also try variations without "SET"
    if (baseNameWithoutSet !== baseName) {
      images.push(`/images/products/${baseNameWithoutSet}-bulk.jpg`);
      images.push(`/images/products/${baseNameWithoutSet}-strip.jpg`);
      images.push(`/images/products/${baseNameWithoutSet}-multi.jpg`);
    }
    images.push(`/images/products/${baseName}-multistrip.jpg`);
    images.push(`/images/products/${baseName}-multiple.jpg`);
    images.push(`/images/products/${baseName}-blackvelour.jpg`);

    return images;
  };

  // Check which images actually exist
  useEffect(() => {
    const checkImages = async () => {
      const possibleImages = generateImagePaths(product.name);
      const existingImages = [];

      for (const imagePath of possibleImages) {
        try {
          const response = await fetch(imagePath, { method: 'HEAD' });
          if (response.ok) {
            existingImages.push(imagePath);
          }
        } catch (error) {
          // Image doesn't exist, skip it
        }
      }

      setAvailableImages(existingImages.length > 0 ? existingImages : [possibleImages[0]]);
      setImagesLoaded(true);
    };

    checkImages();
  }, [product.name]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % availableImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + availableImages.length) % availableImages.length);
  };

  return (
    <article className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col relative rounded-lg" role="article" aria-labelledby={`product-title-${product.name?.replace(/\s+/g, '-').toLowerCase()}`}>
      {/* Clearance Badge */}
      <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
        CLEARANCE
      </div>

      {/* Product Image Gallery */}
      <div className="relative aspect-[4/3] bg-gray-50 dark:bg-gray-700 overflow-hidden">
        {imagesLoaded && availableImages.length > 0 && !imageError ? (
          <>
            <img
              src={availableImages[currentImageIndex]}
              alt={`${product.name} - ${product.summary || 'Microfiber product'} - ${currentImageIndex + 1} of ${availableImages.length}`}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
              onError={() => {
                if (currentImageIndex === 0) {
                  setImageError(true);
                } else {
                  setCurrentImageIndex(0);
                }
              }}
              loading="lazy"
            />

            {/* Image Navigation - Only show if multiple images */}
            {availableImages.length > 1 && (
              <>
                {/* Previous Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-1 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 hover:text-gray-900 rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 focus:opacity-100 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm hover:shadow-md backdrop-blur-sm"
                  aria-label="Previous image"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Next Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-1 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 hover:text-gray-900 rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 focus:opacity-100 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm hover:shadow-md backdrop-blur-sm"
                  aria-label="Next image"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Image Indicators - Minimal */}
                <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 flex gap-px">
                  {availableImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setCurrentImageIndex(index);
                      }}
                      className={`w-0.2 h-0.2 rounded-full cursor-pointer transition-opacity duration-200 ${index === currentImageIndex
                        ? 'bg-gray-800 opacity-90'
                        : 'bg-gray-600 opacity-50 hover:opacity-70'
                        }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Image Counter - Minimal */}
                <div className="absolute top-1.5 right-1.5 bg-black/40 text-white text-xs px-1.5 py-0.5 rounded text-[10px] font-medium backdrop-blur-sm">
                  {currentImageIndex + 1}/{availableImages.length}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500" role="img" aria-label={`Product placeholder for ${product.name}`}>
            <div className="text-center">
              <svg className="w-20 h-20 mx-auto mb-3 opacity-50" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">Product Photo</span>
            </div>
          </div>
        )}
      </div>

      {/* Product Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Product Title */}
        <div className="mb-3">
          <h3 id={`product-title-${product.name?.replace(/\s+/g, '-').toLowerCase()}`} className="font-bold text-lg text-gray-900 dark:text-white leading-tight min-h-[3.5rem] flex items-start uppercase tracking-wide">
            {product.name}
          </h3>
        </div>

        {/* Quick Specs */}
        <div className="mb-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 p-3 border-l-4 border-blue-500 shadow-sm">
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs font-mono">
            {product.size && <div><span className="text-gray-500">SIZE:</span> <span className="font-bold">{product.size.split('\n')[0]}</span></div>}
            {product.gsm && <div><span className="text-gray-500">GSM:</span> <span className="font-bold">{product.gsm}</span></div>}
            {product.fabric && <div className="col-span-2"><span className="text-gray-500">MATERIAL:</span> <span className="font-bold">{product.fabric}</span></div>}
          </div>
          <div className="mt-2 text-xs text-gray-600 dark:text-gray-300 italic">
            {product.summary}
          </div>
        </div>

        {/* Shipping & Packaging Details */}
        {(product.colors?.length > 0 || product.packing || product.carton_dimensions) && (
          <div className="mb-4">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowDetails(!showDetails);
              }}
              className="flex items-center justify-between w-full text-left text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded p-2 -m-2 bg-blue-50 dark:bg-blue-900/20"
              aria-expanded={showDetails}
              aria-controls={`details-${cardId}`}
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v10z" />
                </svg>
                SHIPPING & VARIANTS
              </span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${showDetails ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showDetails && (
              <div
                id={`details-${cardId}`}
                className="mt-3 space-y-3 text-sm animate-in slide-in-from-top-2 duration-200"
              >
                {/* Color Variants */}
                {product.colors && product.colors.length > 0 && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-700">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 text-xs uppercase tracking-wide mb-2 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                      </svg>
                      Available Colors
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {product.colors.map((color, index) => (
                        <span key={index} className="bg-white dark:bg-gray-800 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs font-medium border border-blue-200 dark:border-blue-600">
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Packaging Information */}
                {(product.packing || product.carton_dimensions) && (
                  <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3 border border-orange-200 dark:border-orange-700">
                    <h4 className="font-semibold text-orange-800 dark:text-orange-200 text-xs uppercase tracking-wide mb-2 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      Packaging Details
                    </h4>
                    {product.packing && (
                      <div className="mb-1">
                        <span className="text-orange-700 dark:text-orange-300 text-xs font-medium">Pack: </span>
                        <span className="text-orange-900 dark:text-orange-100 text-xs">{safeDisplay(product.packing)}</span>
                      </div>
                    )}
                    {product.carton_dimensions && (
                      <div>
                        <span className="text-orange-700 dark:text-orange-300 text-xs font-medium">Carton: </span>
                        <span className="text-orange-900 dark:text-orange-100 text-xs">{safeDisplay(product.carton_dimensions)}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Warehouse Pricing Section */}
        <div className="border-t-2 border-blue-200 dark:border-blue-600 pt-4 mt-auto bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-blue-900/20 -mx-4 -mb-4 px-4 pb-4 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5" aria-hidden="true">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M0 0h20v20H0V0zm10 10h10v10H10V10z'/%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <div className="flex-1">
                <div className="text-xs text-gray-500 dark:text-gray-400 font-mono mb-1 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 4V2C7 1.45 7.45 1 8 1S9 1.55 9 2V4H15V2C15 1.45 15.45 1 16 1S17 1.55 17 2V4H20C21.1 4 22 4.9 22 6V20C22 21.1 21.1 22 20 22H4C2.9 22 2 21.1 2 20V6C2 4.9 2.9 4 4 4H7Z" />
                  </svg>
                  PRICE (EX VAT)
                </div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1" aria-label={`Price: ${priceDisplay}`}>
                  {priceDisplay}
                </div>
                {product.unit_price_thb_no_vat && (
                  <div className="text-xs text-gray-500 dark:text-gray-400">per unit</div>
                )}
              </div>

              <div className="text-right bg-green-100 dark:bg-green-900/30 px-3 py-2 rounded-lg border border-green-200 dark:border-green-700">
                <div className="text-xs text-green-700 dark:text-green-300 mb-1 font-semibold">STOCK STATUS</div>
                <div className="text-sm font-bold text-green-600 dark:text-green-400 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  READY TO SHIP
                </div>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleRequestQuote();
              }}
              className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 focus-visible:from-blue-700 focus-visible:via-blue-800 focus-visible:to-blue-900 text-white px-4 py-3 font-bold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 shadow-lg hover:shadow-xl transform hover:scale-[1.02] focus-visible:scale-[1.02] min-h-[48px] flex items-center justify-center gap-2 uppercase tracking-wide border-2 border-blue-800 dark:border-blue-500 relative overflow-hidden"
              aria-label={`Request bulk quote for ${product.name}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <svg className="w-4 h-4 relative z-10" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v10z" />
              </svg>
              <span className="relative z-10">REQUEST BULK QUOTE</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}