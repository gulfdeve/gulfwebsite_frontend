export interface PageContentData {
  _id: string;
  pageType: string;
  title: string;
  subtitle?: string;
  bannerType: "image" | "video";
  bannerUrl: string;
  createdAt: string;
  updatedAt: string;
}

interface PageContentResponse {
  success: boolean;
  data?: PageContentData;
  message?: string;
}

export async function fetchPageContentByType(
  pageType: string,
  locale: string = "en"
): Promise<PageContentData | null> {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    if (!API_URL) {
      console.error("NEXT_PUBLIC_API_URL is not defined");
      return null;
    }

    // Validate locale
    const validLocales = ["en", "fr", "es"];
    const finalLocale = validLocales.includes(locale) ? locale : "en";

    const response = await fetch(
      `${API_URL}/api/pages/content/type/${pageType}?locale=${finalLocale}`,
      { next: { revalidate: 60 } }
    );

    if (!response.ok) {
      console.error(`Failed to fetch page content for ${pageType}:`, response.status);
      return null;
    }

    const data: PageContentResponse = await response.json();

    if (data.success && data.data) {
      return data.data;
    }

    return null;
  } catch (error) {
    console.error(`Error fetching page content for ${pageType}:`, error);
    return null;
  }
}
