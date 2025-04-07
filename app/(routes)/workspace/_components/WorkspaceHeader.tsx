import { UserButton } from "@stackframe/stack";
import Image from "next/image";
import React from "react";

const WorkspaceHeader = () => {
  return (
    <div className="p-2 px-5 flex items-center justify-between shadow-sm sticky top-0 z-20 bg-white">
      <Image
        src={"/logo.png"}
        alt="logo"
        width={100}
        height={100}
        className="h-[50px] w-[150px]"
      />
      <UserButton/>
    </div>
  );
};

export default WorkspaceHeader;