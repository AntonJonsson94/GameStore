import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Searchbar() {
  const [inputValue, setInputValue] = useState("");
  const [placeholder, setPlaceholder] = useState("Search");
  const router = useRouter();

  const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

    return debouncedValue;
  };

  const debouncedInputValue = useDebounce(inputValue, 650);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
  };

  const handleSearchNavigation = (input: string) => {
    if (input.trim().length === 0) {
      console.warn("Input cannot be empty");
      return;
    }
    const encodedInput = encodeURIComponent(input).replace(/%20/g, "-");
    setPlaceholder(input);
    router.push(`/search/${encodedInput}`);
  };

  useEffect(() => {
    if (debouncedInputValue) {
      handleSearchNavigation(debouncedInputValue);
    }
  });

  return (
    <label className="input input-sm lg:input-lg w-4/5 md:w-11/12 mx-auto  border-none rounded-full bg-primary flex items-center gap-2">
      <input type="text" className="grow placeholder-info text-info" placeholder={placeholder} onChange={handleInputChange} />
      <Image src={"/img/search.svg"} alt="Search icon" className="w-4 h-4 md:w-10 md:h-10" width={30} height={30} />
    </label>
  );
}
