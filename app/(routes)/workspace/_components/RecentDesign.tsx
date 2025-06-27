"use client";
import { Button } from "@/components/ui/button";
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import CustomCanvasDialog from "./CustomCanvasDialog";
import { Doc, Id } from "@/convex/_generated/dataModel";
import DesignList from "./DesignList";

const RecentDesign = () => {
  const [designList, setdesignList] = useState<Doc<"designs">[] | []>([]);
  // Simulating fetching design list

  const { userDetail } = useContext(UserDetailContext);

  const convex = useConvex();
  const GetDesignsByUser = async () => {
    const designs = await convex.query(api.designs.GetDesignsByUser, {
      id: userDetail?._id as Id<"users">,
    });
    console.log(designs);
    setdesignList(designs);
  };

  useEffect(() => {
    if (userDetail?._id) {
      GetDesignsByUser();
    }
  }, [userDetail]);

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
            <Button className="w-full max-w-xs cursor-pointer">
              + Create New
            </Button>
          </CustomCanvasDialog>
        </div>
      ) : (
        <DesignList designList={designList} />
      )}
    </div>
  );
};

export default RecentDesign;
