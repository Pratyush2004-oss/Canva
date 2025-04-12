import { createContext } from "react";
import { Canvas } from "fabric";
export const CanvasContext = createContext(
  {} as { canvasEditor: any; setcanvasEditor: Function }
);
