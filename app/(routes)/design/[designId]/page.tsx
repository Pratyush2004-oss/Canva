"use client";
import { useParams } from "next/navigation";
import React from "react";
import DesignHeader from "../_components/DesignHeader";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import DesignSidebar from "../_components/DesignSidebar";
import CanvasEditor from "../_components/CanvasEditor";

const DesignPage = () => {
  const { designId } = useParams();
  const DesignInfo = designId
    ? useQuery(api.designs.GetDesign, {
        id: designId as Id<"designs">
      })
    : null;
  return DesignInfo && (
    <div className="">
      <DesignHeader DesignInfo={DesignInfo} />
      <div className="flex">
        <DesignSidebar />
        <CanvasEditor DesignInfo={DesignInfo} />
      </div>
    </div>
  );
};

export default DesignPage;
