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
      prevIndex === 2 ? prevIndex : prevIndex + 1
    );
  };

  const handlePrevipus = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? prevIndex : prevIndex - 1
    );
  };

  return (
    <div>
      <Image src={content[activeIndex]} height={500} width={1000} alt="" />
    </div>
  );
}
