import { useCanvasHook } from "@/app/(routes)/design/[designId]/page";
import { Slider } from "@/components/ui/slider";
import React from "react";

function Opacity() {
  const { canvasEditor } = useCanvasHook();
  const onOpacityChange = (value: number) => {
    // Handle the value change logic here
    const activeObject = canvasEditor?.getActiveObject();
    if (activeObject) {
      activeObject.set({
        opacity: value, // Convert percentage to actual width
      });
      canvasEditor?.renderAll();
    }
  };
  return (
    <div>
      <h2>Change Opacity</h2>
      <Slider
        className="w-full mt-3"
        defaultValue={[1]}
        max={1}
        min={0}
        step={0.1}
        onValueChange={(v) => onOpacityChange(v[0])}
      />
    </div>
  );
}

export default Opacity;
