"use client";
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import { canvasSizeOptions } from "@/services/Options";
import { CanvasOptionTypes } from "@/types/types";
import { useMutation } from "convex/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { toast } from "sonner";

const IntroOptions = () => {
  const { userDetail } = useContext(UserDetailContext);
  const createDesignRecord = useMutation(api.designs.CreateNewDesign);
  const router = useRouter();

  /*
   * Used to create new design and Save to the dateabase
   */
  const OnCanvasOptionSelect = async (option: CanvasOptionTypes) => {
    toast("Loading...");
    const result = await createDesignRecord({
      name: option.name,
      width: option.width,
      height: option.height,
      uid: userDetail?._id,
    });
    router.push(`/design/${result}`);
  };
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
            onClick={() => OnCanvasOptionSelect(option)}
          >
            <Image
              src={option.icon}
              alt={option.name}
              width={40}
              height={40}
              className="hover:scale-105 transition-all duration-300"
            />
            <span className="text-xs mt-2 text-center font-medium text-wrap line-clamp-1">
              {option.name}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default IntroOptions;
