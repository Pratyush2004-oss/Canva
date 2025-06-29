"use client";
import { CanvasContext } from "@/context/CanvasContext";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { useState } from "react";
import CanvasEditor from "../_components/CanvasEditor";
import DesignHeader from "../_components/DesignHeader";
import DesignSidebar from "../_components/DesignSidebar";

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