"use client";
import { Doc } from "@/convex/_generated/dataModel";
import TopNavBar from "@/services/Components/TopNavBar";
import { Canvas } from "fabric";
import { useEffect, useRef, useState } from "react";
import { useCanvasHook } from "../_components/useCanvasHook";

const CanvasEditor = ({ DesignInfo }: { DesignInfo: Doc<"designs"> }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const { setcanvasEditor } = useCanvasHook();
  

  useEffect(() => {
    if (!canvasRef.current || !DesignInfo) return;

    const initCanvas = new Canvas(canvasRef.current, {
      width: DesignInfo.width,
      height: DesignInfo.height,
      backgroundColor: "#fff",
      preserveObjectStacking: true,
      enableRetinaScaling: true, // Let Fabric handle high DPI
    });

    // Handle JSON loading
    const loadDesign = async () => {
      if (DesignInfo?.jsonTemplate) {
        initCanvas.loadFromJSON(DesignInfo.jsonTemplate, () => {
            initCanvas.requestRenderAll();
        });
      }
    };

    loadDesign();
    initCanvas.renderAll();
    setCanvas(initCanvas);
    setcanvasEditor(initCanvas);

    // Cleanup function
    return () => {
      initCanvas.dispose();
      setCanvas(null);
      setcanvasEditor(null); // Clear context reference
    };
  }, [DesignInfo, setcanvasEditor]);

  // Keyboard handler with safety checks
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Delete" || !canvas) return;
      
      try {
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
          canvas.remove(activeObject);
          canvas.renderAll();
        }
      } catch (error) {
        console.error("Canvas operation error:", error);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [canvas]); // Only depend on local canvas state

  return (
    <div className="bg-secondary h-[calc(100vh-70px)] w-full overflow-auto">
      <TopNavBar />
      <div className="mt-10 flex items-center flex-col justify-center my-auto max-h-[calc(100vh-70px)] w-full overflow-auto">
        <canvas 
          id="canvas" 
          ref={canvasRef}
          width={DesignInfo?.width || 800}
          height={DesignInfo?.height || 600}
        />
      </div>
    </div>
  );
};

export default CanvasEditor;