import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/login",
          "/dashboard/",
          "/search?",
          "/en/search?",
          "/ar/search?",
          "/advanced-search/",
          "?type=green",
          "/?trk=public_post_main-feed-card-text",
          "/%26/",
          "/ge-",
          "/op-xz",
        ],
      },
    ],
    sitemap: "https://www.gulfestates.ae/sitemap-index.xml",
  };
}
