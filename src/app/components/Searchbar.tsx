import React, { useState } from "react";

type Props = {
  isActive: boolean;
  onInputChange: () => void;
};

export default function Searchbar({ isActive, onInputChange }: Props) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    if (event.target.value.length > 0) {
      onInputChange(); // Call the callback passed from the parent
    }
  };

  return (
    <input
      type="text"
      placeholder="Type here"
      value={inputValue}
      className={`searchbar ${isActive ? "active" : ""}`}
      onChange={handleInputChange}
    />
  );
}
