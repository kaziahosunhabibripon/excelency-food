"use client";
import React from "react";

const HighLightMatchText = (name: string, query: string) => {
  if (!query) return name;

  const regex = new RegExp(`(${query})`, "gi");
  const parts = name.split(regex);

  return (
    <>
      {parts.map((part: string, index: number) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <span key={index} className="text-red-500">
            {part}
          </span>
        ) : (
          <React.Fragment key={index}>{part}</React.Fragment>
        )
      )}
    </>
  );
};

export default HighLightMatchText;
