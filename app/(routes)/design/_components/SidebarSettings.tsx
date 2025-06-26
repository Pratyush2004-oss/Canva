import { DesignSidebarType } from "@/types/types";
import React from "react";

const SidebarSettings = ({
  selectedOption,
}: {
  selectedOption: DesignSidebarType | undefined;
}) => {
  return (
    selectedOption && (
      <div className="w-[250px] md:w-[280px] p-5 overflow-auto max-h-[calc(100vh-70px)] border-r">
        <h1 className="font-bold">{selectedOption.name}</h1>
        <p className="text-sm text-gray-500 mt-1">{selectedOption.desc}</p>
        <div className="mt-7 ">
          {selectedOption?.component &&
            React.createElement(selectedOption?.component)}
        </div>
      </div>
    )
  );
};

export default SidebarSettings;
