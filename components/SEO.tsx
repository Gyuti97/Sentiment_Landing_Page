import React, { useEffect } from 'react';

interface SEOProps {
  page: string;
  language: 'en' | 'hu';
}

const seoData = {
  hu: {
    main: {
      title: 'Sentiment Tattoo Studio | Finomvonalas & Egyedi Tetoválások Győr',
      description: 'Luxus tetováló stúdió Győrben Árvai Reginával. Finomvonalas árnyékolásra és egyedi mintákra szakosodva, csendes együttműködésben, meghitt és időtlen stílusban.',
      keywords: 'tetoválás győr, finomvonalas tetoválás, Árvai Regina, Sentiment Tattoo, fineline tetováló, egyedi tetoválás tervezés, tetováló stúdió Győr'
    },
    about: {
      title: 'Rólam - Árvai Regina | Sentiment Tattoo Studio',
      description: 'Ismerd meg Árvai Reginát, a Sentiment Tattoo Studio művészét. Finom és jelentőségteljes tetoválások, melyek az egyén történetével rezonálnak.',
      keywords: 'Árvai Regina, tetováló művész Győr, Sentiment stúdió, finomvonalas tetováló, női tetováló'
    },
    gallery: {
      title: 'Galéria & Minták - Sentiment Tattoo Studio',
      description: 'Tekintsd meg legszebb egyedi munkáimat és szabadon foglalható flash mintáimat. Finomvonalas tetoválások kiemelkedő stílusban, Győr szívében.',
      keywords: 'tetoválás galéria, elérhető minták, tattoo flash, győri tetoválások, fineline tetkók, tetováló portfólió'
    },
    booking: {
      title: 'Foglalás & Ajánlatkérés - Sentiment Tattoo Studio',
      description: 'Kezdd el a tetoválásod tervezési folyamatát nálam. Küldd el ötleteidet és kérj konzultációs időpontot egyszerűen az online felületen.',
      keywords: 'időpontfoglalás tetoválás, tetováló konzultáció Győr, Regina Árvai foglalás, tetoválás egyeztetés'
    },
    info: {
      title: 'Fontos Információk & Árak - Sentiment Tattoo Studio',
      description: 'Tájékozódj a foglalási szabályokról, a tetoválások árairól, a foglaló összegéről és a fineline tetoválások ápolásáról.',
      keywords: 'tetoválás árak Győr, tetováló foglaló, fineline tetoválás tartósság, stúdió szabályzat, tetoválás ápolás'
    }
  },
  en: {
    main: {
      title: 'Sentiment Tattoo Studio | Fine Line & Custom Tattoos Győr',
      description: 'Luxury tattoo experience in Győr, Hungary by Regina Árvai. Specializing in delicate fine line shading and custom designs. A quiet collaboration for permanent art.',
      keywords: 'tattoo győr, fine line tattoo, Regina Arvai, Sentiment Tattoo, fineline tattoo artist, custom tattoo design, luxury tattoo studio Hungary'
    },
    about: {
      title: 'About Regina Árvai | Sentiment Tattoo Studio',
      description: 'Meet Regina Árvai, the tattoo artist behind Sentiment. Dedicated to delicate fine line ink that tells your personal story and captures emotions.',
      keywords: 'Regina Arvai, tattoo artist Győr, Sentiment studio, female tattoo artist, fine line tattooist'
    },
    gallery: {
      title: 'Tattoo Gallery & Designs - Sentiment Tattoo Studio',
      description: 'Browse my custom tattoo portfolio and find available exclusive flash designs. Elegant fine line tattoos with exquisite craftsmanship in Győr.',
      keywords: 'tattoo portfolio, available designs, tattoo flash, Győr tattoos, fineline ink, tattoo gallery'
    },
    booking: {
      title: 'Booking & Inquiry - Sentiment Tattoo Studio',
      description: 'Initiate your tattoo journey. Book an inquiry or schedule a design consultation with Regina Árvai at Sentiment.',
      keywords: 'book tattoo Győr, tattoo inquiry, Regina Arvai booking, tattoo design consultation'
    },
    info: {
      title: 'Studio Info, Pricing & Policies - Sentiment Tattoo Studio',
      description: 'Get essential information about booking deposits, general pricing ranges, custom tattoo design consultations, and studio guidelines.',
      keywords: 'tattoo pricing Győr, tattoo deposit, fine line fading, studio policies, tattoo aftercare'
    }
  }
};

const SEO: React.FC<SEOProps> = ({ page, language }) => {
  useEffect(() => {
    // 1. Get corresponding localized tags
    const activeData = seoData[language][page as keyof typeof seoData['en']] || seoData[language].main;
    const titleText = activeData.title;
    const descriptionText = activeData.description;
    const keywordsText = activeData.keywords;

    // 2. Set dynamic title
    document.title = titleText;

    // 3. Set HTML Lang attribute dynamically (vital for SEO & Accessibility)
    document.documentElement.lang = language;

    // 4. Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', descriptionText);

    // 5. Update Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', keywordsText);

    // 6. Set Canonical Link
    const pagePath = page === 'main' ? '' : page;
    const canonicalUrl = `https://sentiment.hu/${pagePath}`;
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // 7. Update Open Graph Meta Tags for Facebook, Instagram, LinkedIn
    const ogTags = {
      'og:title': titleText,
      'og:description': descriptionText,
      'og:url': canonicalUrl,
      'og:type': 'website',
      'og:image': 'https://sentiment.hu/assets/gallery/finished_tattoos/3.webp',
      'og:site_name': 'Sentiment Tattoo Studio',
      'og:locale': language === 'hu' ? 'hu_HU' : 'en_US'
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      let ogMeta = document.querySelector(`meta[property="${property}"]`);
      if (!ogMeta) {
        ogMeta = document.createElement('meta');
        ogMeta.setAttribute('property', property);
        document.head.appendChild(ogMeta);
      }
      ogMeta.setAttribute('content', content);
    });

    // 8. Update Twitter Card Meta Tags
    const twitterTags = {
      'twitter:card': 'summary_large_image',
      'twitter:title': titleText,
      'twitter:description': descriptionText,
      'twitter:image': 'https://sentiment.hu/assets/gallery/finished_tattoos/3.webp'
    };

    Object.entries(twitterTags).forEach(([name, content]) => {
      let twitterMeta = document.querySelector(`meta[name="${name}"]`);
      if (!twitterMeta) {
        twitterMeta = document.createElement('meta');
        twitterMeta.setAttribute('name', name);
        document.head.appendChild(twitterMeta);
      }
      twitterMeta.setAttribute('content', content);
    });

    // 9. Inject JSON-LD Schema.org Structured Data Markup (Massive SEO rating win)
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      'name': 'Sentiment Tattoo Studio',
      'alternateName': 'Sentiment Tattoo & Art',
      'url': 'https://sentiment.hu',
      'logo': 'https://sentiment.hu/favicon.svg',
      'image': 'https://sentiment.hu/assets/gallery/finished_tattoos/3.webp',
      'description': descriptionText,
      'telephone': '+36203229497',
      'email': 'info@sentiment.hu',
      'priceRange': '$$',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'József Attila utca 99',
        'addressLocality': 'Győr',
        'postalCode': '9028',
        'addressCountry': 'HU'
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': 47.6685,
        'longitude': 17.6534
      },
      'openingHoursSpecification': {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday'
        ],
        'opens': '09:00',
        'closes': '17:00'
      },
      'sameAs': [
        'https://www.instagram.com/clubsentiment/',
        'https://www.facebook.com/profile.php?id=61567471132497'
      ],
      'founder': {
        '@type': 'Person',
        'name': 'Regina Árvai',
        'jobTitle': 'Tattoo Artist & Founder'
      }
    };

    let schemaScript = document.getElementById('seo-structured-data');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.setAttribute('id', 'seo-structured-data');
      schemaScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify(structuredData);

    // Clean up if component is updated
    return () => {
      // Optional: keep it simple and clean, no need to tear down since next render updates it
    };
  }, [page, language]);

  return null; // This component has no visual output; it purely works on metadata
};

export default SEO;
