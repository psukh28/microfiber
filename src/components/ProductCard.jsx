import { useState, useEffect } from 'react';
import { convertAndFormatPrice } from '../utils/currency.js';
import { safeDisplay } from '../utils/validation.js';
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
    : 'Container quote';

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

  // Check which images actually exist with better performance
  useEffect(() => {
    const checkImages = async () => {
      const possibleImages = generateImagePaths(product.name);
      const existingImages = [];

      // Use Promise.allSettled for better performance
      const imageChecks = possibleImages.map(async (imagePath) => {
        try {
          const response = await fetch(imagePath, { 
            method: 'HEAD',
            cache: 'force-cache' // Cache the HEAD requests
          });
          if (response.ok) {
            return imagePath;
          }
        } catch (error) {
          // Image doesn't exist, skip it
        }
        return null;
      });

      const results = await Promise.allSettled(imageChecks);
      results.forEach((result) => {
        if (result.status === 'fulfilled' && result.value) {
          existingImages.push(result.value);
        }
      });

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


      {/* Product Image Gallery - Clean & Modern Design */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 overflow-hidden group/image">
        {imagesLoaded && availableImages.length > 0 && !imageError ? (
          <>
            <img
              src={availableImages[currentImageIndex]}
              alt={`${product.name} - ${product.summary || 'Microfiber product'} - ${currentImageIndex + 1} of ${availableImages.length}`}
              className="w-full h-full object-contain transition-all duration-500 ease-out group-hover:scale-[1.02]"
              onError={() => {
                if (currentImageIndex === 0) {
                  setImageError(true);
                } else {
                  setCurrentImageIndex(0);
                }
              }}
              loading="lazy"
              decoding="async"
              fetchPriority="high"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onLoad={() => {
                // Preload the next image for smoother navigation
                if (availableImages[currentImageIndex + 1]) {
                  const nextImg = new Image();
                  nextImg.src = availableImages[currentImageIndex + 1];
                }
              }}
            />

            {/* Image Navigation - Only show if multiple images */}
            {availableImages.length > 1 && (
              <>
                {/* Navigation Buttons - Larger & Cleaner */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-lg flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-all duration-300 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg backdrop-blur-sm border border-white/20 dark:border-gray-700/50"
                  aria-label="Previous image"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-lg flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-all duration-300 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg backdrop-blur-sm border border-white/20 dark:border-gray-700/50"
                  aria-label="Next image"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Clean Image Counter */}
                <div className="absolute top-3 right-3 bg-white/95 dark:bg-gray-800/95 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded-md font-medium shadow-sm backdrop-blur-sm border border-white/30 dark:border-gray-700/50">
                  {currentImageIndex + 1} / {availableImages.length}
                </div>

                {/* Thumbnail Strip - Always show for multiple images */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300">
                  <div className={`flex gap-1 ${availableImages.length > 6 ? 'max-w-[200px] overflow-x-auto scrollbar-hide' : ''}`}>
                    {availableImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setCurrentImageIndex(index);
                        }}
                        className={`${
                          availableImages.length > 6 ? 'w-8 h-6' : 'w-12 h-8'
                        } rounded border-2 overflow-hidden transition-all duration-200 flex-shrink-0 ${
                          index === currentImageIndex
                            ? 'border-blue-500 shadow-md scale-110'
                            : 'border-white/60 dark:border-gray-600/60 hover:border-blue-300 dark:hover:border-blue-400 hover:scale-105'
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      >
                        <img
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                          sizes="48px"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500" role="img" aria-label={`Product placeholder for ${product.name}`}>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 opacity-60" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Product Image</span>
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

        {/* Product Summary */}
        <div className="mb-3">
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {product.summary}
          </p>
        </div>

        {/* Product Specifications */}
        <div className="mb-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-4 shadow-sm">
          <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
            </svg>
            Specifications
          </h4>
          <div className="space-y-2">
            {product.size && (
              <div className="flex justify-between items-center py-1">
                <span className="text-sm text-gray-600 dark:text-gray-400">Size</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white font-mono">
                  {product.size.split('\n')[0].split('(')[0].trim()}
                </span>
              </div>
            )}
            {product.gsm && (
              <div className="flex justify-between items-center py-1 border-t border-gray-100 dark:border-gray-700">
                <span className="text-sm text-gray-600 dark:text-gray-400">Weight</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {product.gsm} GSM
                </span>
              </div>
            )}
            {product.fabric && (
              <div className="flex justify-between items-start py-1 border-t border-gray-100 dark:border-gray-700">
                <span className="text-sm text-gray-600 dark:text-gray-400">Material</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white text-right max-w-[60%]">
                  {product.fabric}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Available Colors */}
        {product.colors && product.colors.length > 0 && (
          <div className="mb-4">
            <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-2 flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
              Available Colors
            </h4>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color, index) => (
                <span 
                  key={index} 
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-600"
                >
                  <div className="w-2 h-2 rounded-full bg-current mr-2 opacity-60"></div>
                  {color}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Packaging Details - Collapsible */}
        {(product.packing || product.carton_dimensions) && (
          <div className="mb-4">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowDetails(!showDetails);
              }}
              className="flex items-center justify-between w-full text-left text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded p-2 -m-2 hover:bg-gray-50 dark:hover:bg-gray-700/50"
              aria-expanded={showDetails}
              aria-controls={`details-${cardId}`}
            >
              <span className="flex items-center gap-2 uppercase tracking-wide">
                <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v10z"/>
                </svg>
                Packaging Details
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
                className="mt-3 bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-600 animate-in slide-in-from-top-2 duration-200"
              >
                {product.packing && (
                  <div className="mb-2 last:mb-0">
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Packaging: </span>
                    <span className="text-xs text-gray-800 dark:text-gray-200">{safeDisplay(product.packing)}</span>
                  </div>
                )}
                {product.carton_dimensions && (
                  <div className="mb-2 last:mb-0">
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Carton Size: </span>
                    <span className="text-xs text-gray-800 dark:text-gray-200">{safeDisplay(product.carton_dimensions)}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Pricing and Action Section */}
        <div className="border-t border-gray-200 dark:border-gray-600 pt-4 mt-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                Unit Price (Ex VAT)
              </div>
              <div className="text-xl font-bold text-gray-900 dark:text-white" aria-label={`Price: ${priceDisplay}`}>
                {priceDisplay}
              </div>
              {product.unit_price_thb_no_vat && (
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {product.name?.toUpperCase().includes("SET") ? "per set" : "per piece"}
                </div>
              )}
           
              <div className="text-xs text-blue-600 dark:text-blue-400 mt-1 font-medium">
                20ft container minimum
              </div>
            </div>

            <div className="text-right">
              <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-700">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                In Stock
              </div>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleRequestQuote();
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white px-4 py-3 font-semibold text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 shadow-sm hover:shadow-md min-h-[48px] flex items-center justify-center gap-2 rounded-lg border border-blue-700 dark:border-blue-500"
            aria-label={`Add ${product.name} to 20ft container quote`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"/>
            </svg>
            Add to Container Quote
          </button>
        </div>
      </div>
    </article>
  );
}