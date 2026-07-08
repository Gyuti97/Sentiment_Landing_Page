
import React from 'react';
import LazyImage from './LazyImage';
import { motion, AnimatePresence } from 'motion/react';
import artistImage from '../assets/hero/hero section pic.webp';

// Import local WebP gallery pictures
import gallery1 from '../assets/gallery/finished_tattoos/1.webp';
import gallery2 from '../assets/gallery/finished_tattoos/2.webp';
import gallery3 from '../assets/gallery/finished_tattoos/3.webp';
import gallery4 from '../assets/gallery/finished_tattoos/4.webp';
import gallery5 from '../assets/gallery/finished_tattoos/5.webp';
import gallery6 from '../assets/gallery/finished_tattoos/6.webp';

interface HeroProps {
  navigate: (page: string, anchor?: string) => void;
  content: {
    title: string;
    subtitle: string;
    image: string;
  };
  currentLanguage: 'en' | 'hu';
}

const GALLERY_IMAGES = [
  gallery1,
  gallery2,
  gallery3,
  gallery4,
  gallery5,
  gallery6,
];

const Hero: React.FC<HeroProps> = ({ navigate, content, currentLanguage }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const ovalImage = artistImage;

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative flex flex-col md:flex-row overflow-hidden bg-off-white select-none border-b border-charcoal/5">
      
      {/* LEFT COLUMN: SOLID EDITORIAL BLUE PANEL */}
      <div className="w-full md:w-1/2 bg-forest-green flex flex-col justify-center items-center px-8 py-12 md:py-20 text-charcoal">
        <div className="max-w-md w-full flex flex-col items-center text-center space-y-6">
          
          {/* Headline in spacious elegant serif */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-light leading-snug tracking-normal uppercase"
          >
            {currentLanguage === 'en' ? (
              <>
                Let's Make<br />
                Your Story<br />
                Permanent
              </>
            ) : (
              <>
                Tegyük az<br />
                Emlékeid<br />
                Maradandóvá
              </>
            )}
          </motion.h1>

          {/* Reverted back to the original elegant Oval Portrait Image Frame */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-[140px] md:w-[170px] aspect-[2/3] rounded-full overflow-hidden shadow-xl border border-charcoal/10 -translate-x-5"
          >
            <LazyImage 
              src={ovalImage}
              alt="Intimate detail work"
              className="w-full h-full object-cover select-none"
              style={{ transform: 'scale(1.1)', transformOrigin: 'center' }}
            />
          </motion.div>

          {/* Description Paragraph */}
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-xs md:text-sm tracking-wide text-charcoal/70 max-w-sm leading-relaxed font-light"
          >
            {content.subtitle}
          </motion.p>

          {/* Fine underlined link pointing to Booking page */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.6 }}
          >
            <a 
              href="#booking" 
              onClick={(e) => { e.preventDefault(); navigate('booking'); }}
              className="font-serif text-[11px] md:text-xs uppercase tracking-mega font-medium border-b border-charcoal/40 pb-1 text-charcoal/95 hover:text-charcoal pr-0.5 hover:border-charcoal transition-all duration-300 inline-block font-serif tracking-[0.18em]"
            >
              {currentLanguage === 'en' ? "LET'S START TODAY" : "KEZDJÜK EL MA"}
            </a>
          </motion.div>

        </div>
      </div>

      {/* RIGHT COLUMN: 16:9 FORMAT ALTERNATING CAROUSEL */}
      <div className="w-full md:w-1/2 relative aspect-[16/9] overflow-hidden bg-charcoal/5">
        <div className="absolute inset-0 bg-black/10 z-10 transition-colors duration-500 hover:bg-black/5" />
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentIndex}
            src={GALLERY_IMAGES[currentIndex]}
            alt="Sentiment Studio Gallery Alternating"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>

    </section>
  );
};

export default Hero;
