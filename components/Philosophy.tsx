
import React from 'react';
import LazyImage from './LazyImage';
import philosophyImage from '../assets/philosophy.webp';

interface PhilosophyProps {
  navigate: (page: string, anchor?: string) => void;
  content: {
    tag: string;
    title: string;
    quote: string;
    body: string;
    button: string;
    image: string;
  }
}

const Philosophy: React.FC<PhilosophyProps> = ({ navigate, content }) => {
  const handleAboutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate('about');
  };

  return (
    <section id="philosophy" className="bg-forest-green text-charcoal py-24 md:py-36">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
          <div className="w-full md:w-5/12">
            <div className="relative p-3 bg-white border border-charcoal/5 shadow-sm transform hover:scale-[1.01] transition-transform duration-700">
              <LazyImage 
                src={philosophyImage} 
                alt="Studio approach" 
                wrapperClassName="aspect-[4/5]"
                className="w-full h-full object-cover transition-all duration-[1200ms]"
              />
            </div>
          </div>
          <div className="w-full md:w-7/12 text-left">
            <p className="text-xs uppercase tracking-mega text-charcoal/60 mb-4 font-light">{content.tag}</p>
            <h2 className="font-serif text-5xl md:text-6xl md:leading-[1.15] font-light leading-tight tracking-tight">{content.title}</h2>
            
            <div className="w-16 h-[1px] bg-charcoal/20 my-8"></div>
            
            <p className="font-serif text-2xl md:text-3xl italic font-light text-charcoal/90 mb-6 leading-relaxed">
              "{content.quote}"
            </p>
            <p className="font-sans text-sm leading-relaxed max-w-md text-charcoal/70 font-light">
              {content.body}
            </p>
            <a 
              href="#about" 
              onClick={handleAboutClick}
              className="inline-block mt-10 border border-charcoal/30 text-charcoal/80 py-3.5 px-10 text-xs uppercase tracking-widest hover:bg-charcoal hover:text-off-white hover:border-charcoal transition-all duration-500 rounded-none font-light"
            >
              {content.button}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
