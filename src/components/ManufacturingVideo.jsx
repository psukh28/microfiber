import { useState } from 'react';

export default function ManufacturingVideo() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const videoId = 'mpX4w7LjzLo'; // Extracted from the YouTube URL
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  const handlePlayVideo = () => {
    setShowVideo(true);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-800 dark:to-gray-900" aria-labelledby="manufacturing-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              QUALITY MANUFACTURING
            </div>
            <h2 id="manufacturing-heading" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              See Our Production Process
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Watch our advanced manufacturing equipment in action, producing the high-quality microfiber cleaning towels you're getting at clearance prices.
            </p>
          </div>

          {/* Video Container */}
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="aspect-video relative">
              {!showVideo ? (
                /* Video Thumbnail with Play Button */
                <div className="relative w-full h-full group cursor-pointer" onClick={handlePlayVideo}>
                  <img
                    src={thumbnailUrl}
                    alt="Manufacturing process of microfiber cleaning towels"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onLoad={() => setIsLoaded(true)}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-red-600 hover:bg-red-700 text-white rounded-full p-6 shadow-2xl transform group-hover:scale-110 transition-all duration-300">
                      <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* YouTube Badge */}
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded text-sm font-semibold flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    YouTube
                  </div>
                  
                  {/* Loading State */}
                  {!isLoaded && (
                    <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
                      <div className="text-gray-500 dark:text-gray-400">Loading video...</div>
                    </div>
                  )}
                </div>
              ) : (
                /* Embedded YouTube Video */
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                  title="Microfiber Manufacturing Process - Driver's Choice"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
            
            {/* Video Info */}
            <div className="p-6 bg-gradient-to-r from-blue-50 to-gray-50 dark:from-gray-700 dark:to-gray-800">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Advanced Manufacturing Equipment
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Our state-of-the-art production line ensures consistent quality and efficiency in every microfiber towel we manufacture.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  Verified Production
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </section>
  );
}