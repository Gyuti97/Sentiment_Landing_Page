import React, { useState } from 'react';
import { Facebook, Instagram, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface FooterProps {
  content: {
    copyright: string;
    imprintLabel: string;
    gtcLabel: string;
    imprintTitle: string;
    imprintPlaceholder: string;
    gtcTitle: string;
    gtcContent: string;
  }
}

const Footer: React.FC<FooterProps> = ({ content }) => {
  const [modalType, setModalType] = useState<'imprint' | 'gtc' | null>(null);

  const closeModal = () => setModalType(null);

  return (
    <footer className="bg-off-white text-charcoal py-16 border-t border-charcoal/5 select-none relative z-40">
      <div className="container mx-auto px-6 max-w-6xl flex flex-col items-center justify-between gap-6 md:flex-row text-center md:text-left">
        <div className="flex flex-col items-center md:items-start">
          <p className="font-serif text-3xl sm:text-5xl md:text-[76px] leading-tight md:leading-[52px] font-bold tracking-mega uppercase select-none">SENTIMENT</p>
          <p className="text-[10px] uppercase tracking-mega text-charcoal/40 mt-3 font-light select-none">{content.copyright}</p>
          
          <div className="flex items-center gap-3 mt-3 text-[10px] uppercase tracking-mega text-charcoal/50 font-medium font-sans">
            <button 
              id="footer-imprint-btn"
              onClick={() => setModalType('imprint')} 
              className="hover:text-charcoal transition-colors duration-300 cursor-pointer"
            >
              {content.imprintLabel}
            </button>
            <span className="text-charcoal/15 select-none">•</span>
            <button 
              id="footer-gtc-btn"
              onClick={() => setModalType('gtc')} 
              className="hover:text-charcoal transition-colors duration-300 cursor-pointer"
            >
              {content.gtcLabel}
            </button>
          </div>
        </div>
        
        <div className="flex flex-col items-center md:items-end gap-3 select-none">
          <div className="text-[10px] uppercase tracking-mega text-charcoal/35 font-light font-sans">
            Permanent ink, pure sentiment.
          </div>
          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/clubsentiment/" target="_blank" rel="noopener noreferrer" className="text-charcoal/50 hover:text-charcoal transition-colors duration-300" aria-label="Instagram">
              <Instagram className="w-4 h-4 stroke-[1.5]" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61567471132497" target="_blank" rel="noopener noreferrer" className="text-charcoal/50 hover:text-charcoal transition-colors duration-300" aria-label="Facebook">
              <Facebook className="w-4 h-4 stroke-[1.5]" />
            </a>
          </div>
        </div>
      </div>

      {/* Modal Popup Window */}
      <AnimatePresence>
        {modalType && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: 'spring', duration: 0.5, bounce: 0.1 }}
              className="relative w-full max-w-xl bg-off-white border border-charcoal/15 rounded-lg p-8 md:p-10 shadow-2xl overflow-y-auto max-h-[85vh] text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 p-2 rounded-full text-charcoal/40 hover:text-charcoal hover:bg-charcoal/5 transition-colors duration-300"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 stroke-[1.5]" />
              </button>

              {modalType === 'imprint' ? (
                <div>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold tracking-wider text-charcoal uppercase mb-6">
                    {content.imprintTitle}
                  </h2>
                  <div className="w-12 h-[1px] bg-charcoal/25 mb-6" />
                  <div 
                    className="text-sm text-charcoal/80 leading-relaxed font-light"
                    dangerouslySetInnerHTML={{ __html: content.imprintPlaceholder }}
                  />
                </div>
              ) : (
                <div>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold tracking-wider text-charcoal uppercase mb-6">
                    {content.gtcTitle}
                  </h2>
                  <div className="w-12 h-[1px] bg-charcoal/25 mb-6" />
                  <p className="text-sm text-charcoal leading-relaxed font-light mb-4">
                    {content.gtcContent}
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
