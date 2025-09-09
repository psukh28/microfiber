import { useLanguage } from '../contexts/LanguageContext.jsx';

export default function FeatureHighlights() {
  const { t } = useLanguage();

  const features = t('features.items', { returnObjects: true });
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50 dark:bg-gray-900" aria-labelledby="features-heading">
      <div className="container mx-auto px-2 sm:px-4 xl:px-6 2xl:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 id="features-heading" className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            {t('features.title')}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-xs sm:max-w-2xl mx-auto px-2 sm:px-0">
            {t('features.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8" role="list" aria-label="Key features and benefits">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg focus-within:shadow-lg transition-shadow duration-300 text-center"
              role="listitem"
            >
              <div className="text-emerald-600 dark:text-emerald-400 mb-3 sm:mb-4 flex justify-center" aria-hidden="true">
                {feature.icon}
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}