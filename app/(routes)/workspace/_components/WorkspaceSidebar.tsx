"use client";
import React from "react";
import { WorkspaceMenu } from "@/services/Options";
import { CirclePlus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import CustomCanvasDialog from "./CustomCanvasDialog";
const WorkspaceSidebar = () => {
  const path = usePathname();
  const router = useRouter();
  return (
    <div className="min-h-[calc(100vh-70px)] shadow-sm p-2 bg-purple-50 pt-5 items-center flex flex-col">
      <CustomCanvasDialog>
        <div className="p-2 items-center flex-col justify-center mb-7 cursor-pointer">
          <CirclePlus className="bg-purple-600 text-white rounded-full size-9" />
          <span className="font-semibold text-sm">Create</span>
        </div>
      </CustomCanvasDialog>
      {WorkspaceMenu.map((menu, idx) => (
        <div
          key={idx}
          className={`flex flex-col items-center mb-4 p-2 cursor-pointer rounded-xl group hover:bg-purple-200 transition-colors duration-300 ${menu.path == path ? "bg-purple-200" : ""}`}
          onClick={() => {router.push(menu.path)}}
        >
          <menu.icon
            className={`h-6 w-6 group-hover:text-purple-800 ${path == menu.path ? "text-purple-800" : ""}`}
          />
          <span
            className={`text-sm font-semibold group-hover:text-purple-800 ${path == menu.path ? "text-purple-800" : ""}`}
          >
            {menu.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default WorkspaceSidebar;
