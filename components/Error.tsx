import React from "react";

const Error = ({ title, message }: { title?: string; message?: string }) => {
  return (
    <div className="flex h-full w-full flex-1 flex-col items-center justify-center text-center">
      <h1 className="text-5xl font-extrabold leading-10 tracking-tight">{title || "404"}</h1>
      <h2 className="mt-4 text-center text-2xl font-light leading-tight sm:mt-5">
        {message || "Couldn't find what you're looking for."}
      </h2>
    </div>
  );
};

export default Error;
