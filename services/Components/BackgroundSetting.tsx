import React, { useState } from "react";
import ColorPicker from "../Sharable/ColorPicker";
import { useCanvasHook } from "@/app/(routes)/design/_components/useCanvasHook";

function BackgroundSetting() {
  const [bgColor, setbgColor] = useState<string>("fff");
  const { canvasEditor } = useCanvasHook();

  // use to change the canvas
  const onColorChange = (color: string) => {
    setbgColor(color);
    canvasEditor?.set({
      backgroundColor: color,
      backgroungImage: null,
    });
    canvasEditor.renderAll();
  };
  return (
    <div>
      <ColorPicker value={bgColor} onColorChange={onColorChange} />
    </div>
  );
}

export default BackgroundSetting;
