
import React, { useState } from 'react';
import { Facebook, Instagram, Menu, X } from 'lucide-react';

interface HeaderProps {
  navigate: (page: string, anchor?: string) => void;
  content: {
    topBanner: string;
    nav: {
      info: string;
      booking: string;
      about: string;
      gallery: string;
    }
  };
  setLanguage: (lang: 'en' | 'hu') => void;
  currentLanguage: 'en' | 'hu';
}

const Header: React.FC<HeaderProps> = ({ navigate, content, setLanguage, currentLanguage }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkStyle = "text-[11px] uppercase tracking-mega text-charcoal/70 hover:text-charcoal transition-all relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full  after:h-[1px]  after:bg-charcoal/80 after:transition-all after:duration-300 font-normal";

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, page: string, anchor?: string) => {
    e.preventDefault();
    navigate(page, anchor);
    setMenuOpen(false);
  };
  
  const LanguageSwitcher: React.FC = () => (
    <div className="flex items-center space-x-2 text-[10px] uppercase tracking-mega text-charcoal/40 font-normal select-none">
      <button 
        onClick={() => setLanguage('en')} 
        className={`hover:text-charcoal transition-colors ${currentLanguage === 'en' ? 'text-charcoal font-semibold' : ''}`}
      >
        EN
      </button>
      <span className="text-charcoal/15">|</span>
      <button 
        onClick={() => setLanguage('hu')} 
        className={`hover:text-charcoal transition-colors ${currentLanguage === 'hu' ? 'text-charcoal font-semibold' : ''}`}
      >
        HU
      </button>
    </div>
  );

  return (
    <div className="sticky top-0 z-50 border-b border-charcoal/5">
      {/* Top Banner Message */}
      <div className="bg-charcoal text-off-white text-center py-2.5 text-[10px] uppercase tracking-mega font-light select-none">
        {content.topBanner}
      </div>
      
      {/* Luxury Row Navigation */}
      <header className="bg-off-white/95 backdrop-blur-md py-4 select-none">
        <div className="container mx-auto px-6 max-w-7xl flex justify-between items-center">
          
          {/* DESKTOP NAV LEFT: Socials + About/Gallery */}
          <div className="hidden lg:flex items-center space-x-8 w-1/3">
            <div className="flex items-center space-x-4 pr-6 border-r border-charcoal/10">
              <a href="https://www.instagram.com/clubsentiment/" target="_blank" rel="noopener noreferrer" className="text-charcoal/60 hover:text-charcoal transition-colors duration-300">
                <Instagram className="w-3.5 h-3.5 stroke-[1.5]" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61567471132497" target="_blank" rel="noopener noreferrer" className="text-charcoal/60 hover:text-charcoal transition-colors duration-300">
                <Facebook className="w-3.5 h-3.5 stroke-[1.5]" />
              </a>
            </div>
            <nav className="flex space-x-6">
              <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className={linkStyle}>{content.nav.about}</a>
              <a href="#gallery" onClick={(e) => handleNavClick(e, 'gallery')} className={linkStyle}>{content.nav.gallery}</a>
            </nav>
          </div>

          {/* BRAND LOGO: Centered perfectly */}
          <div className="flex justify-start lg:justify-center items-center lg:w-1/3">
            <a href="#" onClick={(e) => handleNavClick(e, 'main')} className="text-xl md:text-2xl font-serif font-bold tracking-[0.25em] uppercase hover:opacity-75 transition-opacity duration-300">
              Sentiment
            </a>
          </div>

          {/* DESKTOP NAV RIGHT: Info/Contact + Book Now Pill */}
          <div className="hidden lg:flex items-center justify-end space-x-8 w-1/3">
            <nav className="flex space-x-6 items-center">
              <a id="nav-info-contact-desktop" href="#info" onClick={(e) => handleNavClick(e, 'info')} className={linkStyle}>{content.nav.info}</a>
              <LanguageSwitcher />
            </nav>
            <a 
              href="#booking" 
              onClick={(e) => handleNavClick(e, 'booking')} 
              className="text-[10px] uppercase tracking-mega border border-charcoal/30 text-charcoal hover:bg-charcoal hover:border-charcoal hover:text-off-white px-6 py-2.5 rounded-full transition-all duration-300 font-light font-sans shadow-sm hover:shadow-md"
            >
              {currentLanguage === 'en' ? 'BOOK NOW' : 'FOGLALÁS'}
            </a>
          </div>

          {/* MOBILE UI triggers */}
          <div className="lg:hidden flex items-center space-x-5">
            <LanguageSwitcher />
            <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none p-1" aria-label="Toggle menu">
              {menuOpen ? <X className="w-5 h-5 text-charcoal" /> : <Menu className="w-5 h-5 text-charcoal" />}
            </button>
          </div>
          
        </div>

        {/* MOBILE DRAWER */}
        {menuOpen && (
          <div className="lg:hidden bg-off-white border-t border-charcoal/5 py-8 absolute top-[100%] left-0 w-full shadow-lg">
            <nav className="flex flex-col items-center space-y-6 px-6">
              <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className={linkStyle}>{content.nav.about}</a>
              <a href="#gallery" onClick={(e) => handleNavClick(e, 'gallery')} className={linkStyle}>{content.nav.gallery}</a>
              <a id="nav-info-contact-mobile" href="#info" onClick={(e) => handleNavClick(e, 'info')} className={linkStyle}>{content.nav.info}</a>
              <a 
                href="#booking" 
                onClick={(e) => handleNavClick(e, 'booking')} 
                className="text-[10px] uppercase tracking-mega border border-charcoal/30 text-charcoal hover:bg-charcoal hover:text-off-white px-8 py-3 rounded-full transition-all duration-300 font-light font-sans w-full max-w-xs text-center inline-block"
              >
                {currentLanguage === 'en' ? 'BOOK NOW' : 'FOGLALÁS'}
              </a>
              <div className="flex items-center space-x-6 pt-4 border-t border-charcoal/5 w-full justify-center">
                <a href="https://www.instagram.com/sentimentsocialclub/" target="_blank" rel="noopener noreferrer" className="text-charcoal/60 hover:text-charcoal">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="https://www.facebook.com/profile.php?id=61567471132497" target="_blank" rel="noopener noreferrer" className="text-charcoal/60 hover:text-charcoal">
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
