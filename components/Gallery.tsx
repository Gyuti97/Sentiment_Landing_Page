import React, { useState, useEffect, useRef } from 'react';
import LazyImage from './LazyImage';
import { motion, AnimatePresence } from 'motion/react';

interface GalleryProps {
  content: {
    tag: string;
    title: string;
    images: {
      url: string;
      alt: string;
    }[];
  };
  currentLanguage?: 'en' | 'hu';
  navigate?: (page: string, anchor?: string) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: [0.16, 1, 0.3, 1] 
    } 
  }
};

// Use Vite's import.meta.glob to dynamically discover images placed in /assets/flashes/
const flashModules = import.meta.glob('../assets/flashes/*.{webp,png,jpg,jpeg}', { eager: true });

const flashImages = Object.entries(flashModules)
  .filter(([path]) => !path.endsWith('.gitkeep')) // Filter out the placeholder .gitkeep
  .sort(([pathA], [pathB]) => {
    const numA = parseInt(pathA.match(/\d+/)?.[0] || '0', 10);
    const numB = parseInt(pathB.match(/\d+/)?.[0] || '0', 10);
    return numA - numB;
  })
  .map(([path, mod]) => {
    const url = (mod as any).default || mod;
    const filename = path.split('/').pop() || '';
    const nameWithoutExt = filename.substring(0, filename.lastIndexOf('.')) || filename;
    const formattedName = nameWithoutExt
      .replace(/[_-]/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
    return {
      url,
      alt: formattedName,
    };
  });

// Use Vite's import.meta.glob to dynamically discover images placed in /assets/gallery/finished_tattoos/
const galleryModules = import.meta.glob('../assets/gallery/finished_tattoos/*.{webp,png,jpg,jpeg}', { eager: true });

const dynamicGalleryImages = Object.entries(galleryModules)
  .filter(([path]) => !path.endsWith('.gitkeep')) // Filter out the placeholder .gitkeep
  .sort(([pathA], [pathB]) => {
    const numA = parseInt(pathA.match(/\d+/)?.[0] || '0', 10);
    const numB = parseInt(pathB.match(/\d+/)?.[0] || '0', 10);
    if (numA !== numB) {
      return numA - numB;
    }
    return pathA.localeCompare(pathB);
  })
  .map(([path, mod]) => {
    const url = (mod as any).default || mod;
    const filename = path.split('/').pop() || '';
    const nameWithoutExt = filename.substring(0, filename.lastIndexOf('.')) || filename;
    const formattedName = nameWithoutExt
      .replace(/[_-]/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
    return {
      url,
      alt: formattedName,
    };
  });

const Gallery: React.FC<GalleryProps> = ({ content, currentLanguage = 'en', navigate }) => {
  const [activeTab, setActiveTab] = useState<'finished' | 'flashes'>('finished');
  const [visibleCount, setVisibleCount] = useState(12);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const displayedImages = activeTab === 'finished'
    ? (dynamicGalleryImages.length > 0 ? dynamicGalleryImages : content.images)
    : flashImages;

  const handleTabChange = (tab: 'finished' | 'flashes') => {
    setActiveTab(tab);
    setVisibleCount(12);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && displayedImages.length > visibleCount) {
          setVisibleCount((prev) => Math.min(prev + 12, displayedImages.length));
        }
      },
      { threshold: 0.1, rootMargin: '200px' }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [displayedImages, visibleCount]);

  return (
    <section className="bg-off-white py-24 md:py-36 min-h-screen">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Gallery Header */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-mega text-charcoal/50 mb-3 font-light">
            {activeTab === 'finished' 
              ? content.tag 
              : (currentLanguage === 'hu' ? 'A Tervek' : 'The Designs')
            }
          </p>
          <h2 className="font-serif text-5xl md:text-6xl font-light tracking-tight">
            {activeTab === 'finished' 
              ? content.title 
              : (currentLanguage === 'hu' ? 'ELÉRHETŐ FLASH-EK' : 'AVAILABLE FLASHES')
            }
          </h2>
        </div>

        {/* Tab Selection Buttons */}
        <div className="flex justify-center items-center gap-6 md:gap-10 mb-20 border-b border-charcoal/10 pb-6 max-w-md mx-auto">
          <button
            onClick={() => handleTabChange('finished')}
            className={`font-sans text-xs md:text-sm uppercase tracking-widest pb-2 transition-all duration-300 relative cursor-pointer ${
              activeTab === 'finished' 
                ? 'text-charcoal font-medium' 
                : 'text-charcoal/40 hover:text-charcoal/70'
            }`}
          >
            {currentLanguage === 'hu' ? 'Elkészült tetoválások' : 'Finished Tattoos'}
            {activeTab === 'finished' && (
              <motion.div 
                layoutId="activeTabUnderline"
                className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-charcoal"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </button>
          
          <button
            onClick={() => handleTabChange('flashes')}
            className={`font-sans text-xs md:text-sm uppercase tracking-widest pb-2 transition-all duration-300 relative cursor-pointer ${
              activeTab === 'flashes' 
                ? 'text-charcoal font-medium' 
                : 'text-charcoal/40 hover:text-charcoal/70'
            }`}
          >
            {currentLanguage === 'hu' ? 'Elérhető flash-ek' : 'Available Flashes'}
            {activeTab === 'flashes' && (
              <motion.div 
                layoutId="activeTabUnderline"
                className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-charcoal"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        </div>

        {/* Gallery Content Area */}
        <AnimatePresence mode="wait">
          {activeTab === 'finished' ? (
            <motion.div 
              key="finished"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col"
            >
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12"
              >
                {displayedImages.slice(0, visibleCount).map((image, index) => (
                  <motion.div 
                    key={index} 
                    variants={itemVariants}
                    className="group flex flex-col"
                  >
                    <div className="aspect-[3/4] overflow-hidden bg-white border border-charcoal/5 p-3 shadow-sm transform hover:scale-[1.01] transition-transform duration-700">
                      <LazyImage 
                        src={image.url} 
                        alt={image.alt} 
                        wrapperClassName="w-full h-full"
                        className="transition-transform duration-[1200ms] group-hover:scale-105"
                      />
                    </div>
                    <div className="mt-4 flex justify-between items-center text-left px-1">
                      <span className="text-[10px] uppercase tracking-mega text-charcoal/30 font-light">
                        {(index + 1).toString().padStart(2, '0')}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {displayedImages.length > visibleCount && (
                <div ref={loadMoreRef} className="flex justify-center mt-20 h-16 items-center">
                  <motion.div 
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="text-[10px] uppercase tracking-mega text-charcoal/40 font-light font-sans"
                  >
                    {currentLanguage === 'hu' ? 'További munkák betöltése...' : 'Loading more works...'}
                  </motion.div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="flashes"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              {/* Info & Booking Box - Now positioned above flashes */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-xl w-full text-center border border-charcoal/5 p-12 md:p-16 bg-white shadow-sm flex flex-col items-center mb-16"
              >
                <div className="w-12 h-12 rounded-full border border-charcoal/10 flex items-center justify-center mb-8">
                  <span className="font-serif text-lg font-light text-charcoal/40">✦</span>
                </div>
                <h3 className="font-serif text-2xl font-light tracking-wide mb-4">
                  {currentLanguage === 'hu' ? 'Hamarosan Új Flash Tervek' : 'New Flashes Coming Soon'}
                </h3>
                <p className="font-sans text-sm text-charcoal/60 leading-relaxed mb-10 max-w-[40ch]">
                  {currentLanguage === 'hu'
                    ? 'Az elérhető flash minták hamarosan itt lesznek láthatóak. Ha saját ötleted van, vagy egyedi tervezést szeretnél, küldj bátran egy ajánlatkérést!'
                    : 'Available flash designs will be uploaded here. If you have an idea in mind or would like a custom piece, please feel free to send a booking inquiry!'
                  }
                </p>
                {navigate && (
                  <button
                    onClick={() => navigate('booking')}
                    className="bg-charcoal text-off-white font-sans text-xs uppercase tracking-widest px-8 py-4 hover:bg-charcoal/90 transition-all duration-300 font-medium hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  >
                    {currentLanguage === 'hu' ? 'Ajánlatkérés Küldése' : 'Send an Inquiry'}
                  </button>
                )}
              </motion.div>

              {flashImages.length > 0 && (
                <div className="flex flex-col w-full">
                  <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 w-full"
                  >
                    {flashImages.slice(0, visibleCount).map((image, index) => (
                      <motion.div 
                        key={index} 
                        variants={itemVariants}
                        className="group flex flex-col"
                      >
                        <div className="aspect-[3/4] overflow-hidden bg-white border border-charcoal/5 p-3 shadow-sm transform hover:scale-[1.01] transition-transform duration-700">
                          <LazyImage 
                            src={image.url} 
                            alt={image.alt} 
                            wrapperClassName="w-full h-full"
                            className="transition-transform duration-[1200ms] group-hover:scale-105"
                          />
                        </div>
                        <div className="mt-4 flex justify-between items-center text-left px-1">
                          <span className="text-[10px] uppercase tracking-mega text-charcoal/30 font-light">
                            {(index + 1).toString().padStart(2, '0')}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  {flashImages.length > visibleCount && (
                    <div ref={loadMoreRef} className="flex justify-center mt-20 h-16 items-center w-full">
                      <motion.div 
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="text-[10px] uppercase tracking-mega text-charcoal/40 font-light font-sans"
                      >
                        {currentLanguage === 'hu' ? 'További minták betöltése...' : 'Loading more designs...'}
                      </motion.div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery;
