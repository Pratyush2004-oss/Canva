"use client";
import { Doc } from "@/convex/_generated/dataModel";
import TopNavBar from "@/services/Components/TopNavBar";
import { Canvas } from "fabric";
import { useEffect, useRef, useState } from "react";
import { useCanvasHook } from "../[designId]/page";

const CanvasEditor = ({ DesignInfo }: { DesignInfo: Doc<"designs"> }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvas, setcanvas] = useState<Canvas | null>(null);
  const { canvasEditor, setcanvasEditor } = useCanvasHook();

  useEffect(() => {
    if (canvasRef.current && DesignInfo) {
      const initCanvas = new Canvas(canvasRef.current, {
        width: DesignInfo?.width / 1.5,
        height: DesignInfo?.height / 1.5,
        backgroundColor: "#fff",
        preserveObjectStacking: true,
      });
      //   set high resolution canvas
      const scaleFactor = window.devicePixelRatio || 1;
      initCanvas.set({
        width: DesignInfo?.width * scaleFactor,
        height: DesignInfo?.height * scaleFactor,
        zoom: 1 / scaleFactor,
      });
      if (DesignInfo?.jsonTemplate) {
        initCanvas.loadFromJSON(DesignInfo?.jsonTemplate, () => {
          initCanvas?.requestRenderAll();
        });
      }
      initCanvas.renderAll();
      setcanvas(initCanvas);
      setcanvasEditor(initCanvas);

      return () => {
        initCanvas.dispose();
      };
    }
  }, [DesignInfo, canvasRef, setcanvasEditor]);

  // Used to delete the selected element/Oject
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Delete") {
        if (canvasEditor) {
          const activeObject = canvasEditor.getActiveObject();
          if (activeObject) {
            canvasEditor.remove(activeObject);
            canvasEditor.renderAll();
          }
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [canvasEditor]);
  return (
    DesignInfo && (
      <div className="bg-secondary h-[calc(100vh-70px)] w-full overflow-auto">
        <TopNavBar />
        <div className="mt-10 flex items-center flex-col justify-center my-auto">
          <canvas id="canvas" ref={canvasRef} />
        </div>
      </div>
    )
  );
};

export default CanvasEditor;
