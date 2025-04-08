import { DesignSidebarType } from "@/types/types";
import React from "react";

const SidebarSettings = ({
  selectedOption,
}: {
  selectedOption: DesignSidebarType | undefined;
}) => {
  return (
    selectedOption && (
      <div className="w-[280px] p-5 h-screen border-r">
        <h1 className="font-bold">{selectedOption.name}</h1>
        <p className="text-sm text-gray-500 mt-1">{selectedOption.desc}</p>
      </div>
    )
  );
};

export default SidebarSettings;
