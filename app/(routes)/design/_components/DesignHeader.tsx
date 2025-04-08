import { Input } from "@/components/ui/input";
import { Doc } from "@/convex/_generated/dataModel";
import { UserButton } from "@stackframe/stack";
import Image from "next/image";
import React from "react";

const DesignHeader = ({ DesignInfo }: { DesignInfo: Doc<"designs"> }) => {
  return (
    DesignInfo && (
      <div className="p-3 flex items-center justify-between px-5 gap-10 bg-gradient-to-r from-sky-500 via-blue-400 to-purple-600">
        <Image src={"/logo-white.png"} alt="" width={100} height={60} />
        <Input
          defaultValue={DesignInfo?.name}
          placeholder="Design Name"
          className="text-white font-medium border-none placeholder:text-white placeholder:font-normal"
        />
        <UserButton />
      </div>
    )
  );
};

export default DesignHeader;
