import React from "react";
import Image from "next/image";
import Link from "next/link";

function page() {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative">
        <Image
          src="/images/serviceHero.webp"
          alt="Service Hero"
          width={600}
          height={400}
          className="object-cover w-full h-screen brightness-75"
        />

        <div className="absolute w-full mt-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col text-white justify-between items-center">
          <h1 className="text-2xl md:text-5xl mb-4 font-extrabold">
            Heading for Service Page 1
          </h1>
          <p className="text-2xl md:text-5xl mb-4 font-extrabold">
            Heading for Service Page 2
          </p>
          <p className="text-sm md:text-base fw4 mb-6">Service Page text</p>
        </div>
      </div>
      {/* Cards Section */}
      <div className="pb-6 overflow-hidden bg-white text-black py-16">
        {/* Section Heading */}
        <h2 className="text-[#024959] font-bebas text-3xl pt-12 lg:pt-0 lg:text-5xl mb-2 text-center">
          Services.section.Herotext
        </h2>
        <div className="flex flex-col lg:flex-row gap-12 justify-center items-center py-6 px-2 flex-wrap">
          <div className="max-w-sm rounded overflow-hidden shadow-lg pb-3 transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2 group flex flex-col h-[450px]">
            <div className="overflow-hidden">
              <Image
                src="/images/find-home/green.png"
                alt="House"
                width={400}
                height={300}
                className="w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
            </div>
            <div className="px-6 py-4 flex flex-col justify-between flex-grow">
              <div className="text-2xl m-2 text-center font-semibold text-[#024959] transition-colors duration-300 ease-in-out group-hover:text-[#036c82]">
                BUY A NEW PROPERTY
              </div>
              <p className="text-gray-700 text-center transition-colors duration-300 ease-in-out group-hover:text-gray-900">
                With an extensive selection of properties in Dubai&apos;s real
                estate market, Gulf Estates is dedicated to helping you discover
                the perfect opportunity for a smart investment.
              </p>
            </div>
            <div className="px-6 py-4 flex justify-center">
              <Link
                href="tel:+971502505835"
                className="text-[#024959] hover:underline"
              >
                <button className="bg-orange-500 hover:bg-orange-600 cursor-pointer text-white font-bold py-2 px-4 rounded transition-all duration-300 ease-in-out hover:shadow-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50">
                  Find Property
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Contact Section */}
      <div className="relative flex flex-col items-center justify-center w-full min-h-[80vh] lg:min-h-screen px-4 py-10 lg:py-16 overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/serviceSection.webp"
          alt="Services background"
          fill
          priority
          quality={90}
          className="object-cover object-center -z-10"
        />

        <div className="relative text-center max-w-7xl w-full">
          <h2 className="uppercase text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white">
            Services.Owner.heading
          </h2>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white mt-4 px-2 sm:px-6 md:px-12">
            Services.Owner.text
          </p>

          <div className="mt-6">
            <Link href="/contact">
              <button className="bg-orange-500 text-white cursor-pointer hover:text-black px-6 py-2 lg:px-8 lg:py-3 hover:bg-white duration-200 font-bold rounded-md transition-all ease-in-out">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
