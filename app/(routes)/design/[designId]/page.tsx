"use client";
import { useParams } from "next/navigation";
import React, { useContext, useState } from "react";
import DesignHeader from "../_components/DesignHeader";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import DesignSidebar from "../_components/DesignSidebar";
import CanvasEditor from "../_components/CanvasEditor";
import { CanvasContext } from "@/context/CanvasContext";

const DesignPage = () => {
  const { designId } = useParams();
  const [canvasEditor, setcanvasEditor] = useState();
  const DesignInfo = designId
    ? useQuery(api.designs.GetDesign, {
        id: designId as Id<"designs">,
      })
    : null;
  return (
    DesignInfo && (
      <div className="">
        <CanvasContext.Provider value={{ canvasEditor, setcanvasEditor }}>
          <DesignHeader DesignInfo={DesignInfo} />
          <div className="flex">
            <DesignSidebar />
            <CanvasEditor DesignInfo={DesignInfo} />
          </div>
        </CanvasContext.Provider>
      </div>
    )
  );
};

export default DesignPage;

export const useCanvasHook = () => {
  const context = useContext(CanvasContext);
  if (!context) throw new Error("Error in canvas context");
  return context;
};
