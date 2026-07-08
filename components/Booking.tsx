
// Rebuild trigger
import React from 'react';

interface BookingProps {
  content: {
    tag: string;
    title: string;
    body: string;
    buttonText: string;
    formUrl: string;
  }
}

const Booking: React.FC<BookingProps> = ({ content }) => {
  return (
    <section 
      id="booking" 
      className="relative text-charcoal overflow-hidden min-h-[90vh] flex items-center py-24 md:py-36"
    >
      {/* Targeted element: Main page blue background */}
      <div className="absolute inset-0 bg-forest-green z-0"></div>
      
      <div className="relative z-10 container mx-auto px-6 text-center max-w-3xl">
        <p className="text-xs uppercase tracking-mega text-charcoal/60 mb-3 font-light">{content.tag}</p>
        <h2 className="font-serif text-5xl md:text-7xl font-extralight tracking-tight mb-8 leading-none italic">{content.title}</h2>
        
        <div className="w-16 h-[1px] bg-charcoal/20 mx-auto mb-8"></div>
        
        <p className="font-sans text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-14 text-charcoal/70 font-light">
          {content.body}
        </p>
        
        <div className="flex justify-center">
          <a 
            href={content.formUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-charcoal/30 text-charcoal py-6 px-16 text-xs sm:text-sm uppercase tracking-mega hover:bg-charcoal hover:text-off-white hover:border-charcoal transition-all duration-500 rounded-none font-light shadow-md min-h-[64px] flex items-center justify-center max-w-xs mx-auto"
          >
            {content.buttonText}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Booking;
