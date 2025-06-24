import { useCanvasHook } from "@/app/(routes)/design/[designId]/page";
import { Slider } from "@/components/ui/slider";
import React from "react";

function BorderWidth() {
  const { canvasEditor } = useCanvasHook();
  const onWidthChange = (value: number) => {
    // Handle the value change logic here
    const activeObject = canvasEditor?.getActiveObject();
    if (activeObject) {
      activeObject.set({
        strokeWidth: value * 0.4, // Convert percentage to actual width
      });
      canvasEditor?.renderAll();
    }
  };
  return (
    <div>
      <h2>Border Width</h2>
      <Slider
        className="w-full mt-3"
        defaultValue={[33]}
        max={100}
        min={0}
        step={1}
        onValueChange={(v) => onWidthChange(v[0])}
      />
    </div>
  );
}

export default BorderWidth;
