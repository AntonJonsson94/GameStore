"use client";

import Image from "next/image";
import { useState } from "react";
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
    <div>
      <Image priority src={content[activeIndex]} height={450} width={1000} alt="" />
      <button onClick={handlePrevious}>Previous</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
}
