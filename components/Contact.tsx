
import React from 'react';
import { Instagram, Mail, MapPin } from 'lucide-react';

interface ContactProps {
  content: {
    tag: string;
    title: string;
    address: string;
    instagram: string;
    instagramHandle: string;
    email: string;
  };
  isSubpage?: boolean;
}

const Contact: React.FC<ContactProps> = ({ content, isSubpage }) => {
  // Generate the secure embed URL for the specific address.
  const addressQuery = encodeURIComponent("9028 Győr, József Attila utca 99");
  const fallbackEmbedUrl = `https://maps.google.com/maps?q=${addressQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <section id="contact" className={`${isSubpage ? '' : 'bg-off-white py-20 md:py-32'}`}>
      <div className={isSubpage ? '' : 'container mx-auto px-6'}>
        <div className={`${isSubpage ? 'text-left mb-8' : 'text-center mb-16'}`}>
          {!isSubpage && <p className="text-xs uppercase tracking-widest text-charcoal/70 mb-2">{content.tag}</p>}
          <h2 className={`font-serif ${isSubpage ? 'text-3xl md:text-4xl' : 'text-6xl md:text-7xl'}`}>{content.title}</h2>
        </div>

        <div className={`grid grid-cols-1 ${isSubpage ? '' : 'lg:grid-cols-2'} gap-12 items-stretch`}>
          {/* Google Map */}
          <div className={`w-full ${isSubpage ? 'h-[300px]' : 'min-h-[300px] lg:h-full'} bg-charcoal/5 overflow-hidden border border-charcoal/10 grayscale contrast-125 brightness-90`}>
            <iframe
              title="Sentiment Tattoo Location"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              src={fallbackEmbedUrl}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              sandbox="allow-scripts allow-same-origin allow-popups"
            ></iframe>
          </div>

          {/* Contact Details */}
          <div className={`flex flex-col justify-between space-y-6 ${isSubpage ? '' : 'lg:pl-12'}`}>
            <div className="w-full max-w-md">
              <h3 className="text-[10px] uppercase tracking-mega text-charcoal/40 mb-3 flex items-center font-light">
                <MapPin className="w-3.5 h-3.5 mr-2 stroke-[1.25]" /> {content.tag === 'The Essentials' || isSubpage ? 'Location' : 'Helyszín'}
              </h3>
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(content.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block border border-charcoal/10 hover:border-charcoal/40 bg-white text-charcoal py-4 px-6 text-xs uppercase tracking-widest leading-relaxed w-full text-center md:text-left hover:bg-charcoal hover:text-off-white transition-all duration-500 rounded-none font-light shadow-sm"
              >
                {content.address}
              </a>
            </div>

            <div className="w-full max-w-md">
              <h3 className="text-[10px] uppercase tracking-mega text-charcoal/40 mb-3 flex items-center font-light">
                <Instagram className="w-3.5 h-3.5 mr-2 stroke-[1.25]" /> Instagram
              </h3>
              <a 
                href={content.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block border border-charcoal/10 hover:border-charcoal/40 bg-white text-charcoal py-4 px-6 text-xs uppercase tracking-widest hover:bg-charcoal hover:text-off-white transition-all duration-500 w-full text-center md:text-left rounded-none font-light shadow-sm"
              >
                {content.instagramHandle}
              </a>
            </div>

            <div className="w-full max-w-md">
              <h3 className="text-[10px] uppercase tracking-mega text-charcoal/40 mb-3 flex items-center font-light">
                <Mail className="w-3.5 h-3.5 mr-2 stroke-[1.25]" /> Email
              </h3>
              <a 
                href={`mailto:${content.email}`}
                className="block border border-charcoal/10 hover:border-charcoal/40 bg-white text-charcoal py-4 px-6 text-xs uppercase tracking-widest hover:bg-charcoal hover:text-off-white transition-all duration-500 w-full text-center md:text-left rounded-none font-light shadow-sm"
              >
                {content.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
