
import React from 'react';

interface InquiryProps {
  navigate: (page: string, anchor?: string) => void;
  content: {
    title: string;
    body: string;
    button: string;
  }
}

const Inquiry: React.FC<InquiryProps> = ({ navigate, content }) => {
  const handleBookClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate('booking');
  };

  return (
    <section 
      id="inquire" 
      className="text-charcoal py-28 md:py-40 relative overflow-hidden border-b border-charcoal/5"
      style={{
         backgroundImage: 'url("https://www.transparenttextures.com/patterns/concrete-wall.png")',
         backgroundRepeat: 'repeat',
         backgroundColor: '#FAF8F5', 
      }}
    >
      <div className="container mx-auto px-6 text-center max-w-2xl relative z-10">
        <h2 className="font-serif text-4xl md:text-5xl font-light tracking-tight">{content.title}</h2>
        <div className="w-12 h-[1px] bg-charcoal/25 mx-auto my-6"></div>
        <p className="font-sans text-sm md:text-base mt-4 leading-relaxed text-charcoal/70 font-light">
          {content.body}
        </p>
        <a 
          href="#booking" 
          onClick={handleBookClick}
          className="inline-block mt-12 bg-charcoal text-off-white py-4 px-14 text-xs uppercase tracking-mega hover:bg-charcoal/90 transition-all duration-350 rounded-none font-light shadow-sm"
        >
          {content.button}
        </a>
      </div>
    </section>
  );
};

export default Inquiry;
