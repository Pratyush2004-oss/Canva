import { sideBarMenu } from "@/services/Options";
import React, { useState } from "react";
import SidebarSettings from "./SidebarSettings";
import { DesignSidebarType } from "@/types/types";

const DesignSidebar = () => {
  const [selectedOption, setselectedOption] = useState<DesignSidebarType>();
  const selectMenu = ({ menu }: { menu: DesignSidebarType }) => {
    if (selectedOption?.name == menu.name) {
      setselectedOption(undefined);
    } else {
      setselectedOption(menu);
    }
  };
  return (
    <div className="flex">
      <div className="p-2 w-[100px] border-r shadow-sm h-screen pt-2">
        {sideBarMenu.map((menu, idx) => (
          <div
            key={idx}
            className={`p-2 mb-3 flex flex-col items-center hover:bg-secondary cursor-pointer rounded-lg ${
              selectedOption?.name === menu.name && "bg-secondary"
            }`}
            onClick={() => selectMenu({ menu })}
          >
            <menu.icon />
            <h2 className="text-sm mt-1">{menu.name}</h2>
          </div>
        ))}
      </div>
      <SidebarSettings selectedOption={selectedOption} />
    </div>
  );
};

export default DesignSidebar;
