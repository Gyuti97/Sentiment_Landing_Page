
import React from 'react';
import LazyImage from './LazyImage';
import aboutImage from '../assets/314.webp';

interface AboutProps {
  content: {
    tag: string;
    title: string;
    artistName: string;
    artistBio: string;
    artistImage: string;
  }
}

const About: React.FC<AboutProps> = ({ content }) => {
  return (
    <section 
      id="about" 
      className="bg-off-white py-24 md:py-36 relative"
      style={{
         backgroundImage: 'url("https://www.transparenttextures.com/patterns/concrete-wall.png")',
         backgroundRepeat: 'repeat',
      }}
    >
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
          <div className="w-full md:w-5/12">
            <div className="p-3 bg-white border border-charcoal/5 shadow-sm transform hover:scale-[1.01] transition-transform duration-700">
              <div className="aspect-[4/5] overflow-hidden bg-white">
                <LazyImage 
                  src={aboutImage} 
                  alt={content.artistName} 
                  wrapperClassName="w-full h-full"
                  className="transition-all duration-[1200ms]"
                />
              </div>
            </div>
          </div>
          <div className="w-full md:w-7/12 text-left">
            <p className="text-xs uppercase tracking-mega text-charcoal/50 mb-4 font-light">{content.tag}</p>
            <h2 className="font-serif text-5xl md:text-6xl font-light tracking-tight mb-8 leading-tight">{content.title}</h2>
            
            <div className="space-y-6 text-charcoal/70 leading-relaxed font-sans text-sm font-light">
              <div className="whitespace-pre-line">
                {content.artistBio}
              </div>
            </div>
            
            <div className="mt-12 pt-10 border-t border-charcoal/10 font-serif">
              <p className="text-xl md:text-2xl italic font-light text-charcoal/50">
                "Art is not what you see, but what you make others see."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
