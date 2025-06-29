import { CanvasContext } from "@/context/CanvasContext";
import { useContext } from "react";

export const useCanvasHook = () => {
  const context = useContext(CanvasContext);
  if (!context) throw new Error("Error in canvas context");
  return context;
};
