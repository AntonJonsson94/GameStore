import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Searchbar() {
  const [inputValue, setInputValue] = useState("");
  const [placeholder, setPlaceholder] = useState("Search for a Game");
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
  }, [debouncedInputValue]);

  return (
    <div className="flex flex-col justify-center items-center">
      <input
        type="text"
        placeholder={placeholder}
        className="input input-bordered input-primary input-lg w-full max-w-xs rounded-full mt-1 text-center"
        onChange={handleInputChange}
        value={inputValue}
      />
    </div>
  );
}
