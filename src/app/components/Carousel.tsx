"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
type Props = {
  content: string[];
  onNext?: () => void;
  onPrev?: () => void;
};
export default function Carousel({ content, onNext, onPrev }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === content.length - 1 ? 0 : prevIndex + 1
    );
    onNext && onNext();
  };

  const handlePrevious = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? content.length - 1 : prevIndex - 1
    );
    onPrev && onPrev();
  };

  return (
    <div className="relative mx-auto">
      <button className="absolute -left-6 top-1/2" onClick={handlePrevious}>
        <Image
          priority
          alt=""
          width={40}
          height={40}
          src="/img/arrow_prev.svg"
        />
      </button>
      <button className="absolute -right-6  top-1/2" onClick={handleNext}>
        <Image
          priority
          alt="next"
          width={40}
          height={40}
          src="/img/arrow_next.svg"
        />
      </button>

      <Image
        className="w-[1000px] h-[600px]"
        priority
        src={content[activeIndex]}
        height={600}
        width={1000}
        alt=""
      />
    </div>
  );
}
