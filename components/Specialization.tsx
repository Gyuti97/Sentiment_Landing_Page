
import React from 'react';
import LazyImage from './LazyImage';

interface WorkItemProps {
  imageSrc: string;
  alt: string;
  className?: string;
}

const WorkItem: React.FC<WorkItemProps> = ({ imageSrc, alt, className = '' }) => (
  <div className={`flex flex-col items-center group ${className} w-full`}>
    <div className="overflow-hidden w-full aspect-[3/4]">
      <LazyImage 
        src={imageSrc}
        alt={alt}
        wrapperClassName="w-full h-full"
        className="group-hover:scale-105 transition-transform duration-1000 ease-in-out"
      />
    </div>
  </div>
);

interface SpecializationProps {
  navigate: (page: string, anchor?: string) => void;
  content: {
    tag: string;
    title: string;
    description?: string;
    button: string;
    images: {
      url: string;
      alt: string;
    }[];
  }
}

const Specialization: React.FC<SpecializationProps> = ({ navigate, content }) => {
  return (
    <section 
      id="work" 
      className="bg-forest-green text-charcoal py-24 md:py-36 border-b border-charcoal/5"
    >
      <div className="container mx-auto px-6 max-w-6xl text-center">
        <p className="text-xs uppercase tracking-mega text-charcoal/50 mb-3 font-light">{content.tag}</p>
        <h2 className="font-serif text-5xl md:text-7xl font-light tracking-tight">{content.title}</h2>
        {content.description && (
          <p className="font-sans text-sm md:text-base text-charcoal/60 leading-relaxed mt-6 max-w-xl mx-auto font-light">
            {content.description}
          </p>
        )}
        
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 items-end">
          {content.images.map((image, index) => (
            <WorkItem 
              key={index}
              imageSrc={image.url}
              alt={image.alt}
              className={`${index !== 1 ? "md:w-11/12 justify-self-center" : "shadow-sm"} bg-white p-3 border border-charcoal/5 transform hover:scale-[1.01] transition-transform duration-700`}
            />
          ))}
        </div>
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); navigate('gallery'); }}
          className="inline-block mt-20 border border-charcoal/30 text-charcoal/80 py-3.5 px-12 text-xs uppercase tracking-widest hover:bg-charcoal hover:text-off-white hover:border-charcoal transition-all duration-500 rounded-none font-light"
        >
          {content.button}
        </a>
      </div>
    </section>
  );
};

export default Specialization;
