
import React from 'react';
import Contact from './Contact';

const InfoSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="py-10 first:pt-0 border-b border-charcoal/5 last:border-0 text-left">
    <h3 className="font-serif text-2xl md:text-3xl font-light italic mb-5 text-charcoal/95">{title}</h3>
    <div className="font-sans text-xs md:text-sm leading-relaxed space-y-3 text-charcoal/70 font-light">
      {children}
    </div>
  </div>
);

interface InfoProps {
  content: {
    tag: string;
    title: string;
    sections: {
      title: string;
      content: string[];
    }[];
    footerMessage: string;
  };
  contact: {
    tag: string;
    title: string;
    address: string;
    instagram: string;
    instagramHandle: string;
    email: string;
  };
}

const Info: React.FC<InfoProps> = ({ content, contact }) => {
  return (
    <section className="bg-off-white py-24 md:py-36">
      <div className="container mx-auto px-6 text-center max-w-2xl">
        <p className="text-xs uppercase tracking-mega text-charcoal/50 mb-3 font-light">{content.tag}</p>
        <h2 className="font-serif text-5xl md:text-6xl font-light tracking-tight mb-20">{content.title}</h2>

        <div className="flex flex-col border-t border-charcoal/10 pt-4">
          {content.sections.map((section, idx) => (
            <InfoSection key={idx} title={section.title}>
              {section.content.map((p, pIdx) => (
                <p key={pIdx} dangerouslySetInnerHTML={{ __html: p }} />
              ))}
            </InfoSection>
          ))}
        </div>

        {content.footerMessage && (
          <div className="mt-20 pt-10 border-t border-charcoal/10">
            <p className="font-serif text-lg md:text-xl italic text-charcoal/60 font-light tracking-wide">
              {content.footerMessage}
            </p>
          </div>
        )}

      </div>

      <div className="mt-24 container mx-auto px-6 max-w-2xl">
        <Contact content={contact} isSubpage={true} />
      </div>
    </section>
  );
};

export default Info;
