"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";
import CustomCanvasDialog from "./CustomCanvasDialog";

const RecentDesign = () => {
  const [designList, setdesignList] = useState([]);
  return (
    <div className="mt-7">
      <h2 className="text-2xl font-bold">Recent Designs</h2>
      {designList.length === 0 ? (
        <div className="flex items-center justify-center flex-col gap-4 mt-5">
          <Image src={"/edittool.png"} alt="edit" width={100} height={100} />
          <p className="text-center">
            You don't have any design created, create new one!
          </p>
          <CustomCanvasDialog>
            <Button className="w-full max-w-xs cursor-pointer">+ Create New</Button>
          </CustomCanvasDialog>
        </div>
      ) : null}
    </div>
  );
};

export default RecentDesign;
