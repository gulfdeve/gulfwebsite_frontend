import Image from "next/image";

interface CardProps {
  name: string;
  role: string;
  imageUrl: string;
}

const Card: React.FC<CardProps> = ({ name, role, imageUrl }) => {
  return (
    <div className="relative max-w-92 bg-[#F8F8F8] rounded-lg shadow-md overflow-hidden h-full flex flex-col">
      <div className="absolute top-0 right-0 z-0">
        <Image
          src="/images/bg-dots.png"
          alt="Yellow dots pattern"
          width={100}
          height={100}
          className="opacity-50"
        />
      </div>

      <div className="absolute bottom-0 left-0 z-0 rotate-180">
        <Image
          src="/images/bg-dots.png"
          alt="Yellow dots pattern"
          width={100}
          height={100}
          className="opacity-50"
        />
      </div>
      <div className="px-8 pt-6 relative z-10 flex flex-col grow justify-between">
        <div>
          <h3 className="text-2xl font-bold text-primary mb-1">{name}</h3>
          <p className="text-lg text-gray-600">{role}</p>
        </div>

        <div className="mt-6 flex justify-end">
          <Image
            src={imageUrl}
            alt={name}
            width={230}
            height={230}
            className="rounded-lg saturate-0 hover:saturate-100 hover:scale-110 transition-all duration-300 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
