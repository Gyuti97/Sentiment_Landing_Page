
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Specialization from './components/Specialization';
import Contact from './components/Contact';
import Inquiry from './components/Inquiry';
import Footer from './components/Footer';
import Info from './components/Info';
import Booking from './components/Booking';
import About from './components/About';
import Gallery from './components/Gallery';
import SEO from './components/SEO';

// Import local WebP gallery pictures
import gallery1 from './assets/gallery/finished_tattoos/1.webp';
import gallery2 from './assets/gallery/finished_tattoos/2.webp';
import gallery3 from './assets/gallery/finished_tattoos/3.webp';
import gallery4 from './assets/gallery/finished_tattoos/4.webp';
import gallery5 from './assets/gallery/finished_tattoos/5.webp';
import gallery6 from './assets/gallery/finished_tattoos/6.webp';

// Custom lightweight PageTransition container
const PageTransition: React.FC<{ children: React.ReactNode; pageKey: string }> = ({ children, pageKey }) => {
  return (
    <motion.div
      key={pageKey}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full flex-grow flex flex-col"
    >
      {children}
    </motion.div>
  );
};

/**
 * HOW TO CHANGE PICTURES:
 * 1. Find the section you want to update (e.g., philosophy, about, gallery).
 * 2. Replace the 'url' or 'image' string with your own image link.
 * 3. You can use services like postimg.cc or imgur.com to host your pictures.
 */

const content = {
  en: {
    header: {
      topBanner: "Let's create something permanent, shall we?",
      nav: {
        info: 'Info & Contact',
        booking: 'Booking',
        about: 'About Me',
        gallery: 'Gallery',
      }
    },
    hero: {
      title: 'SENTIMENT',
      subtitle: 'Ink as intimate as memory.',
      image: gallery3,
    },
    philosophy: {
      tag: 'My Approach',
      title: 'A Canvas for Feeling',
      quote: 'Where every line holds a story you want to tell.',
      body: "You've come to the right place. I believe a tattoo is more than ink; it's a permanent reflection of a moment, a feeling, a part of you. My process is a quiet collaboration, designed to translate your inner world into a piece of art that feels both timeless and deeply personal.",
      button: 'About Me',
      image: gallery1,
    },
    specialization: {
      tag: 'Specializing In Fine Shading',
      title: 'PORTFOLIO',
      description: 'Discover a selection of my finest custom works below, and visit the Gallery subpage to explore my currently available flash designs.',
      button: 'Gallery',
      images: [
        { url: gallery1, alt: 'Delicate tattoo work' },
        { url: gallery2, alt: 'Studio atmosphere' },
        { url: gallery3, alt: 'Fine line details' },
      ]
    },
    contact: {
      tag: 'Find Me',
      title: 'Location',
      address: '9028 Győr, József Attila utca 99.',
      instagram: 'https://www.instagram.com/clubsentiment/',
      instagramHandle: '@clubsentiment',
      email: 'info@sentiment.hu',
    },
    inquiry: {
      title: 'Begin a Conversation',
      body: 'Your story is unique, and your tattoo should be too. I invite you to share your vision with me. Whether a fully formed concept or a fleeting feeling, let\'s begin the collaborative process of creating a piece of art that will resonate for a lifetime.',
      button: 'Book Now',
    },
    info: {
      tag: 'The Essentials',
      title: 'INFORMATION',
      sections: [
        {
          title: 'Booking Deposit',
          content: [
            'A deposit is mandatory in all cases. I will send a link once we have found a suitable appointment. This will be deducted from the final price.',
            'Your appointment is valid from the moment the deposit arrives.',
            '• small design: 8,000 HUF',
            '• from 10 cm: 10,000 HUF',
            '• large tattoo: 40% of the pre-agreed price'
          ]
        },
        {
          title: 'General Pricing',
          content: [
            '<strong>minis:</strong> from 18,000 HUF base price',
            '<strong>small up to 10cm:</strong> 18,000 - 40,000 HUF depending on complexity (from fine line to portrait)',
            '<strong>large:</strong> for designs covering almost or entirely a body part over 10 cm, the price will be discussed individually.',
            'I can give a more specific quote once we have finalized the specific design.'
          ]
        },
        {
          title: 'Custom Tattoo & Design',
          content: [
            '<strong>Design Consultation (approx. 40-60 mins):</strong> Want a tattoo but don\'t know what? It\'s my job to realize it for you. Book an appointment to sit down and together we\'ll figure out from a half-baked idea or just a style you like what will truly suit you.',
            '6,000 HUF / session + the design process fee depending on how many hours it takes.',
            'Small "found online" tattoos: I redesign these by default, I don\'t tattoo copies of other artists\' work – this is done at no extra charge.'
          ]
        },
        {
          title: 'Fine, Faded, Forever',
          content: [
            '<strong>fineline:</strong> it has a quality of looking amazing, but also a tendency to fade. I\'m happy to touch it up for the cost of materials; I think it\'s worth coming back 1-2 times, then it stays in and we end up with a beautiful fine-line tattoo for life.'
          ]
        },
        {
          title: 'Attendance & Rescheduling',
          content: [
            'Deposits are non-refundable. In case of illness or extreme circumstances, I will apply it to your new appointment.',
            'If you simply cannot make it, don\'t feel like it, etc., and want to book a new time because it\'s more convenient, that requires a new deposit.',
            'We discuss and fix the design in advance. I send the design three days before, and only minor modifications are possible on the day.',
            '<strong>Important!</strong> If you think of more designs you want, I can only give a new appointment for those; I cannot take on random ideas on the day.'
          ]
        }
      ],
      footerMessage: 'LET\'S CREATE SOMETHING BEAUTIFUL, PROFESSIONAL AND ETERNAL ❤️'
    },
    booking: {
      tag: 'The First Step',
      title: 'BOOKING INQUIRY',
      body: 'Thank you for your interest in creating with me. Please fill out the form below with as much detail as possible. This is the first step in my collaborative process. I review submissions periodically and will respond within 5-7 business days if your project aligns with my artistic direction.',
      buttonText: 'Fill out the form to get in touch',
      formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfrAmnBiQ6C4_2Vpj1rmJWTSZanVBizE9F1T7fBcBChyhKuSw/viewform?embedded=true'
    },
    about: {
      tag: 'Meet the Artist: Regina Árvai',
      title: 'ABOUT ME',
      artistName: 'Regina Árvai',
      artistBio: "My journey with ink began as a search for a way to make the intangible permanent. I specialize in delicate, meaningful pieces that resonate with the individual's story.\n\nEvery tattoo I create is a collaborative effort. I believe in taking the time to understand the sentiment behind the request, ensuring that the final piece is not just art on skin, but a part of who you are.",
      artistImage: gallery2,
    },
    footer: {
      copyright: `© ${new Date().getFullYear()} Sentiment Tattoo Studio. All Rights Reserved.`,
      imprintLabel: 'Imprint',
      gtcLabel: 'Terms & Conditions',
      imprintTitle: 'IMPRINT',
      imprintPlaceholder: `<div class="space-y-4 font-sans text-charcoal/70">
        <div>
          <span class="block uppercase tracking-wider text-[10px] text-charcoal/40 font-medium">Full Name</span>
          <span class="text-sm text-charcoal font-normal">Regina Árvai Sole Proprietor (EV.)</span>
        </div>
        <div>
          <span class="block uppercase tracking-wider text-[10px] text-charcoal/40 font-medium">Registered Office</span>
          <span class="text-sm text-charcoal font-normal">3 Málna utca, 9085 Pázmándfalu, Hungary</span>
        </div>
        <div>
          <span class="block uppercase tracking-wider text-[10px] text-charcoal/40 font-medium">Tax Number</span>
          <span class="text-sm text-charcoal font-normal">91876564-1-28</span>
        </div>
        <div>
          <span class="block uppercase tracking-wider text-[10px] text-charcoal/40 font-medium">Professional Chamber</span>
          <span class="text-sm text-charcoal font-normal">Chamber of Commerce and Industry of Győr-Moson-Sopron County</span>
        </div>
        <div>
          <span class="block uppercase tracking-wider text-[10px] text-charcoal/40 font-medium">Main Activity</span>
          <span class="text-sm text-charcoal font-normal">969911 Tattooing, body piercing</span>
        </div>
        <div>
          <span class="block uppercase tracking-wider text-[10px] text-charcoal/40 font-medium font-sans">Contact (Mobile)</span>
          <span class="text-sm text-charcoal font-normal font-mono">+36 20 322 9497</span>
        </div>
        <div>
          <span class="block uppercase tracking-wider text-[10px] text-charcoal/40 font-medium font-sans">Contact (Email)</span>
          <a href="mailto:info@sentiment.hu" class="text-sm text-charcoal font-normal hover:opacity-70 transition-opacity duration-300 font-mono">info@sentiment.hu</a>
        </div>
      </div>`,
      gtcTitle: 'GENERAL TERMS & CONDITIONS',
      gtcContent: 'No data collection takes place on this website. Our services are based entirely on direct, voluntary inquiries.'
    },
    gallery: {
      tag: 'The Portfolio',
      title: 'GALLERY',
      images: []
    },
  },
  hu: {
    header: {
      topBanner: 'Alkossunk valami maradandót, rendben?',
      nav: {
        info: 'Infó & Kapcsolat',
        booking: 'Foglalás',
        about: 'Rólam',
        gallery: 'Galéria',
      }
    },
    hero: {
      title: 'SENTIMENT',
      subtitle: 'Tinta, oly meghitt, mint egy emlék.',
      image: gallery3,
    },
    philosophy: {
      tag: 'Megközelítésem',
      title: 'Vászon az Érzéseknek',
      quote: 'Ahol minden vonal egy történetet rejt, amit el akarsz mesélni.',
      body: 'A legjobb helyen jársz. Hiszem, hogy egy tetoválás több, mint tinta; egy pillanat, egy érzés, egy részed maradandó tükörképe. A folyamatom egy csendes együttműködés, melynek célja, hogy belső világodat egy olyan műalkotássá alakítsam, ami időtlennek és mélyen személyesnek érződik.',
      button: 'Rólam',
      image: gallery1,
    },
    specialization: {
      tag: 'Szakterületem, finom árnyékolás',
      title: 'PORTFOLIO',
      description: 'Tekintsd meg kiemelt egyedi munkáimat alább, a szabadon foglalható mintákért (flash) pedig látogass el a Galéria aloldalamra.',
      button: 'Galéria',
      images: [
        { url: gallery1, alt: 'Finom tetoválás' },
        { url: gallery2, alt: 'Stúdió hangulat' },
        { url: gallery3, alt: 'Részletgazdag munka' },
      ]
    },
    contact: {
      tag: 'Itt találsz meg',
      title: 'Helyszín',
      address: '9028 Győr, József Attila utca 99.',
      instagram: 'https://www.instagram.com/clubsentiment/',
      instagramHandle: '@clubsentiment',
      email: 'info@sentiment.hu',
    },
    inquiry: {
      title: 'Kezdeményezz Beszélgetést',
      body: 'A te történeted egyedi, és a tetoválásodnak is annak kell lennie. Arra invitállak, hogy oszd meg velem az elképzelésedet. Legyen szó egy teljesen kidolgozott koncepcióról vagy egy röpke érzésről, kezdjük el együtt egy olyan műalkotás megteremtésének folyamatát, amely egy életen át visszhangra talál.',
      button: 'Foglalás Most',
    },
    info: {
      tag: 'A Lényeg',
      title: 'INFORMÁCIÓ',
      sections: [
        {
          title: 'Foglaló',
          content: [
            'Foglaló minden esetben kötelező. Küldök linket, amikor megtaláltuk a megfelelő időpontodat. Ez levonódik a végösszegből.',
            'Amint megérkezik hozzám, onnantól érvényes az időpontod.',
            '• kis minta: 8.000 Ft',
            '• 10 cm-től: 10.000 Ft',
            '• nagy tetkó: az előre megbeszélt ár 40%-a'
          ]
        },
        {
          title: 'Árazás általában',
          content: [
            '<strong>minik:</strong> 18.000 Ft alapártól',
            '<strong>kicsik 10cm-ig:</strong> 18-40.000 Ft komplexitástól függően (egyvonalastól portréig)',
            '<strong>nagyok:</strong> 10 cm felett egy testrészedet majdnem vagy teljesen lefedő minták árát egyénileg beszéljük meg.',
            'Ennél konkrétabbat akkor tudok mondani, ha kitaláltuk a konkrét tetkód.'
          ]
        },
        {
          title: 'Egyedi Tetkó és Tervezés',
          content: [
            '<strong>Megtervezős Összeülés (kb. 40-60 perc):</strong> Szeretnél tetkót de nem tudod mit? Ezt az én dolgom Neked megvalósítani. Foglalj egy időpontot arra, hogy leüljünk és együtt kitaláljuk a félkész ötletből vagy csak tetsző stílusból, hogy mi lesz az igazán Neked való.',
            '6.000 Ft / alkalom + a tervezési folyamat díja attól függően, hány órát vesz majd igénybe.',
            'Kis "kinéztem online" tetkók: ezeket alapból áttervezem, nem varrok fel olyat, amit csak lemásolunk – felár nélkül.'
          ]
        },
        {
          title: 'Vékonyan, halványan, tartósan',
          content: [
            '<strong>fineline:</strong> van egy olyan tulajdonsága, hogy bombajól néz ki, meg egy olyan, hogy szeret kikopni. Anyagárban átütöm szívesen, szerintem megéri 1-2-szer visszajönni, utána bennemarad és ugyanott kötünk ki, hogy egész életedre van egy szép finomvonalas tetkód.'
          ]
        },
        {
          title: 'Megjelenés és Halasztás',
          content: [
            'A foglaló nem jár vissza. Betegség és extrém esetekben az új időpontodhoz hozzárakom.',
            'Ha csak nem tudsz eljönni, nincs kedved, egyéb, és újat foglalnál mert máskor kényelmesebb, az új foglalót jelent.',
            'Előre megbeszéljük és fixáljuk mi lesz a minta. Három nappal előtte küldöm a tervet, aznap egy picit még lehet módosítani.',
            '<strong>Fontos!</strong> Ha még eszedbe jut pár minta amit szeretnél, arra majd új időpontot fogok tudni adni, aznap nem tudok még random ötleteket vállalni.'
          ]
        }
      ],
      footerMessage: 'HOZZUNK LÉTRE VALAMI GYÖNYÖRŰT, PROFIT ÉS ÖRÖKKÉVALÓT ❤️'
    },
    booking: {
      tag: 'Az Első Lépés',
      title: 'FOGLALÁSI AJÁNLATKÉRÉS',
      body: 'Köszönöm érdeklődésedet, hogy velem szeretnél alkotni. Kérlek, töltsd ki az alábbi űrlapot a lehető legrészletesebben. Ez a közös folyamatunk első lépése. Az ajánlatkéréseket időszakosan bírálom el, és 5-7 munkanapon belül válaszolok, ha a projekt illeszkedik a művészi irányzatomhoz.',
      buttonText: 'Töltsd ki az űrlapot a kapcsolatfelvételhez',
      formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfrAmnBiQ6C4_2Vpj1rmJWTSZanVBizE9F1T7fBcBChyhKuSw/viewform?embedded=true' // IMPORTANT: Replace with your Hungarian Google Form URL
    },
    about: {
      tag: 'Ismerd meg a művészt: Árvai Regina',
      title: 'RÓLAM',
      artistName: 'Árvai Regina',
      artistBio: "A tintával való utazásom keresésként indult, hogy megtaláljam a módját a megfoghatatlan maradandóvá tételének. Finom, jelentőségteljes alkotásokra specializálódtam, amelyek rezonálnak az egyén történetével.\n\nMinden tetoválás, amit készítek, egy közös munka eredménye. Hiszek abban, hogy időt kell szánni a kérés mögötti érzés megértésére, biztosítva, hogy a végső darab ne csak művészet legyen a bőrön, hanem részeddé váljon.",
      artistImage: gallery2,
    },
    footer: {
      copyright: `© ${new Date().getFullYear()} Sentiment Tattoo Studio. Minden jog fenntartva.`,
      imprintLabel: 'Impresszum',
      gtcLabel: 'ÁSZF',
      imprintTitle: 'IMPRESSZUM',
      imprintPlaceholder: `<div class="space-y-4 font-sans text-charcoal/70">
        <div>
          <span class="block uppercase tracking-wider text-[10px] text-charcoal/40 font-medium">Teljes Név</span>
          <span class="text-sm text-charcoal font-normal">Árvai Regina EV.</span>
        </div>
        <div>
          <span class="block uppercase tracking-wider text-[10px] text-charcoal/40 font-medium">Székhely</span>
          <span class="text-sm text-charcoal font-normal">9085 Pázmándfalu, Málna utca 3.</span>
        </div>
        <div>
          <span class="block uppercase tracking-wider text-[10px] text-charcoal/40 font-medium">Adószám</span>
          <span class="text-sm text-charcoal font-normal">91876564-1-28</span>
        </div>
        <div>
          <span class="block uppercase tracking-wider text-[10px] text-charcoal/40 font-medium">Szakmai Kamara</span>
          <span class="text-sm text-charcoal font-normal">Győr-Moson-Sopron Vármegyei Kereskedelmi és Iparkamara</span>
        </div>
        <div>
          <span class="block uppercase tracking-wider text-[10px] text-charcoal/40 font-medium">Főtevékenység kódja</span>
          <span class="text-sm text-charcoal font-normal">969911 Tetoválás, testékszer-felhelyezés</span>
        </div>
        <div>
          <span class="block uppercase tracking-wider text-[10px] text-charcoal/40 font-medium font-sans">Elérhetőség (mobil)</span>
          <span class="text-sm text-charcoal font-normal font-mono">+36 20 322 9497</span>
        </div>
        <div>
          <span class="block uppercase tracking-wider text-[10px] text-charcoal/40 font-medium font-sans">Elérhetőség (email)</span>
          <a href="mailto:info@sentiment.hu" class="text-sm text-charcoal font-normal hover:opacity-70 transition-opacity duration-300 font-mono">info@sentiment.hu</a>
        </div>
      </div>`,
      gtcTitle: 'ÁLTALÁNOS SZERZŐDÉSI FELTÉTELEK',
      gtcContent: 'A weboldalon adatgyűjtés nem történik. Szolgáltatásaink igénybevétele közvetlen megkeresés alapján történik.'
    },
    gallery: {
      tag: 'A Portfólió',
      title: 'GALÉRIA',
      images: []
    },
  }
};


const App: React.FC = () => {
  const location = useLocation();
  const navigateRouter = useNavigate();

  // Derive page from URL path
  const getPageFromPath = (pathname: string) => {
    const cleanPath = pathname.replace(/\/$/, ''); // strip trailing slash
    if (cleanPath === '/info') return 'info';
    if (cleanPath === '/booking') return 'booking';
    if (cleanPath === '/about') return 'about';
    if (cleanPath === '/gallery') return 'gallery';
    return 'main';
  };

  const page = getPageFromPath(location.pathname);
  const [language, setLanguage] = useState<'en' | 'hu'>('hu');
  const [scrollToAnchor, setScrollToAnchor] = useState('');

  // Persist language preference in localStorage
  useEffect(() => {
    const storedLang = localStorage.getItem('sentiment_lang');
    if (storedLang === 'en' || storedLang === 'hu') {
      setLanguage(storedLang);
    }
  }, []);

  const handleSetLanguage = (lang: 'en' | 'hu') => {
    setLanguage(lang);
    localStorage.setItem('sentiment_lang', lang);
  };

  // Effect to handle scrolling to anchors on the main page
  useEffect(() => {
    if (page === 'main' && scrollToAnchor) {
      // Use a short timeout to ensure the main page components are rendered
      setTimeout(() => {
        const element = document.getElementById(scrollToAnchor);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setScrollToAnchor(''); // Reset after scrolling
      }, 100);
    }
  }, [page, scrollToAnchor]);
  
  const currentContent = content[language];

  const navigate = (targetPage: string, anchor: string = '') => {
    const route = targetPage === 'main' ? '/' : `/${targetPage}`;
    
    if (targetPage !== page) {
      navigateRouter(route);
      if (anchor) {
        setScrollToAnchor(anchor);
      } else {
        window.scrollTo(0, 0); // Scroll to top on page change
      }
    } else {
      if (anchor) { // if on the same page, just scroll
        const element = document.getElementById(anchor);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const renderMainPage = () => (
    <>
      <Hero content={currentContent.hero} navigate={navigate} currentLanguage={language} />
      <Philosophy navigate={navigate} content={currentContent.philosophy} />
      <Inquiry navigate={navigate} content={currentContent.inquiry} />
      <Specialization navigate={navigate} content={currentContent.specialization}/>
      <Contact content={currentContent.contact} />
    </>
  );
  
  const renderPage = () => {
    switch (page) {
      case 'info':
        return (
          <PageTransition pageKey="info">
            <Info content={currentContent.info} contact={currentContent.contact} />
          </PageTransition>
        );
      case 'booking':
        return (
          <PageTransition pageKey="booking">
            <Booking content={currentContent.booking} />
          </PageTransition>
        );
      case 'about':
        return (
          <PageTransition pageKey="about">
            <About content={currentContent.about} />
          </PageTransition>
        );
      case 'gallery':
        return (
          <PageTransition pageKey="gallery">
            <Gallery 
              content={currentContent.gallery} 
              currentLanguage={language}
              navigate={navigate}
            />
          </PageTransition>
        );
      default:
        return (
          <PageTransition pageKey="main">
            {renderMainPage()}
          </PageTransition>
        );
    }
  }

  return (
    <div className="bg-off-white font-sans text-charcoal overflow-x-clip min-h-screen flex flex-col justify-between">
      <SEO page={page} language={language} />
      <Header 
        navigate={navigate} 
        content={currentContent.header} 
        setLanguage={handleSetLanguage}
        currentLanguage={language}
      />
      <main className="flex-grow min-h-[70vh]">
        <AnimatePresence mode="wait">
          {renderPage()}
        </AnimatePresence>
      </main>
      <Footer content={currentContent.footer} />
    </div>
  );
};

export default App;
