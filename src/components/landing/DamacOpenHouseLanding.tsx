import Image from "next/image";

const BITRIX_FORM_URL = "https://gulfestates.bitrix24.site/crm_form_embh7/";

const eventDetails = [
  {
    label: "Date",
    value: "Saturday, 4 July 2026",
  },
  {
    label: "Time",
    value: "10:00 AM – 6:00 PM",
  },
  {
    label: "Location",
    value: "DAMAC Sales Center, DAMAC Hills",
  },
];

const experiences = [
  {
    icon: "🏝️",
    title: "Explore DAMAC Islands",
    description: "Walk through the latest island-inspired residences in person.",
  },
  {
    icon: "👔",
    title: "Meet Our Experts",
    description: "Sit down with senior property consultants for honest guidance.",
  },
  {
    icon: "🔑",
    title: "On-the-Day Deals",
    description: "Access exclusive offers reserved only for invited guests.",
  },
];

const galleryItems = [
  {
    title: "DAMAC Islands",
    subtitle: "Waterfront living, redefined.",
    image:
      "https://res.cloudinary.com/dnidcoojq/image/upload/v1782281143/WhatsApp_Image_2026-06-24_at_10.04.27_wyx7pw.jpg",
    alt: "DAMAC Islands lagoon and waterfront villas in Dubai",
  },
  {
    title: "Signature Interiors",
    subtitle: "Crafted for refined living.",
    image:
      "https://res.cloudinary.com/dnidcoojq/image/upload/v1782281143/WhatsApp_Image_2026-06-24_at_10.04.18_czi6jv.jpg",
    alt: "Luxury villa interior with marble floors and golf course view",
  },
  {
    title: "Championship Golf",
    subtitle: "World-class leisure at your doorstep.",
    image:
      "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=900&q=80",
    alt: "DAMAC Hills championship golf course at golden hour",
  },
];

export default function DamacOpenHouseLanding() {
  return (
    <main className="bg-[#0a1628] text-white">
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col">
        <div className="absolute inset-0">
          <Image
            src="https://res.cloudinary.com/dnidcoojq/image/upload/v1782279477/65918038-0-ADVENTURE-ECO-LIVING.jpg_d8vyh9.jpg"
            alt="Luxury DAMAC Hills villa at dusk"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/70 via-[#0a1628]/50 to-[#0a1628]" />
        </div>

        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-20 text-center">
          <div className="relative mb-6 w-28 sm:w-32 md:w-36 h-auto">
            <Image
              src="/images/logo.png"
              alt="Gulf Estates Logo"
              width={160}
              height={100}
              sizes="(max-width: 640px) 112px, (max-width: 768px) 128px, 144px"
              className="w-full h-auto object-contain"
              priority
            />
          </div>
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/5 px-5 py-2 text-xs font-medium tracking-[0.2em] uppercase text-gold backdrop-blur-sm">
            Gulf Estates · Private Invitation
          </p>

          <h1 className="font-secondary text-5xl leading-tight md:text-7xl lg:text-8xl">
            You Are Invited
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80 md:text-xl">
            An Exclusive Open House at DAMAC Hills
          </p>

          <div className="mt-12 grid w-full max-w-3xl gap-4 sm:grid-cols-3">
            {eventDetails.map((detail) => (
              <div
                key={detail.label}
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-5 backdrop-blur-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gold">
                  {detail.label}
                </p>
                <p className="mt-2 text-sm font-medium text-white/90 md:text-base">
                  {detail.value}
                </p>
              </div>
            ))}
          </div>

          <a
            href="#register"
            className="mt-10 inline-flex rounded-lg bg-gold px-8 py-3.5 text-sm font-semibold text-primary transition hover:bg-gold/90"
          >
            Reserve Your Spot
          </a>
        </div>
      </section>

      {/* About the Event */}
      <section className="bg-white px-4 py-20 text-[#1a1a1a]">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            About the Event
          </p>
          <h2 className="mt-3 font-secondary text-3xl text-primary md:text-4xl lg:text-5xl">
            An afternoon among Dubai&apos;s finest addresses
          </h2>
          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-center">
            <p className="text-base leading-relaxed text-gray-600 md:text-lg">
              Gulf Estates welcomes you to an exclusive Open House experience at
              the DAMAC Sales Center, DAMAC Hills. Explore DAMAC Islands and
              Dubai&apos;s most sought-after luxury communities — in person, with
              our expert consultants by your side. No pressure. Just real
              conversations and real opportunities.
            </p>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="https://res.cloudinary.com/dnidcoojq/image/upload/v1782280739/WhatsApp_Image_2026-06-24_at_09.58.32_lyah4p.jpg"
                alt="Aerial view of DAMAC Hills luxury villas and golf course at twilight, Dubai UAE"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <p className="font-semibold text-white">DAMAC Hills, Dubai</p>
                <p className="text-sm text-white/80">
                  Where signature villas meet a championship golf course.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Experience */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            The Experience
          </p>
          <h2 className="mt-3 font-secondary text-3xl md:text-4xl lg:text-5xl">
            What to Expect
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {experiences.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-8 transition hover:border-gold/30 hover:bg-white/10"
              >
                <span className="text-4xl" aria-hidden="true">{item.icon}</span>
                <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* A Closer Look */}
      <section className="bg-white px-4 py-20 text-[#1a1a1a]">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            A Closer Look
          </p>
          <h2 className="mt-3 font-secondary text-3xl text-primary md:text-4xl lg:text-5xl">
            Inside DAMAC Hills
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {galleryItems.map((item) => (
              <article
                key={item.title}
                className="group overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-primary">{item.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">{item.subtitle}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section id="register" className="px-4 py-20">
        <div className="mx-auto max-w-[800px] text-center">
          <h2 className="font-secondary text-3xl md:text-4xl lg:text-5xl">
            Secure Your Spot
          </h2>
          <p className="mt-4 text-white/70">
            Limited spots available — register now to confirm your place.
          </p>

          <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl">
            <iframe
              src={BITRIX_FORM_URL}
              title="DAMAC Open House Registration"
              className="w-full min-h-[800px] border-0 bg-white"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-4 py-10 text-center">
        <p className="font-secondary text-xl text-gold">Gulf Estates</p>
        <p className="mt-2 text-sm text-white/60">
          DAMAC Sales Center, DAMAC Hills, Dubai
        </p>
        <p className="mt-6 text-xs text-white/40">
          © {new Date().getFullYear()} Gulf Estates. All Rights Reserved.
        </p>
      </footer>
    </main>
  );
}
