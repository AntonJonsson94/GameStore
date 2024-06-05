"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
type Props = {
  content: string[];
};
export default function Carousel({ content }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === content.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? content.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative">
      <button className="absolute left-0 top-1/2" onClick={handlePrevious}>
        <Image
          priority
          alt=""
          width={40}
          height={40}
          src="/img/arrow_prev.svg"
        />
      </button>
      <button className="absolute right-0 top-1/2" onClick={handleNext}>
        <Image
          priority
          alt="next"
          width={40}
          height={40}
          src="/img/arrow_next.svg"
        />
      </button>

      <Image
        className="mx-auto shadow-inner shadow-red-600"
        priority
        src={content[activeIndex]}
        height={550}
        width={1000}
        alt=""
      />
    </div>
  );
}
