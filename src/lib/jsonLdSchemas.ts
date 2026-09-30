const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.gulfestates.ae";

function cleanPath(pathname: string): string {
  let cleanPath = pathname?.replace(/\/$/, "") || "/";
  cleanPath = cleanPath?.replace(/^\/(en|fr|es)(\/|$)/, "/");
  if (!cleanPath || cleanPath === "") {
    cleanPath = "/";
  }
  return cleanPath;
}

function getHomePageSchema(locale: string): string {
  if (locale === "fr") {
    return `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "RealEstateAgent",
      "@id": "https://www.gulfestates.ae/#agent",
      "name": "Gulf Estates",
      "legalName": "Gulf Sea Real Estate LLC",
      "url": "https://www.gulfestates.ae/fr",
      "logo": "https://www.gulfestates.ae/fr/logo.png",
      "description": "Gulf Estates est une agence immobilière de premier plan à Dubaï, spécialisée dans l'immobilier de luxe, les projets sur plan et les investissements à haut rendement dans les Émirats arabes unis.",
      "founder": {
        "@type": "Person",
        "@id": "https://www.gulfestates.ae/#founder",
        "name": "Alexandre Photiou",
        "jobTitle": "Entrepreneur visionnaire et PDG",
        "description": "Entrepreneur dynamique et PDG de Gulf Sea Real Estate LLC, spécialisé dans l'immobilier résidentiel de luxe et les investissements dans les zones premium des Émirats arabes unis.",
        "url": "https://www.linkedin.com/in/alexandre-photiou"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "The Bayswater by Omniyat - Marasi Dr - Business Bay, 15th Floor - Office 1508",
        "addressLocality": "Business Bay",
        "addressRegion": "Dubai",
        "addressCountry": "AE"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 25.1854,
        "longitude": 55.2812
      },
      "hasMap": "https://www.google.com/maps/search/?api=1&query=The+Bayswater+by+Omniyat+Marasi+Dr+Business+Bay+Dubai",
      "telephone": "+97143521833",
      "email": "info@gulfestates.ae",
      "areaServed": [
        { "@type": "Place", "name": "Dubai", "sameAs": "https://www.wikidata.org/wiki/Q612" },
        { "@type": "Place", "name": "Abu Dhabi", "sameAs": "https://www.wikidata.org/wiki/Q1519" },
        { "@type": "Place", "name": "Palm Jumeirah", "sameAs": "https://www.wikidata.org/wiki/Q677896" },
        { "@type": "Place", "name": "Downtown Dubai", "sameAs": "https://www.wikidata.org/wiki/Q4695" }
      ],
      "knowsAbout": [
        "Immobilier de luxe à Dubaï",
        "Villas et penthouses de prestige",
        "Projets immobiliers sur plan",
        "Investissements immobiliers à haut rendement",
        "Résidences de marque",
        "Propriétés en bord de mer"
      ],
      "sameAs": [
        "https://www.linkedin.com/company/gulfestatesae",
        "https://www.instagram.com/gulfestates.ae/",
        "https://x.com/gulfestates",
        "https://www.tiktok.com/@gulfestates",
        "https://www.facebook.com/gulfestatesdubai/",
        "https://www.youtube.com/@GulfEstates",
        "https://www.bayut.com/companies/gulf-sea-real-estate-103032/",
        "https://www.propertyfinder.ae/en/company/gulf-sea-real-estate-llc.html"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "service client",
        "telephone": "+97143521833",
        "email": "info@gulfestates.ae",
        "areaServed": "AE",
        "availableLanguage": ["fr","en"]
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://www.gulfestates.ae/fr#website",
      "url": "https://www.gulfestates.ae/fr",
      "name": "Gulf Estates – Agence immobilière de luxe à Dubaï",
      "publisher": { "@id": "https://www.gulfestates.ae/#agent" },
      "inLanguage": "fr",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.gulfestates.ae/fr/search?query={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://www.gulfestates.ae/fr#webpage",
      "url": "https://www.gulfestates.ae/fr",
      "name": "Immobilier de luxe et projets sur plan à Dubaï",
      "description": "Découvrez des propriétés exclusives, des investissements sur plan et des opportunités immobilières premium dans les quartiers les plus prestigieux de Dubaï.",
      "inLanguage": "fr",
      "isPartOf": { "@id": "https://www.gulfestates.ae/fr#website" },
      "breadcrumb": { "@id": "https://www.gulfestates.ae/fr#breadcrumb" },
      "publisher": { "@id": "https://www.gulfestates.ae/#agent" }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.gulfestates.ae/fr#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Accueil",
          "item": "https://www.gulfestates.ae/fr"
        }
      ]
    }
  ]
}`;
  }

  if (locale === "es") {
    return `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "RealEstateAgent",
      "@id": "https://www.gulfestates.ae/#agent",
      "name": "Gulf Estates",
      "legalName": "Gulf Sea Real Estate LLC",
      "url": "https://www.gulfestates.ae/fr",
      "logo": "https://www.gulfestates.ae/fr/logo.png",
      "description": "Gulf Estates est une agence immobilière de premier plan à Dubaï, spécialisée dans l'immobilier de luxe, les projets sur plan et les investissements à haut rendement dans les Émirats arabes unis.",
      "founder": {
        "@type": "Person",
        "@id": "https://www.gulfestates.ae/#founder",
        "name": "Alexandre Photiou",
        "jobTitle": "Entrepreneur visionnaire et PDG",
        "description": "Entrepreneur dynamique et PDG de Gulf Sea Real Estate LLC, spécialisé dans l'immobilier résidentiel de luxe et les investissements dans les zones premium des Émirats arabes unis.",
        "url": "https://www.linkedin.com/in/alexandre-photiou"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "The Bayswater by Omniyat - Marasi Dr - Business Bay, 15th Floor - Office 1508",
        "addressLocality": "Business Bay",
        "addressRegion": "Dubai",
        "addressCountry": "AE"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 25.1854,
        "longitude": 55.2812
      },
      "hasMap": "https://www.google.com/maps/search/?api=1&query=The+Bayswater+by+Omniyat+Marasi+Dr+Business+Bay+Dubai",
      "telephone": "+97143521833",
      "email": "info@gulfestates.ae",
      "areaServed": [
        { "@type": "Place", "name": "Dubai", "sameAs": "https://www.wikidata.org/wiki/Q612" },
        { "@type": "Place", "name": "Abu Dhabi", "sameAs": "https://www.wikidata.org/wiki/Q1519" },
        { "@type": "Place", "name": "Palm Jumeirah", "sameAs": "https://www.wikidata.org/wiki/Q677896" },
        { "@type": "Place", "name": "Downtown Dubai", "sameAs": "https://www.wikidata.org/wiki/Q4695" }
      ],
      "knowsAbout": [
        "Immobilier de luxe à Dubaï",
        "Villas et penthouses de prestige",
        "Projets immobiliers sur plan",
        "Investissements immobiliers à haut rendement",
        "Résidences de marque",
        "Propriétés en bord de mer"
      ],
      "sameAs": [
        "https://www.linkedin.com/company/gulfestatesae",
        "https://www.instagram.com/gulfestates.ae/",
        "https://x.com/gulfestates",
        "https://www.tiktok.com/@gulfestates",
        "https://www.facebook.com/gulfestatesdubai/",
        "https://www.youtube.com/@GulfEstates",
        "https://www.bayut.com/companies/gulf-sea-real-estate-103032/",
        "https://www.propertyfinder.ae/en/company/gulf-sea-real-estate-llc.html"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "service client",
        "telephone": "+97143521833",
        "email": "info@gulfestates.ae",
        "areaServed": "AE",
        "availableLanguage": ["fr","en"]
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://www.gulfestates.ae/fr#website",
      "url": "https://www.gulfestates.ae/fr",
      "name": "Gulf Estates – Agence immobilière de luxe à Dubaï",
      "publisher": { "@id": "https://www.gulfestates.ae/#agent" },
      "inLanguage": "fr",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.gulfestates.ae/fr/search?query={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://www.gulfestates.ae/fr#webpage",
      "url": "https://www.gulfestates.ae/fr",
      "name": "Immobilier de luxe et projets sur plan à Dubaï",
      "description": "Découvrez des propriétés exclusives, des investissements sur plan et des opportunités immobilières premium dans les quartiers les plus prestigieux de Dubaï.",
      "inLanguage": "fr",
      "isPartOf": { "@id": "https://www.gulfestates.ae/fr#website" },
      "breadcrumb": { "@id": "https://www.gulfestates.ae/fr#breadcrumb" },
      "publisher": { "@id": "https://www.gulfestates.ae/#agent" }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.gulfestates.ae/fr#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Accueil",
          "item": "https://www.gulfestates.ae/fr"
        }
      ]
    }
  ]
}`;
  }

  // Default to English (en)
  return `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "RealEstateAgent",
      "@id": "https://www.gulfestates.ae/en#agent",
      "name": "Gulf Estates",
      "legalName": "Gulf Sea Real Estate LLC",
      "url": "https://www.gulfestates.ae/en",
      "logo": "https://www.gulfestates.ae/en/logo.png",
      "description": "Gulf Estates is a premier real estate agency in Dubai, specializing in luxury properties, off-plan investments, and high-return opportunities in the UAE's most exclusive communities.",
      "founder": {
        "@type": "Person",
        "@id": "https://www.gulfestates.ae/en#founder",
        "name": "Alexandre Photiou",
        "jobTitle": "Visionary Entrepreneur & CEO",
        "description": "A dynamic entrepreneur and CEO, leading Gulf Sea Real Estate LLC, specializing in luxury residential and investment properties across prime UAE locations. Experienced in yachts, logistics, events, and high-net-worth client services.",
        "url": "https://www.linkedin.com/in/alexandre-photiou"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "The Bayswater by Omniyat - Marasi Dr - Business Bay, 15th Floor - Office 1508",
        "addressLocality": "Business Bay",
        "addressRegion": "Dubai",
        "addressCountry": "AE"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 25.1854,
        "longitude": 55.2812
      },
      "hasMap": "https://www.google.com/maps/search/?api=1&query=The+Bayswater+by+Omniyat+Marasi+Dr+Business+Bay+Dubai",
      "telephone": "+97143521833",
      "email": "info@gulfestates.ae",
      "areaServed": [
        {
          "@type": "Place",
          "name": "Dubai City",
          "sameAs": "https://www.wikidata.org/wiki/Q612"
        },
        {
          "@type": "Place",
          "name": "Abu Dhabi",
          "sameAs": "https://www.wikidata.org/wiki/Q1519"
        },
        {
          "@type": "Place",
          "name": "Dubai Hills Estate",
          "sameAs": "https://www.wikidata.org/wiki/Q15806814"
        },
        {
          "@type": "Place",
          "name": "Downtown Dubai",
          "sameAs": "https://www.wikidata.org/wiki/Q4695"
        },
        {
          "@type": "Place",
          "name": "Palm Jumeirah",
          "sameAs": "https://www.wikidata.org/wiki/Q677896"
        },
        {
          "@type": "Place",
          "name": "Dubai Marina",
          "sameAs": "https://www.wikidata.org/wiki/Q45244"
        },
        {
          "@type": "Place",
          "name": "Business Bay",
          "sameAs": "https://www.wikidata.org/wiki/Q678835"
        }
      ],
      "knowsAbout": [
        "Luxury Villas & Penthouses",
        "Waterfront & Beachfront Penthouses",
        "High ROI Off-Plan Properties",
        "Exclusive Residential Communities",
        "Premium Investment Properties",
        "Luxury Apartments in Dubai",
        "Off-Plan Property Investments",
        "Luxury Waterfront Properties",
        "Branded Residences",
        "Sustainable Smart Homes"
      ],
      "sameAs": [
        "https://www.linkedin.com/company/gulfestatesae",
        "https://www.instagram.com/gulfestates.ae/",
        "https://x.com/gulfestates",
        "https://www.tiktok.com/@gulfestates",
        "https://www.facebook.com/gulfestatesdubai/",
        "https://www.youtube.com/@GulfEstates",
        "https://www.bayut.com/companies/gulf-sea-real-estate-103032/",
        "https://www.propertyfinder.ae/en/company/gulf-sea-real-estate-llc.html"
      ],
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "telephone": "+97143521833",
          "email": "info@gulfestates.ae",
          "areaServed": "AE",
          "availableLanguage": "en",
          "hoursAvailable": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
              "opens": "09:00",
              "closes": "18:00"
            },
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": "Saturday",
              "opens": "09:00",
              "closes": "14:00"
            }
          ]
        }
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://www.gulfestates.ae/en#website",
      "url": "https://www.gulfestates.ae/en",
      "name": "Gulf Estates – Dubai Luxury Real Estate Agency",
      "publisher": {
        "@id": "https://www.gulfestates.ae/en#agent"
      },
      "inLanguage": "en",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.gulfestates.ae/en/search?query={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://www.gulfestates.ae/en#webpage",
      "url": "https://www.gulfestates.ae/en",
      "name": "Gulf Estates – Dubai Luxury Real Estate & Off-Plan Properties",
      "description": "Explore elite listings, off-plan investments, and exclusive developments in Dubai's top locations with Gulf Estates. Trusted experts for buying, renting, or investing in luxury properties.",
      "inLanguage": "en",
      "isPartOf": {
        "@id": "https://www.gulfestates.ae/en#website"
      },
      "breadcrumb": {
        "@id": "https://www.gulfestates.ae/en#breadcrumb"
      },
      "publisher": {
        "@id": "https://www.gulfestates.ae/en#agent"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.gulfestates.ae/en#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.gulfestates.ae/en"
        }
      ]
    }
  ]
}`;
}

function getAboutPageSchema(locale: string): string {
  if (locale === "fr") {
    return `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "RealEstateAgent",
      "@id": "https://www.gulfestates.ae/#agent",
      "name": "Gulf Estates",
      "legalName": "Gulf Sea Real Estate LLC",
      "url": "https://www.gulfestates.ae",
      "logo": "https://www.gulfestates.ae/fr/logo.png",
      "description": "Gulf Estates est une agence immobilière de premier plan à Dubaï, spécialisée dans l'immobilier de luxe, les projets sur plan et les investissements à haut rendement dans les communautés les plus exclusives des Émirats arabes unis.",
      "founder": {
        "@type": "Person",
        "@id": "https://www.gulfestates.ae/#founder",
        "name": "Alexandre Photiou",
        "jobTitle": "Entrepreneur visionnaire et PDG",
        "description": "PDG de Gulf Sea Real Estate LLC, spécialisé dans l'immobilier résidentiel de luxe et les investissements à forte valeur ajoutée aux Émirats arabes unis.",
        "url": "https://www.linkedin.com/in/alexandre-photiou"
      },
      "parentOrganization": {
        "@type": "Organization",
        "@id": "https://www.centaurusgroup.com/#org",
        "name": "Centaurus Group",
        "url": "https://www.centaurusgroup.com/",
        "logo": "https://www.centaurusgroup.com/logo.png",
        "description": "Groupe international de luxe opérant dans l'immobilier, les yachts, le e-commerce et les services lifestyle."
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "The Bayswater by Omniyat - Marasi Dr - Business Bay, 15th Floor - Office 1508",
        "addressLocality": "Dubai",
        "addressRegion": "Dubai",
        "addressCountry": "AE"
      },
      "telephone": "+97143521833",
      "email": "info@gulfestates.ae",
      "sameAs": [
        "https://www.linkedin.com/company/gulfestatesae",
        "https://www.instagram.com/gulfestates.ae/",
        "https://www.facebook.com/gulfestatesdubai/"
      ]
    },
    {
      "@type": "WebPage",
      "@id": "https://www.gulfestates.ae/fr/about#webpage",
      "url": "https://www.gulfestates.ae/fr/about",
      "name": "À propos de Gulf Estates – Experts de l'immobilier de luxe à Dubaï",
      "description": "Découvrez Gulf Estates, agence immobilière de luxe à Dubaï, spécialisée dans les biens haut de gamme, les projets sur plan et les investissements à fort rendement.",
      "inLanguage": "fr",
      "isPartOf": {
        "@id": "https://www.gulfestates.ae/fr#website"
      },
      "publisher": {
        "@id": "https://www.gulfestates.ae/#agent"
      },
      "breadcrumb": {
        "@id": "https://www.gulfestates.ae/fr/about#breadcrumb"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://www.gulfestates.ae/fr#website",
      "url": "https://www.gulfestates.ae/fr",
      "name": "Gulf Estates – Agence immobilière de luxe à Dubaï",
      "publisher": {
        "@id": "https://www.gulfestates.ae/#agent"
      },
      "inLanguage": "fr"
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.gulfestates.ae/fr/about#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Accueil",
          "item": "https://www.gulfestates.ae/fr"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "À propos",
          "item": "https://www.gulfestates.ae/fr/about"
        }
      ]
    }
  ]
}`;
  }

  if (locale === "es") {
    return `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "RealEstateAgent",
      "@id": "https://www.gulfestates.ae/#agent",
      "name": "Gulf Estates",
      "legalName": "Gulf Sea Real Estate LLC",
      "url": "https://www.gulfestates.ae",
      "logo": "https://www.gulfestates.ae/es/logo.png",
      "description": "Gulf Estates es una agencia inmobiliaria líder en Dubái, especializada en propiedades de lujo, proyectos sobre plano e inversiones de alto rendimiento en las comunidades más exclusivas de los Emiratos Árabes Unidos.",
      "founder": {
        "@type": "Person",
        "@id": "https://www.gulfestates.ae/#founder",
        "name": "Alexandre Photiou",
        "jobTitle": "Emprendedor visionario y CEO",
        "description": "CEO de Gulf Sea Real Estate LLC, especializado en bienes raíces residenciales de lujo e inversiones inmobiliarias de alto valor en los EAU.",
        "url": "https://www.linkedin.com/in/alexandre-photiou"
      },
      "parentOrganization": {
        "@type": "Organization",
        "@id": "https://www.centaurusgroup.com/#org",
        "name": "Centaurus Group",
        "url": "https://www.centaurusgroup.com/",
        "logo": "https://www.centaurusgroup.com/logo.png",
        "description": "Grupo global de lujo con operaciones en bienes raíces, yates, comercio electrónico y servicios lifestyle."
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "The Bayswater by Omniyat - Marasi Dr - Business Bay, 15th Floor - Office 1508",
        "addressLocality": "Dubai",
        "addressRegion": "Dubai",
        "addressCountry": "AE"
      },
      "telephone": "+97143521833",
      "email": "info@gulfestates.ae",
      "sameAs": [
        "https://www.linkedin.com/company/gulfestatesae",
        "https://www.instagram.com/gulfestates.ae/",
        "https://www.facebook.com/gulfestatesdubai/"
      ]
    },
    {
      "@type": "WebPage",
      "@id": "https://www.gulfestates.ae/es/about#webpage",
      "url": "https://www.gulfestates.ae/es/about",
      "name": "Sobre Gulf Estates – Expertos en bienes raíces de lujo en Dubái",
      "description": "Conoce Gulf Estates, agencia inmobiliaria de lujo en Dubái especializada en propiedades premium, proyectos sobre plano e inversiones de alto rendimiento.",
      "inLanguage": "es",
      "isPartOf": {
        "@id": "https://www.gulfestates.ae/es#website"
      },
      "publisher": {
        "@id": "https://www.gulfestates.ae/#agent"
      },
      "breadcrumb": {
        "@id": "https://www.gulfestates.ae/es/about#breadcrumb"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://www.gulfestates.ae/es#website",
      "url": "https://www.gulfestates.ae/es",
      "name": "Gulf Estates – Agencia inmobiliaria de lujo en Dubái",
      "publisher": {
        "@id": "https://www.gulfestates.ae/#agent"
      },
      "inLanguage": "es"
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.gulfestates.ae/es/about#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Inicio",
          "item": "https://www.gulfestates.ae/es"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Sobre nosotros",
          "item": "https://www.gulfestates.ae/es/about"
        }
      ]
    }
  ]
}`;
  }

  // Default to English (en)
  return `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "RealEstateAgent",
      "@id": "https://www.gulfestates.ae/about#agent",
      "name": "Gulf Estates",
      "legalName": "Gulf Sea Real Estate LLC",
      "url": "https://www.gulfestates.ae/en/about",
      "logo": "https://www.gulfestates.ae/en/logo.png",
      "description": "Gulf Estates is a premier real estate agency in Dubai, specializing in luxury properties, off-plan investments, and high-return opportunities in the UAE's most exclusive communities. Part of the Centaurus Group, bringing unmatched expertise across luxury sectors.",
      "founder": {
        "@type": "Person",
        "@id": "https://www.gulfestates.ae/about#founder",
        "name": "Alexandre Photiou",
        "jobTitle": "Visionary Entrepreneur & CEO",
        "description": "Leading Gulf Sea Real Estate LLC with expertise in luxury residential and investment properties. CEO of Centaurus Group ventures including yachts, e-commerce, and bespoke services for high-net-worth individuals.",
        "url": "https://www.linkedin.com/in/alexandre-photiou"
      },
      "parentOrganization": {
        "@type": "Organization",
        "@id": "https://www.centaurusgroup.com/#org",
        "name": "Centaurus Group",
        "url": "https://www.centaurusgroup.com/",
        "logo": "https://www.centaurusgroup.com/logo.png",
        "description": "A global luxury group with ventures spanning real estate, yachts, e-commerce, and lifestyle services."
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "The Bayswater by Omniyat - Marasi Dr - Business Bay, 15th Floor - Office 1508",
        "addressLocality": "Business Bay",
        "addressRegion": "Dubai",
        "addressCountry": "AE"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 25.1854,
        "longitude": 55.2812
      },
      "hasMap": "https://www.google.com/maps/search/?api=1&query=The+Bayswater+by+Omniyat+Marasi+Dr+Business+Bay+Dubai",
      "telephone": "+97143521833",
      "email": "info@gulfestates.ae",
      "areaServed": [
        {"@type": "Place", "name": "Dubai City", "sameAs": "https://www.wikidata.org/wiki/Q612"},
        {"@type": "Place", "name": "Abu Dhabi", "sameAs": "https://www.wikidata.org/wiki/Q1519"},
        {"@type": "Place", "name": "Dubai Hills Estate", "sameAs": "https://www.wikidata.org/wiki/Q15806814"},
        {"@type": "Place", "name": "Downtown Dubai", "sameAs": "https://www.wikidata.org/wiki/Q4695"},
        {"@type": "Place", "name": "Palm Jumeirah", "sameAs": "https://www.wikidata.org/wiki/Q677896"},
        {"@type": "Place", "name": "Dubai Marina", "sameAs": "https://www.wikidata.org/wiki/Q45244"},
        {"@type": "Place", "name": "Business Bay", "sameAs": "https://www.wikidata.org/wiki/Q678835"}
      ],
      "knowsAbout": [
        "Luxury Villas & Penthouses",
        "Waterfront & Beachfront Penthouses",
        "High ROI Off-Plan Properties",
        "Exclusive Residential Communities",
        "Premium Investment Properties",
        "Luxury Apartments in Dubai",
        "Off-Plan Property Investments",
        "Luxury Waterfront Properties",
        "Branded Residences",
        "Sustainable Smart Homes"
      ],
      "sameAs": [
        "https://www.linkedin.com/company/gulfestatesae",
        "https://www.instagram.com/gulfestates.ae/",
        "https://x.com/gulfestates",
        "https://www.tiktok.com/@gulfestates",
        "https://www.facebook.com/gulfestatesdubai/",
        "https://www.youtube.com/@GulfEstates",
        "https://www.bayut.com/companies/gulf-sea-real-estate-103032/",
        "https://www.propertyfinder.ae/en/company/gulf-sea-real-estate-llc.html"
      ],
      "foundingDate": "2007",
      "memberOf": "Centaurus Group",
      "makesOffer": {
        "@type": "Offer",
        "name": "Real Estate Services",
        "description": "Buy, sell, rent, and invest in luxury and off-plan properties in Dubai."
      },
      "award": [
        "20+ Certified Awards",
        "20+ Years of Experience",
        "300+ Satisfied Clients",
        "1000+ Projects Completed"
      ]
    },
    {
      "@type": "WebPage",
      "@id": "https://www.gulfestates.ae/en/about#webpage",
      "url": "https://www.gulfestates.ae/en/about",
      "name": "About Gulf Estates – Dubai Luxury Real Estate Experts",
      "description": "Learn about Gulf Estates, a premier Dubai real estate agency offering luxury properties, off-plan investments, and high-return opportunities. Part of the Centaurus Group with a legacy of excellence in luxury sectors.",
      "inLanguage": "en",
      "isPartOf": {"@id": "https://www.gulfestates.ae/en#website"},
      "publisher": {"@id": "https://www.gulfestates.ae/en/about#agent"},
      "breadcrumb": {"@id": "https://www.gulfestates.ae/en/about#breadcrumb"}
    },
    {
      "@type": "WebSite",
      "@id": "https://www.gulfestates.ae/en#website",
      "url": "https://www.gulfestates.ae/en",
      "name": "Gulf Estates – Dubai Luxury Real Estate Agency",
      "publisher": {"@id": "https://www.gulfestates.ae/en/about#agent"},
      "inLanguage": "en"
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.gulfestates.ae/en/about#breadcrumb",
      "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.gulfestates.ae/en"},
        {"@type": "ListItem", "position": 2, "name": "About", "item": "https://www.gulfestates.ae/en/about"}
      ]
    }
  ]
}`;
}

function getContactPageSchema(locale: string): string {
  if (locale === "fr") {
    return `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "RealEstateAgent",
      "@id": "https://www.gulfestates.ae/fr/contact#agent",
      "name": "Gulf Estates",
      "legalName": "Gulf Sea Real Estate LLC",
      "url": "https://www.gulfestates.ae/fr/contact",
      "logo": "https://www.gulfestates.ae/en/logo.png",
      "description": "Gulf Estates est une agence immobilière de premier plan à Dubaï, spécialisée dans les propriétés de luxe, les projets sur plan et les investissements à haut rendement. Membre du groupe Centaurus, offrant une expertise immobilière inégalée.",
      "founder": {
        "@type": "Person",
        "@id": "https://www.gulfestates.ae/fr/contact#founder",
        "name": "Alexandre Photiou",
        "jobTitle": "Entrepreneur visionnaire et PDG",
        "url": "https://www.linkedin.com/in/alexandre-photiou"
      },
      "parentOrganization": {
        "@type": "Organization",
        "@id": "https://www.centaurusgroup.com/#org",
        "name": "Centaurus Group",
        "url": "https://www.centaurusgroup.com/"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "The Bayswater by Omniyat - Marasi Dr - Business Bay, 15th Floor - Office 1508",
        "addressLocality": "Dubaï",
        "addressRegion": "Dubaï",
        "addressCountry": "AE"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 25.1854,
        "longitude": 55.2812
      },
      "telephone": "+97143521833",
      "email": "info@gulfestates.ae",
      "hasMap": "https://maps.app.goo.gl/cRWHAxLjnyfSD7pB7",
      "areaServed": [
        { "@type": "Place", "name": "Dubaï", "sameAs": "https://www.wikidata.org/wiki/Q612" },
        { "@type": "Place", "name": "Abou Dabi", "sameAs": "https://www.wikidata.org/wiki/Q1519" }
      ],
      "sameAs": [
        "https://www.linkedin.com/company/gulfestatesae",
        "https://www.instagram.com/gulfestates.ae/",
        "https://x.com/gulfestates",
        "https://www.tiktok.com/@gulfestates",
        "https://www.facebook.com/gulfestatesdubai/",
        "https://www.youtube.com/@GulfEstates",
        "https://www.bayut.com/companies/gulf-sea-real-estate-103032/",
        "https://www.propertyfinder.ae/en/company/gulf-sea-real-estate-llc.html"
      ],
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
          "opens": "09:00",
          "closes": "18:00",
          "timeZone": "GST"
        }
      ]
    },
    {
      "@type": "WebPage",
      "@id": "https://www.gulfestates.ae/fr/contact#webpage",
      "url": "https://www.gulfestates.ae/fr/contact",
      "name": "Contactez Gulf Estates – Experts immobiliers de luxe à Dubaï",
      "description": "Contactez Gulf Estates pour acheter, vendre, louer ou investir dans l'immobilier de luxe à Dubaï. Contactez-nous par téléphone, email ou visitez notre bureau à Business Bay, Dubaï.",
      "inLanguage": "fr",
      "isPartOf": { "@id": "https://www.gulfestates.ae/fr#website" },
      "publisher": { "@id": "https://www.gulfestates.ae/fr/contact#agent" },
      "breadcrumb": { "@id": "https://www.gulfestates.ae/fr/contact#breadcrumb" }
    },
    {
      "@type": "WebSite",
      "@id": "https://www.gulfestates.ae/fr#website",
      "url": "https://www.gulfestates.ae/fr",
      "name": "Gulf Estates – Agence immobilière de luxe à Dubaï",
      "publisher": { "@id": "https://www.gulfestates.ae/fr/contact#agent" },
      "inLanguage": "fr"
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.gulfestates.ae/fr/contact#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://www.gulfestates.ae/fr" },
        { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://www.gulfestates.ae/fr/contact" }
      ]
    }
  ]
}`;
  }

  if (locale === "es") {
    return `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "RealEstateAgent",
      "@id": "https://www.gulfestates.ae/fr/contact#agent",
      "name": "Gulf Estates",
      "legalName": "Gulf Sea Real Estate LLC",
      "url": "https://www.gulfestates.ae/fr/contact",
      "logo": "https://www.gulfestates.ae/en/logo.png",
      "description": "Gulf Estates est une agence immobilière de premier plan à Dubaï, spécialisée dans les propriétés de luxe, les projets sur plan et les investissements à haut rendement. Membre du groupe Centaurus, offrant une expertise immobilière inégalée.",
      "founder": {
        "@type": "Person",
        "@id": "https://www.gulfestates.ae/fr/contact#founder",
        "name": "Alexandre Photiou",
        "jobTitle": "Entrepreneur visionnaire et PDG",
        "url": "https://www.linkedin.com/in/alexandre-photiou"
      },
      "parentOrganization": {
        "@type": "Organization",
        "@id": "https://www.centaurusgroup.com/#org",
        "name": "Centaurus Group",
        "url": "https://www.centaurusgroup.com/"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "The Bayswater by Omniyat - Marasi Dr - Business Bay, 15th Floor - Office 1508",
        "addressLocality": "Dubaï",
        "addressRegion": "Dubaï",
        "addressCountry": "AE"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 25.1854,
        "longitude": 55.2812
      },
      "telephone": "+97143521833",
      "email": "info@gulfestates.ae",
      "hasMap": "https://maps.app.goo.gl/cRWHAxLjnyfSD7pB7",
      "areaServed": [
        { "@type": "Place", "name": "Dubaï", "sameAs": "https://www.wikidata.org/wiki/Q612" },
        { "@type": "Place", "name": "Abou Dabi", "sameAs": "https://www.wikidata.org/wiki/Q1519" }
      ],
      "sameAs": [
        "https://www.linkedin.com/company/gulfestatesae",
        "https://www.instagram.com/gulfestates.ae/",
        "https://x.com/gulfestates",
        "https://www.tiktok.com/@gulfestates",
        "https://www.facebook.com/gulfestatesdubai/",
        "https://www.youtube.com/@GulfEstates",
        "https://www.bayut.com/companies/gulf-sea-real-estate-103032/",
        "https://www.propertyfinder.ae/en/company/gulf-sea-real-estate-llc.html"
      ],
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
          "opens": "09:00",
          "closes": "18:00",
          "timeZone": "GST"
        }
      ]
    },
    {
      "@type": "WebPage",
      "@id": "https://www.gulfestates.ae/fr/contact#webpage",
      "url": "https://www.gulfestates.ae/fr/contact",
      "name": "Contactez Gulf Estates – Experts immobiliers de luxe à Dubaï",
      "description": "Contactez Gulf Estates pour acheter, vendre, louer ou investir dans l'immobilier de luxe à Dubaï. Contactez-nous par téléphone, email ou visitez notre bureau à Business Bay, Dubaï.",
      "inLanguage": "fr",
      "isPartOf": { "@id": "https://www.gulfestates.ae/fr#website" },
      "publisher": { "@id": "https://www.gulfestates.ae/fr/contact#agent" },
      "breadcrumb": { "@id": "https://www.gulfestates.ae/fr/contact#breadcrumb" }
    },
    {
      "@type": "WebSite",
      "@id": "https://www.gulfestates.ae/fr#website",
      "url": "https://www.gulfestates.ae/fr",
      "name": "Gulf Estates – Agence immobilière de luxe à Dubaï",
      "publisher": { "@id": "https://www.gulfestates.ae/fr/contact#agent" },
      "inLanguage": "fr"
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.gulfestates.ae/fr/contact#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://www.gulfestates.ae/fr" },
        { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://www.gulfestates.ae/fr/contact" }
      ]
    }
  ]
}`;
  }

  // Default to English (en)
  return `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "RealEstateAgent",
      "@id": "https://www.gulfestates.ae/en/contact#agent",
      "name": "Gulf Estates",
      "legalName": "Gulf Sea Real Estate LLC",
      "url": "https://www.gulfestates.ae/en/contact",
      "logo": "https://www.gulfestates.ae/en/logo.png",
      "description": "Gulf Estates is a premier real estate agency in Dubai, specializing in luxury properties, off-plan investments, and high-return opportunities. Part of the Centaurus Group, offering unparalleled real estate expertise.",
      "founder": {
        "@type": "Person",
        "@id": "https://www.gulfestates.ae/en/contact#founder",
        "name": "Alexandre Photiou",
        "jobTitle": "Visionary Entrepreneur & CEO",
        "url": "https://www.linkedin.com/in/alexandre-photiou"
      },
      "parentOrganization": {
        "@type": "Organization",
        "@id": "https://www.centaurusgroup.com/#org",
        "name": "Centaurus Group",
        "url": "https://www.centaurusgroup.com/"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "The Bayswater by Omniyat - Marasi Dr - Business Bay, 15th Floor - Office 1508",
        "addressLocality": "Dubai",
        "addressRegion": "Dubai",
        "addressCountry": "AE"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 25.1854,
        "longitude": 55.2812
      },
      "telephone": "+97143521833",
      "email": "info@gulfestates.ae",
      "hasMap": "https://maps.app.goo.gl/cRWHAxLjnyfSD7pB7",
      "areaServed": [
        {"@type": "Place", "name": "Dubai City", "sameAs": "https://www.wikidata.org/wiki/Q612"},
        {"@type": "Place", "name": "Abu Dhabi", "sameAs": "https://www.wikidata.org/wiki/Q1519"}
      ],
      "sameAs": [
        "https://www.linkedin.com/company/gulfestatesae",
        "https://www.instagram.com/gulfestates.ae/",
        "https://x.com/gulfestates",
        "https://www.tiktok.com/@gulfestates",
        "https://www.facebook.com/gulfestatesdubai/",
        "https://www.youtube.com/@GulfEstates",
        "https://www.bayut.com/companies/gulf-sea-real-estate-103032/",
        "https://www.propertyfinder.ae/en/company/gulf-sea-real-estate-llc.html"
      ],
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
          ],
          "opens": "09:00",
          "closes": "18:00",
          "timeZone": "GST"
        }
      ]
    },
    {
      "@type": "WebPage",
      "@id": "https://www.gulfestates.ae/en/contact#webpage",
      "url": "https://www.gulfestates.ae/en/contact",
      "name": "Contact Gulf Estates – Dubai Luxury Real Estate Experts",
      "description": "Get in touch with Gulf Estates to buy, sell, rent, or invest in luxury Dubai properties. Contact via phone, email, or visit our office in Business Bay, Dubai.",
      "inLanguage": "en",
      "isPartOf": {"@id": "https://www.gulfestates.ae/en#website"},
      "publisher": {"@id": "https://www.gulfestates.ae/en/contact#agent"},
      "breadcrumb": {"@id": "https://www.gulfestates.ae/en/contact#breadcrumb"}
    },
    {
      "@type": "WebSite",
      "@id": "https://www.gulfestates.ae/en#website",
      "url": "https://www.gulfestates.ae/en",
      "name": "Gulf Estates – Dubai Luxury Real Estate Agency",
      "publisher": {"@id": "https://www.gulfestates.ae/en/contact#agent"},
      "inLanguage": "en"
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.gulfestates.ae/en/contact#breadcrumb",
      "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.gulfestates.ae/en"},
        {"@type": "ListItem", "position": 2, "name": "Contact", "item": "https://www.gulfestates.ae/en/contact"}
      ]
    }
  ]
}`;
}

function getCareersPageSchema(locale: string): string {
  if (locale === "fr") {
    return `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "RealEstateAgent",
      "@id": "https://www.gulfestates.ae/fr#agent",
      "name": "Gulf Estates",
      "legalName": "Gulf Sea Real Estate LLC",
      "url": "https://www.gulfestates.ae/fr",
      "logo": "https://www.gulfestates.ae/en/logo.png",
      "telephone": "+97143521833",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "The Bayswater by Omniyat - Marasi Dr - Business Bay, 15th Floor - Office 1508",
        "addressLocality": "Dubai",
        "addressCountry": "AE"
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://www.gulfestates.ae/fr/careers#webpage",
      "url": "https://www.gulfestates.ae/fr/careers",
      "inLanguage": "fr",
      "name": "Carrières chez Gulf Estates | Rejoignez notre équipe immobilière à Dubaï",
      "description": "Rejoignez l'équipe d'élite de Gulf Estates. Nous recherchons des conseillers immobiliers passionnés pour façonner l'avenir de l'immobilier de luxe à Dubaï.",
      "publisher": { "@id": "https://www.gulfestates.ae/fr#agent" },
      "breadcrumb": { "@id": "https://www.gulfestates.ae/fr/careers#breadcrumb" }
    },
    {
      "@type": "JobPosting",
      "@id": "https://www.gulfestates.ae/fr/careers#property-advisor",
      "title": "Conseiller Immobilier",
      "description": "Gulf Estates recherche des conseillers immobiliers motivés. Responsabilités : génération de leads, conseil client sur des projets off-plan de luxe et gestion des transactions immobilières dans les quartiers prisés de Dubaï.",
      "datePosted": "2025-12-24",
      "validThrough": "2026-06-30",
      "employmentType": "FULL_TIME",
      "hiringOrganization": { "@id": "https://www.gulfestates.ae/fr#agent" },
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Dubai",
          "addressRegion": "Dubai",
          "addressCountry": "AE"
        }
      },
      "industry": "Real Estate",
      "jobBenefits": "Structure de commission élevée, visa, assurance et support marketing.",
      "skills": "Négociation, Vente immobilière, Génération de leads, Connaissance du marché de Dubaï"
    },
    {
      "@type": "JobPosting",
      "@id": "https://www.gulfestates.ae/fr/careers#senior-property-advisor",
      "title": "Conseiller Immobilier Senior",
      "description": "Nous recherchons un conseiller immobilier senior expérimenté pour diriger des transactions à forte valeur et gérer des portefeuilles de propriétés de luxe pour des clients fortunés.",
      "datePosted": "2025-12-24",
      "validThrough": "2026-06-30",
      "employmentType": "FULL_TIME",
      "hiringOrganization": { "@id": "https://www.gulfestates.ae/fr#agent" },
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "The Bayswater by Omniyat - Marasi Dr - Business Bay, 15th Floor - Office 1508",
          "addressLocality": "Business Bay",
          "addressRegion": "Dubai",
          "addressCountry": "AE"
        }
      },
      "experienceRequirements": {
        "@type": "OccupationalExperienceRequirements",
        "monthsOfExperience": 36
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.gulfestates.ae/fr/careers#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://www.gulfestates.ae/fr" },
        { "@type": "ListItem", "position": 2, "name": "Carrières", "item": "https://www.gulfestates.ae/fr/careers" }
      ]
    }
  ]
}`;
  }

  if (locale === "es") {
    return `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "RealEstateAgent",
      "@id": "https://www.gulfestates.ae/es#agent",
      "name": "Gulf Estates",
      "legalName": "Gulf Sea Real Estate LLC",
      "url": "https://www.gulfestates.ae/es",
      "logo": "https://www.gulfestates.ae/en/logo.png",
      "telephone": "+97143521833",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "The Bayswater by Omniyat - Marasi Dr - Business Bay, 15th Floor - Office 1508",
        "addressLocality": "Dubai",
        "addressCountry": "AE"
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://www.gulfestates.ae/es/careers#webpage",
      "url": "https://www.gulfestates.ae/es/careers",
      "inLanguage": "es",
      "name": "Carreras en Gulf Estates | Únete a nuestro equipo inmobiliario en Dubái",
      "description": "Únete al equipo élite de Gulf Estates. Buscamos asesores inmobiliarios apasionados para dar forma al futuro del lujo inmobiliario en Dubái.",
      "publisher": { "@id": "https://www.gulfestates.ae/es#agent" },
      "breadcrumb": { "@id": "https://www.gulfestates.ae/es/careers#breadcrumb" }
    },
    {
      "@type": "JobPosting",
      "@id": "https://www.gulfestates.ae/es/careers#property-advisor",
      "title": "Asesor Inmobiliario",
      "description": "Gulf Estates busca asesores inmobiliarios motivados. Responsabilidades: generación de leads, asesoramiento a clientes en proyectos off-plan de lujo y gestión de transacciones inmobiliarias en las zonas más exclusivas de Dubái.",
      "datePosted": "2025-12-24",
      "validThrough": "2026-06-30",
      "employmentType": "FULL_TIME",
      "hiringOrganization": { "@id": "https://www.gulfestates.ae/es#agent" },
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Dubai",
          "addressRegion": "Dubai",
          "addressCountry": "AE"
        }
      },
      "industry": "Real Estate",
      "jobBenefits": "Alta estructura de comisiones, visa, seguro y soporte de marketing.",
      "skills": "Negociación, Ventas inmobiliarias, Generación de leads, Conocimiento del mercado de Dubái"
    },
    {
      "@type": "JobPosting",
      "@id": "https://www.gulfestates.ae/es/careers#senior-property-advisor",
      "title": "Asesor Inmobiliario Senior",
      "description": "Buscamos un asesor inmobiliario senior con experiencia para liderar transacciones de alto valor y gestionar portafolios de propiedades de lujo para clientes HNW.",
      "datePosted": "2025-12-24",
      "validThrough": "2026-06-30",
      "employmentType": "FULL_TIME",
      "hiringOrganization": { "@id": "https://www.gulfestates.ae/es#agent" },
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "The Bayswater by Omniyat - Marasi Dr - Business Bay, 15th Floor - Office 1508",
          "addressLocality": "Business Bay",
          "addressRegion": "Dubai",
          "addressCountry": "AE"
        }
      },
      "experienceRequirements": {
        "@type": "OccupationalExperienceRequirements",
        "monthsOfExperience": 36
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.gulfestates.ae/es/careers#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://www.gulfestates.ae/es" },
        { "@type": "ListItem", "position": 2, "name": "Carreras", "item": "https://www.gulfestates.ae/es/careers" }
      ]
    }
  ]
}`;
  }

  // Default to English (en)
  return `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "RealEstateAgent",
      "@id": "https://www.gulfestates.ae/en#agent",
      "name": "Gulf Estates",
      "legalName": "Gulf Sea Real Estate LLC",
      "url": "https://www.gulfestates.ae/en",
      "logo": "https://www.gulfestates.ae/en/logo.png",
      "telephone": "+97143521833",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "The Bayswater by Omniyat - Marasi Dr - Business Bay, 15th Floor - Office 1508",
        "addressLocality": "Dubai",
        "addressCountry": "AE"
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://www.gulfestates.ae/en/careers#webpage",
      "url": "https://www.gulfestates.ae/en/careers",
      "inLanguage": "en",
      "name": "Careers at Gulf Estates | Join Our Dubai Real Estate Team",
      "description": "Join the elite team at Gulf Estates. We are looking for passionate Property Advisors to help shape the future of luxury real estate in Dubai.",
      "publisher": { "@id": "https://www.gulfestates.ae/en#agent" },
      "breadcrumb": { "@id": "https://www.gulfestates.ae/en/careers#breadcrumb" }
    },
    {
      "@type": "JobPosting",
      "@id": "https://www.gulfestates.ae/en/careers#property-advisor",
      "title": "Property Advisor",
      "description": "Gulf Estates is seeking motivated Property Advisors. Responsibilities include lead generation, client advisory on luxury off-plan projects, and managing property transactions in prime Dubai areas.",
      "datePosted": "2025-12-24",
      "validThrough": "2026-06-30",
      "employmentType": "FULL_TIME",
      "hiringOrganization": { "@id": "https://www.gulfestates.ae/en#agent" },
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Dubai",
          "addressRegion": "Dubai",
          "addressCountry": "AE"
        }
      },
      "industry": "Real Estate",
      "jobBenefits": "High commission structure, visa, insurance, and marketing support.",
      "skills": "Negotiation, Real Estate Sales, Lead Generation, Dubai Market Knowledge"
    },
    {
      "@type": "JobPosting",
      "@id": "https://www.gulfestates.ae/en/careers#senior-property-advisor",
      "title": "Senior Property Advisor",
      "description": "Seeking an experienced Senior Property Advisor to lead high-value transactions and manage luxury property portfolios for HNW clients.",
      "datePosted": "2025-12-24",
      "validThrough": "2026-06-30",
      "employmentType": "FULL_TIME",
      "hiringOrganization": { "@id": "https://www.gulfestates.ae/en#agent" },
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "The Bayswater by Omniyat - Marasi Dr - Business Bay, 15th Floor - Office 1508",
          "addressLocality": "Business Bay",
          "addressRegion": "Dubai",
          "addressCountry": "AE"
        }
      },
      "experienceRequirements": {
        "@type": "OccupationalExperienceRequirements",
        "monthsOfExperience": 36
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.gulfestates.ae/en/careers#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.gulfestates.ae/en" },
        { "@type": "ListItem", "position": 2, "name": "Careers", "item": "https://www.gulfestates.ae/en/careers" }
      ]
    }
  ]
}`;
}

function getPrivacyPolicyPageSchema(locale: string): string {
  if (locale === "fr") {
    return `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.gulfestates.ae/fr/privacy-policy#webpage",
      "url": "https://www.gulfestates.ae/fr/privacy-policy",
      "name": "Politique de confidentialité | Gulf Estates",
      "description": "Cette politique de confidentialité explique comment Gulf Estates collecte, utilise, protège et gère les informations personnelles conformément aux réglementations applicables.",
      "inLanguage": "fr",
      "isPartOf": {
        "@id": "https://www.gulfestates.ae/fr#website"
      },
      "publisher": {
        "@id": "https://www.gulfestates.ae/fr#agent"
      },
      "mainEntityOfPage": {
        "@type": "Thing",
        "name": "Politique de confidentialité"
      },
      "about": {
        "@type": "Thing",
        "name": "Politique de confidentialité"
      },
      "breadcrumb": {
        "@id": "https://www.gulfestates.ae/fr/privacy-policy#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.gulfestates.ae/fr/privacy-policy#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Accueil",
          "item": "https://www.gulfestates.ae/fr"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Politique de confidentialité",
          "item": "https://www.gulfestates.ae/fr/privacy-policy"
        }
      ]
    },
    {
      "@type": "RealEstateAgent",
      "@id": "https://www.gulfestates.ae/fr#agent",
      "name": "Gulf Estates",
      "legalName": "Gulf Sea Real Estate LLC",
      "url": "https://www.gulfestates.ae/fr",
      "logo": "https://www.gulfestates.ae/en/logo.png",
      "telephone": "+97143521833",
      "email": "info@gulfestates.ae",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "The Bayswater by Omniyat - Marasi Dr - Business Bay, 15th Floor - Office 1508",
        "addressLocality": "Dubai",
        "addressCountry": "AE"
      }
    }
  ]
}`;
  }

  if (locale === "es") {
    return `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.gulfestates.ae/es/privacy-policy#webpage",
      "url": "https://www.gulfestates.ae/es/privacy-policy",
      "name": "Política de privacidad | Gulf Estates",
      "description": "Esta política de privacidad explica cómo Gulf Estates recopila, usa, protege y gestiona la información personal de acuerdo con las regulaciones aplicables.",
      "inLanguage": "es",
      "isPartOf": {
        "@id": "https://www.gulfestates.ae/es#website"
      },
      "publisher": {
        "@id": "https://www.gulfestates.ae/es#agent"
      },
      "mainEntityOfPage": {
        "@type": "Thing",
        "name": "Política de privacidad"
      },
      "about": {
        "@type": "Thing",
        "name": "Política de privacidad"
      },
      "breadcrumb": {
        "@id": "https://www.gulfestates.ae/es/privacy-policy#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.gulfestates.ae/es/privacy-policy#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Inicio",
          "item": "https://www.gulfestates.ae/es"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Política de privacidad",
          "item": "https://www.gulfestates.ae/es/privacy-policy"
        }
      ]
    },
    {
      "@type": "RealEstateAgent",
      "@id": "https://www.gulfestates.ae/es#agent",
      "name": "Gulf Estates",
      "legalName": "Gulf Sea Real Estate LLC",
      "url": "https://www.gulfestates.ae/es",
      "logo": "https://www.gulfestates.ae/en/logo.png",
      "telephone": "+97143521833",
      "email": "info@gulfestates.ae",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "The Bayswater by Omniyat - Marasi Dr - Business Bay, 15th Floor - Office 1508",
        "addressLocality": "Dubai",
        "addressCountry": "AE"
      }
    }
  ]
}`;
  }

  // Default to English (en)
  return `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.gulfestates.ae/en/privacy-policy#webpage",
      "url": "https://www.gulfestates.ae/en/privacy-policy",
      "name": "Privacy Policy | Gulf Estates",
      "description": "This Privacy Policy explains how Gulf Estates collects, uses, protects, and manages personal information in compliance with applicable data protection regulations.",
      "inLanguage": "en",
      "isPartOf": {
        "@id": "https://www.gulfestates.ae/en#website"
      },
      "publisher": {
        "@id": "https://www.gulfestates.ae/en#agent"
      },
      "mainEntityOfPage": {
        "@type": "Thing",
        "name": "Privacy Policy"
      },
      "about": {
        "@type": "Thing",
        "name": "Privacy Policy"
      },
      "breadcrumb": {
        "@id": "https://www.gulfestates.ae/en/privacy-policy#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.gulfestates.ae/en/privacy-policy#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.gulfestates.ae/en"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Privacy Policy",
          "item": "https://www.gulfestates.ae/en/privacy-policy"
        }
      ]
    },
    {
      "@type": "RealEstateAgent",
      "@id": "https://www.gulfestates.ae/en#agent",
      "name": "Gulf Estates",
      "legalName": "Gulf Sea Real Estate LLC",
      "url": "https://www.gulfestates.ae/en",
      "logo": "https://www.gulfestates.ae/en/logo.png",
      "telephone": "+97143521833",
      "email": "info@gulfestates.ae",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "The Bayswater by Omniyat - Marasi Dr - Business Bay, 15th Floor - Office 1508",
        "addressLocality": "Dubai",
        "addressCountry": "AE"
      }
    }
  ]
}`;
}

function getTermsPageSchema(locale: string): string {
  if (locale === "fr") {
    return `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.gulfestates.ae/fr/terms#webpage",
      "url": "https://www.gulfestates.ae/fr/terms",
      "name": "Conditions Générales | Gulf Estates",
      "description": "Ces Conditions Générales régissent l'utilisation du site Web et des services de Gulf Estates, en précisant les responsabilités des utilisateurs, les limites de responsabilité et le droit applicable.",
      "inLanguage": "fr",
      "isPartOf": {
        "@id": "https://www.gulfestates.ae/fr#website"
      },
      "publisher": {
        "@id": "https://www.gulfestates.ae/fr#agent"
      },
      "mainEntityOfPage": {
        "@type": "Thing",
        "name": "Conditions Générales"
      },
      "about": {
        "@type": "Thing",
        "name": "Conditions Générales"
      },
      "breadcrumb": {
        "@id": "https://www.gulfestates.ae/fr/terms#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.gulfestates.ae/fr/terms#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Accueil",
          "item": "https://www.gulfestates.ae/fr"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Conditions Générales",
          "item": "https://www.gulfestates.ae/fr/terms"
        }
      ]
    },
    {
      "@type": "RealEstateAgent",
      "@id": "https://www.gulfestates.ae/fr#agent",
      "name": "Gulf Estates",
      "legalName": "Gulf Sea Real Estate LLC",
      "url": "https://www.gulfestates.ae/fr",
      "logo": "https://www.gulfestates.ae/en/logo.png",
      "telephone": "+97143521833",
      "email": "info@gulfestates.ae",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "The Bayswater by Omniyat - Marasi Dr - Business Bay, 15th Floor - Office 1508",
        "addressLocality": "Dubai",
        "addressCountry": "AE"
      }
    }
  ]
}`;
  }

  if (locale === "es") {
    return `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.gulfestates.ae/es/terms#webpage",
      "url": "https://www.gulfestates.ae/es/terms",
      "name": "Términos y Condiciones | Gulf Estates",
      "description": "Estos Términos y Condiciones rigen el uso del sitio web y los servicios de Gulf Estates, describiendo responsabilidades del usuario, limitaciones de responsabilidad y la ley aplicable.",
      "inLanguage": "es",
      "isPartOf": {
        "@id": "https://www.gulfestates.ae/es#website"
      },
      "publisher": {
        "@id": "https://www.gulfestates.ae/es#agent"
      },
      "mainEntityOfPage": {
        "@type": "Thing",
        "name": "Términos y Condiciones"
      },
      "about": {
        "@type": "Thing",
        "name": "Términos y Condiciones"
      },
      "breadcrumb": {
        "@id": "https://www.gulfestates.ae/es/terms#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.gulfestates.ae/es/terms#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Inicio",
          "item": "https://www.gulfestates.ae/es"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Términos y Condiciones",
          "item": "https://www.gulfestates.ae/es/terms"
        }
      ]
    },
    {
      "@type": "RealEstateAgent",
      "@id": "https://www.gulfestates.ae/es#agent",
      "name": "Gulf Estates",
      "legalName": "Gulf Sea Real Estate LLC",
      "url": "https://www.gulfestates.ae/es",
      "logo": "https://www.gulfestates.ae/en/logo.png",
      "telephone": "+97143521833",
      "email": "info@gulfestates.ae",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "The Bayswater by Omniyat - Marasi Dr - Business Bay, 15th Floor - Office 1508",
        "addressLocality": "Dubai",
        "addressCountry": "AE"
      }
    }
  ]
}`;
  }

  // Default to English (en)
  return `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.gulfestates.ae/en/terms#webpage",
      "url": "https://www.gulfestates.ae/en/terms",
      "name": "Terms and Conditions | Gulf Estates",
      "description": "These Terms and Conditions govern the use of the Gulf Estates website and services, outlining user responsibilities, limitations of liability, and governing law.",
      "inLanguage": "en",
      "isPartOf": {
        "@id": "https://www.gulfestates.ae/en#website"
      },
      "publisher": {
        "@id": "https://www.gulfestates.ae/en#agent"
      },
      "mainEntityOfPage": {
        "@type": "Thing",
        "name": "Terms and Conditions"
      },
      "about": {
        "@type": "Thing",
        "name": "Terms and Conditions"
      },
      "breadcrumb": {
        "@id": "https://www.gulfestates.ae/en/terms#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.gulfestates.ae/en/terms#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.gulfestates.ae/en"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Terms and Conditions",
          "item": "https://www.gulfestates.ae/en/terms"
        }
      ]
    },
    {
      "@type": "RealEstateAgent",
      "@id": "https://www.gulfestates.ae/en#agent",
      "name": "Gulf Estates",
      "legalName": "Gulf Sea Real Estate LLC",
      "url": "https://www.gulfestates.ae/en",
      "logo": "https://www.gulfestates.ae/en/logo.png",
      "telephone": "+97143521833",
      "email": "info@gulfestates.ae",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "The Bayswater by Omniyat - Marasi Dr - Business Bay, 15th Floor - Office 1508",
        "addressLocality": "Dubai",
        "addressCountry": "AE"
      }
    }
  ]
}`;
}

export function getJsonLdSchema(
  pathname: string,
  locale: string = "en",
  data?: any
): string | null {
  const cleanPathname = cleanPath(pathname);

  // Exclude schema for dynamic routes with slugs (properties/[id], off-plan/[id], blogs/[slug])
  // These pages have their own schema defined in their respective page.tsx files
  // Match patterns like /properties/slug, /off-plan-properties-uae/slug, /blogs/slug (but not /properties, /off-plan-properties-uae, /blogs)
  if (
    /^\/properties\/[^\/]+$/.test(cleanPathname) ||
    /^\/off-plan-properties-uae\/[^\/]+$/.test(cleanPathname) ||
    /^\/blogs\/[^\/]+$/.test(cleanPathname)
  ) {
    return null;
  }

  // Route-based schema generation
  switch (cleanPathname) {
    case "/":
      return getHomePageSchema(locale);

    case "/about":
      return getAboutPageSchema(locale);

    case "/contact":
      return getContactPageSchema(locale);

    case "/careers":
      return getCareersPageSchema(locale);

    case "/privacy-policy":
      return getPrivacyPolicyPageSchema(locale);

    case "/terms":
      return getTermsPageSchema(locale);
    // case "/properties":
    //   return getPropertiesPageSchema(locale);
    // case "/properties/[id]":
    //   return getPropertyDetailSchema(locale, data?.property);
    // case "/off-plan":
    //   return getOffPlanPageSchema(locale);
    // case "/off-plan/[id]":
    //   return getOffPlanDetailSchema(locale, data?.offPlan);
    // case "/blogs/[slug]":
    //   return getBlogPostSchema(locale, data?.blog);

    default:
      // Return null if no schema is defined for the route
      return getHomePageSchema("en");
  }
}