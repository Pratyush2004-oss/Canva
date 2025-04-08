"use client";
import { Doc } from "@/convex/_generated/dataModel";
import { Canvas } from "fabric";
import React, { useEffect, useRef, useState } from "react";

const CanvasEditor = ({ DesignInfo }: { DesignInfo: Doc<"designs"> }) => {
  const canvasRef = useRef(null);
  const [canvas, setcanvas] = useState<Canvas | null>(null);

  useEffect(() => {
    if (canvasRef.current && DesignInfo) {
      const initCanvas = new Canvas(canvasRef.current, {
        width: DesignInfo?.width / 1.5,
        height: DesignInfo?.height / 1.5,
        backgroundColor: "#fff",
      });
      //   set high resolution canvas
      const scaleFactor = window.devicePixelRatio || 1;
      initCanvas.set({
        width: DesignInfo?.width * scaleFactor,
        height: DesignInfo?.height * scaleFactor,
        zoom: 1 / scaleFactor,
      });
      initCanvas.renderAll();
      setcanvas(initCanvas);

      return () => {
        initCanvas.dispose();
      };
    }
  }, [DesignInfo]);
  return (
    DesignInfo && (
      <div className="bg-secondary h-screen w-full flex items-center flex-col justify-center my-auto">
        <canvas id="canvas" ref={canvasRef} />
      </div>
    )
  );
};

export default CanvasEditor;
