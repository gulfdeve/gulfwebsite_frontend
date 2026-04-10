import Image from "next/image";
import Link from "next/link";
import InvestmentEnquiryForm from "@/components/landing/InvestmentEnquiryForm";

interface GlobalInvestmentLandingProps {
  locale: string;
}

const investmentRegions = [
  {
    city: "Dubai",
    highlight: "High-growth freehold communities",
    description:
      "Capture rental yields and capital appreciation through off-plan and ready assets in prime Dubai districts.",
    cta: "Explore Dubai opportunities",
    path: "/properties",
  },
  {
    city: "London",
    highlight: "Blue-chip global asset class",
    description:
      "Diversify into resilient prime zones with strong liquidity, long-term tenancy demand, and global buyer confidence.",
    cta: "Discover London assets",
    path: "/buy",
  },
  {
    city: "New York",
    highlight: "Prestige inventory with global demand",
    description:
      "Access strategic city-core opportunities designed for long-term wealth positioning and portfolio stability.",
    cta: "View New York opportunities",
    path: "/off-plan",
  },
];

const trustIndicators = [
  { title: "Data-backed shortlisting", text: "Opportunities screened for demand, ROI potential, and exit flexibility." },
  { title: "Advisory-first process", text: "Dedicated consultants align recommendations with your investment profile." },
  { title: "End-to-end guidance", text: "From discovery to paperwork, we support each stage of your decision." },
  { title: "Fast response SLA", text: "Most investor enquiries receive a curated response in under 24 hours." },
];

const howItWorks = [
  { step: "1", title: "Share goals", text: "Tell us your budget, preferred market, and risk profile." },
  { step: "2", title: "Review shortlist", text: "Receive options with market context and projected performance." },
  { step: "3", title: "Reserve and proceed", text: "Secure your selection with support through completion." },
];

const featuredListings = [
  {
    title: "Waterfront Signature Residences",
    market: "Dubai",
    price: "From 2,450,000 AED",
    image: "/images/sobha.avif",
  },
  {
    title: "Prime City Collection",
    market: "London",
    price: "From 1,100,000 GBP",
    image: "/images/sobha.avif",
  },
  {
    title: "Skyline Investment Towers",
    market: "New York",
    price: "From 1,850,000 USD",
    image: "/images/sobha.avif",
  },
];

export default function GlobalInvestmentLanding({ locale }: GlobalInvestmentLandingProps) {
  return (
    <main className="bg-white pb-16">
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-primary to-[#0a4f96] text-white">
        <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="relative mx-auto w-full max-w-[1500px] px-4 py-14 sm:px-6 lg:px-8 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <p className="inline-flex rounded-full border border-white/30 px-4 py-1 text-xs font-medium tracking-[0.14em] uppercase">
                Global Real Estate Investments
              </p>
              <h1 className="mt-6 max-w-3xl font-secondary text-4xl leading-tight md:text-6xl">
                Build A Smarter Property Portfolio Across Dubai, London, And New York
              </h1>
              <p className="mt-5 max-w-2xl text-base text-white/90 md:text-lg">
                Secure high-potential opportunities with a conversion-focused advisory journey designed for international investors.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#investment-enquiry-form"
                  className="rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-primary transition hover:bg-gold/90"
                >
                  Request Investment Consultation
                </a>
                <Link
                  href={`/${locale}/contact`}
                  className="rounded-lg border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Speak To Advisor
                </Link>
              </div>
            </div>

            <InvestmentEnquiryForm locale={locale} />
          </div>
        </div>
      </section>

      <section className="mx-auto mt-14 w-full max-w-[1500px] px-4 sm:px-6 lg:px-8 md:mt-20">
        <div className="mb-8 text-center">
          <h2 className="font-secondary text-3xl text-primary md:text-4xl">Investment Regions</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-600 md:text-base">
            Choose markets aligned with your return expectations, timeline, and preferred asset profile.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {investmentRegions.map((region) => (
            <article
              key={region.city}
              className="group relative overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/10" />
              <div className="relative p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary/70">{region.city}</p>
                <h3 className="mt-2 text-xl font-semibold text-primary">{region.highlight}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{region.description}</p>
                <Link
                  href={`/${locale}${region.path}`}
                  className="mt-4 inline-flex text-sm font-semibold text-primary underline decoration-gold decoration-2 underline-offset-4"
                >
                  {region.cta}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-14 w-full max-w-[1500px] px-4 sm:px-6 lg:px-8 md:mt-20">
        <div className="rounded-2xl border border-primary/10 bg-[#f8fbff] p-6 md:p-8">
          <h2 className="font-secondary text-3xl text-primary md:text-4xl">Why Investors Trust Gulf Estates</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {trustIndicators.map((indicator) => (
              <div key={indicator.title} className="rounded-xl bg-white p-4 shadow-sm">
                <h3 className="text-base font-semibold text-primary">{indicator.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{indicator.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-14 w-full max-w-[1500px] px-4 sm:px-6 lg:px-8 md:mt-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-secondary text-3xl text-primary md:text-4xl">Featured Listings</h2>
            <p className="mt-2 max-w-2xl text-sm text-gray-600 md:text-base">
              Optional showcase of opportunities frequently requested by global investors.
            </p>
          </div>
          <Link href={`/${locale}/properties`} className="text-sm font-semibold text-primary underline underline-offset-4">
            View all listings
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredListings.map((listing) => (
            <article key={listing.title} className="overflow-hidden rounded-2xl border border-primary/10 bg-white">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={listing.image}
                  alt={listing.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary/70">{listing.market}</p>
                <h3 className="mt-2 text-lg font-semibold text-primary">{listing.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{listing.price}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-14 w-full max-w-[1500px] px-4 sm:px-6 lg:px-8 md:mt-20">
        <div className="rounded-2xl bg-primary px-6 py-8 text-white md:px-8 md:py-10">
          <h2 className="font-secondary text-3xl md:text-4xl">How It Works</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {howItWorks.map((item) => (
              <div key={item.step} className="rounded-xl border border-white/20 bg-white/10 p-4">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gold text-sm font-bold text-primary">
                  {item.step}
                </span>
                <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-white/90">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#investment-enquiry-form"
              className="rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-primary transition hover:bg-gold/90"
            >
              Start Your Enquiry
            </a>
            <Link
              href={`/${locale}/privacy-policy`}
              className="rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Privacy & Consent
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
