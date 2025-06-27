import React from "react";
import RecentDesign from "../_components/RecentDesign";
import Image from "next/image";

function Projects() {
  return (
    <div className="w-full p-10">
      <div className="relative">
        <Image
          src="/banner-home.png"
          alt="Projects"
          width={200}
          height={200}
          className="w-full h-[200px] bg-secondary object-cover rounded-xl"
        />
        <h2 className="absolute bottom-5 left-20 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-bold">Projects</h2>
      </div>
      <RecentDesign />
    </div>
  );
}

export default Projects;
