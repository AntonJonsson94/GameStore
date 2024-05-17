import React, { useState } from "react";

type Props = {
  isActive: boolean;
  onInputChange: (hasInput: boolean) => void;
};

export default function Searchbar({ isActive, onInputChange }: Props) {
  const [inputValue, setInputValue] = useState("");
  const [showLoader, setShowLoader] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    onInputChange(newValue.length > 0);
    setShowLoader(newValue.length > 0);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered input-primary input-lg w-full max-w-xs rounded-full mt-1"
        onChange={handleInputChange}
        value={inputValue}
      />
      {showLoader && (
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
      )}
    </div>
  );
}
