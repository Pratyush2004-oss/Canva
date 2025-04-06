import { canvasSizeOptions } from "@/services/Options";
import Image from "next/image";
import React from "react";

const IntroOptions = () => {
  return (
    <>
      <div className="relative">
        <Image
          src={"/banner-home.png"}
          alt="banner"
          width={1000}
          height={"300"}
          className="w-full h-[200px] rounded-2xl object-cover"
        />
        <h2 className="text-3xl absolute bottom-5 left-10 text-white font-bold text-shadow">
          Workspace
        </h2>
      </div>
      <div className="flex flex-wrap items-center gap-5 mt-10 justify-center">
        {canvasSizeOptions.map((option, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-end cursor-pointer"
          >
            <Image
              src={option.icon}
              alt={option.name}
              width={40}
              height={40}
              className="w-[40px] h-[40px]"
            />
            <span className="text-sm mt-2 text-center">{option.name}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default IntroOptions;
