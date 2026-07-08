
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
      className="relative text-charcoal overflow-hidden min-h-screen flex items-center"
    >
      {/* Targeted element: Main page blue background */}
      <div className="absolute inset-0 bg-forest-green z-0"></div>
      
      <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl py-20 md:py-32">
        <p className="text-xs uppercase tracking-widest text-charcoal/60 mb-2">{content.tag}</p>
        <h2 className="font-serif text-6xl md:text-7xl mb-8">{content.title}</h2>
        <p className="font-sans text-base max-w-3xl mx-auto leading-relaxed mb-12 text-charcoal/70">
          {content.body}
        </p>
        
        <div className="flex justify-center">
          <a 
            href={content.formUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-charcoal/30 text-charcoal py-6 px-16 text-xs sm:text-sm uppercase tracking-widest hover:bg-charcoal hover:text-off-white hover:border-charcoal transition-all duration-300 shadow-md min-h-[64px] flex items-center justify-center max-w-xs mx-auto"
          >
            {content.buttonText}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Booking;
