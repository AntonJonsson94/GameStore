import React from "react";

type Params = {
  title: string;
};

export default function SearchResults({ params }: { params: Params }) {
  const { title } = params;

  return <div>{title}</div>;
}
