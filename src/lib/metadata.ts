export interface PageMetadata {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  twitterImage?: string;
}

// Global metadata for all pages (without locale prefixes)
export const siteMetadata: Record<string, PageMetadata> = {
  // Home page
  "/": {
    title:
      "Leading Real Estate Company In Dubai | Buy, Sell & Invest with Gulf Estates",
    description:
      "Explore luxury real estate in Dubai with Gulf Estates. Buy, sell, or invest in exclusive villas, apartments, and off-plan projects across Dubai's top communities.",
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    ogImage: "/images/banner-image.webp",
    twitterImage: "/images/banner-image.webp",
  },

  // About page
  "/about": {
    title: "Discover Gulf Estates | Leading Real Estate Company In Dubai",
    description:
      "Discover about Gulf Estates, a luxury real estate company delivering premium buying, selling, and investment experiences under the Centaurus Group legacy.",
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/about`,
    ogImage: "/images/banner-image.webp",
    twitterImage: "/images/banner-image.webp",
  },

  // Services page
  "/services": {
    title: "Real Estate Services in Dubai | Gulf Estates",
    description:
      "Gulf Estates offers trusted real estate services in Dubai, helping clients buy, sell, or invest in luxury properties with confidence and expert guidance.",
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/services`,
    ogImage: "/images/banner-image.webp",
    twitterImage: "/images/banner-image.webp",
  },

  // Contact page
  "/contact": {
    title: "Get in Touch with Gulf Estates | Contact Our Real Estate Experts",
    description:
      "Get professional real estate advice from Gulf Estates Dubai. Our team is ready to assist with buying, renting, or off-plan investments. Visit or message us today.",
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/contact`,
    ogImage: "/images/banner-image.webp",
    twitterImage: "/images/banner-image.webp",
  },

  // Our Team page
  "/our-team": {
    title: "Gulf Estate Team | Trusted Dubai Real Estate Professionals",
    description:
      "Get to know the faces behind Gulf Estate. Our dedicated Dubai property experts bring market knowledge, integrity & results to every client.",
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/our-team`,
    ogImage: "/images/banner-image.webp",
    twitterImage: "/images/banner-image.webp",
  },

  // Buy page
  "/buy": {
    title: "Buy Properties in Dubai | Luxury Apartments & Villas for Sale",
    description:
      "Find properties for sale in Dubai's top communities. Find apartments, villas & townhouses with flexible payment plans and expert support from Gulf Estates.",
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/buy`,
    ogImage: "/images/banner-image.webp",
    twitterImage: "/images/banner-image.webp",
  },

  // Rent page
  "/rent": {
    title:
      "Properties for Rent in Dubai | Luxury Apartments & Villas for Rent",
    description:
      "Find luxury apartments, villas & townhouses for rent in Dubai's top areas. Discover fully furnished homes with flexible terms & expert rental support from Gulf Estates.",
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/rent`,
    ogImage: "/images/banner-image.webp",
    twitterImage: "/images/banner-image.webp",
  },


  // Off-Plans page
  "/off-plan": {
    title:
      "Off Plan Properties in Dubai | Upcoming Projects & Investment Deals",
    description:
      "Explore new off plan projects in Dubai. Find future-ready homes, flexible payment plans & smart property investments with Gulf Estates.",
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/off-plan`,
    ogImage: "/images/banner-image.webp",
    twitterImage: "/images/banner-image.webp",
  },

  // Blogs page
  "/blogs": {
    title: "Dubai Real Estate Blog & Market Insights | Gulf Estates",
    description:
      "Stay ahead with Dubai real estate news, property market updates & expert insights from Gulf Estates. Explore trends, investments & off-plan launches.",
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/blogs`,
    ogImage: "/images/banner-image.webp",
    twitterImage: "/images/banner-image.webp",
  },

  // Careers page
  "/careers": {
    title: "Careers at Gulf Estates | Join Dubai's Leading Real Estate Team",
    description:
      "Build your career with Gulf Estates Dubai. Explore real estate job opportunities, join a dynamic team & grow in Dubai's luxury property market.",
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/careers`,
    ogImage: "/images/banner-image.webp",
    twitterImage: "/images/banner-image.webp",
  },

  // Privacy Policy page
  "/privacy-policy": {
    title: "Privacy Policy | Gulf Estates - Your Data Protection & Privacy",
    description:
      "Read Gulf Estates' privacy policy to understand how we protect your personal data and ensure transparency in our real estate services in Dubai.",
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/privacy-policy`,
    ogImage: "/images/banner-image.webp",
    twitterImage: "/images/banner-image.webp",
  },

  // Terms and Conditions page
  "/terms": {
    title: "Terms and Conditions | Gulf Estates - Legal Terms of Service",
    description:
      "Review Gulf Estates' terms and conditions for using our real estate services in Dubai. Understand your rights and obligations when working with us.",
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/terms`,
    ogImage: "/images/banner-image.webp",
    twitterImage: "/images/banner-image.webp",
  },

  // Properties page
  "/properties": {
    title: "Luxury Properties in Dubai | Buy, Rent & Invest with Gulf Estates",
    description:
      "Browse luxury apartments, villas, and investment properties across Dubai. Explore verified real estate listings with Gulf Estates and find your dream home today.",
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/properties`,
    ogImage: "/images/banner-image.webp",
    twitterImage: "/images/banner-image.webp",
  },

  // Global investment landing page
  "/global-investment": {
    title:
      "Global Property Investment In Dubai, London & New York | Gulf Estates",
    description:
      "Explore high-potential property investment opportunities across Dubai, London, and New York. Submit your enquiry and receive curated options from Gulf Estates.",
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/global-investment`,
    ogImage: "/images/banner-image.webp",
    twitterImage: "/images/banner-image.webp",
  },
};

/**
 * Get metadata for a specific path (removes locale prefix for lookup)
 */
export function getMetadata(pathname: string): PageMetadata {
  // Remove trailing slash
  let cleanPath = pathname?.replace(/\/$/, "") || "/";
  // Remove locale prefix (/en, /fr, /es) if present
  cleanPath = cleanPath?.replace(/^\/(en|fr|es)(\/|$)/, "/");

  // If the result is empty, set to "/"
  if (!cleanPath || cleanPath === "") {
    cleanPath = "/";
  }

  return (
    siteMetadata[cleanPath] || {
      title: "Gulf Estates - Premier Real Estate in Dubai",
      description: "Discover luxury properties in Dubai with Gulf Estates.",
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}${pathname}`,
      ogImage: "/images/banner-image.webp",
      twitterImage: "/images/banner-image.webp",
    }
  );
}
