import React from "react";

type Props = {
  isLoading: boolean;
};

export default function Loader({ isLoading }: Props) {
  return (
    <div
      className={`flex flex-wrap gap-6 w-auto h-auto justify-center ${
        isLoading ? "" : "hidden"
      }`}
    >
      <span className="loading loading-ring loading-xs"></span>
      <span className="loading loading-ring loading-sm"></span>
      <span className="loading loading-ring loading-md"></span>
      <span className="loading loading-ring loading-lg"></span>
    </div>
  );
}
