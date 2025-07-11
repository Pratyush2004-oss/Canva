import React from "react";
import RecentDesign from "../_components/RecentDesign";
import Image from "next/image";

function Projects() {
  return (
    <div className="w-full p-10">
      <div className="relative">
        <Image
          src={"/banner-home.png"}
          alt="banner"
          width={1000}
          height={"300"}
          className="w-full h-[200px] rounded-2xl object-cover"
        />
        <h2 className="text-3xl absolute bottom-5 left-10 text-white font-bold text-shadow">
          Projects
        </h2>
      </div>
      <RecentDesign />
    </div>
  );
}

export default Projects;
