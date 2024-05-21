import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SearchPage from "../search/page";

type Props = {
  isActive: boolean;
  onInputChange: (hasInput: boolean) => void;
  onNavigate?: (input: string) => void;
};

export default function Searchbar({
  isActive,
  onInputChange,
  onNavigate,
}: Props) {
  const [inputValue, setInputValue] = useState("");
  const [showLoader, setShowLoader] = useState(false);
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

  const debouncedInputValue = useDebounce(inputValue, 1000);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    onInputChange(newValue.length > 0);
    setShowLoader(newValue.length > 0);
  };

  const handleSearchNavigation = (input: string) => {
    const encodedInput = encodeURIComponent(input).replace(/%20/g, "-");
    const decodedInput = decodeURIComponent(encodedInput);
    if (input.trim().length === 0) {
      console.warn("Input cannot be empty");
      return;
    }
    router.push(`/search/${decodedInput}`);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <input
        type="text"
        placeholder="Search for a Game"
        className="input input-bordered input-primary input-lg w-full max-w-xs rounded-full mt-1 text-center"
        onChange={handleInputChange}
        value={inputValue}
      />
      {showLoader && (
        <>
          <div className="flex flex-col justify-center items-center mt-2">
            <p>Searching for games...</p>
            <div className="flex justify-center">
              <div className="flex flex-wrap gap-6 w-auto h-auto justify-center">
                <span className="loading loading-ring loading-xs"></span>
                <span className="loading loading-ring loading-sm"></span>
                <span className="loading loading-ring loading-md"></span>
                <span className="loading loading-ring loading-lg"></span>
              </div>
            </div>
          </div>
          <SearchPage
            input={debouncedInputValue}
            onNavigate={handleSearchNavigation}
          />
        </>
      )}
    </div>
  );
}
