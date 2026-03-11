"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

export interface BlogCardProps {
  title: string;
  slug: string;
  image: string;
  locale: string;
  date: string;
  readTime?: string;
}

const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString; // Return original if invalid date
    }

    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
  } catch (error) {
    return dateString; // Return original if error
  }
};

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  slug,
  image,
  locale,
  date,
  readTime,
}) => {
  const timeToRead = readTime || "5 min to read";
  const formattedDate = formatDate(date);

  return (
    <Link
      href={`/${locale}/blogs/${slug}`}
      className="flex flex-col h-full w-full border border-gray-400 rounded-sm"
    >
      <div className="p-2 h-[220px] w-full overflow-hidden rounded-2xl rounded-b-none shrink-0">
        <Image
          src={image}
          alt={title}
          width={600}
          height={400}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="pb-4 flex flex-col flex-1 p-3 gap-3 min-h-[100px]">
        <div className="flex items-center justify-between text-xs text-gray-500 shrink-0">
          <span className="font-medium">{timeToRead}</span>
          <span className="text-[11px]">
            {formattedDate}
          </span>
        </div>
        <p className="line-clamp-2 text-base leading-6 text-gray-900 flex-1">{title}</p>
      </div>
    </Link>
  );
};

export default BlogCard;
