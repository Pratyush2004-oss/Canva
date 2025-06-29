import { createContext } from "react";
export const CanvasContext = createContext(
  {} as { canvasEditor: any; setcanvasEditor: Function }
);
