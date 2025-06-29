import { useCanvasHook } from "@/app/(routes)/design/_components/useCanvasHook";
import { Slider } from "@/components/ui/slider";
import React from "react";

function BorderRadius() {
  const { canvasEditor } = useCanvasHook();
  const OnBorderRadiusChange = (value: number) => {
    // Handle the value change logic here
    const activeObject = canvasEditor?.getActiveObject();
    if (activeObject) {
      activeObject.set({
        rx: value, // Set the horizontal radius
        ry: value, // Set the vertical radius
      });
      canvasEditor?.renderAll();
    }
  };
  return (
    <div>
      <h2>Border Radius</h2>
      <Slider
        className="w-full mt-3"
        defaultValue={[0]}
        max={50}
        min={0}
        step={2}
        onValueChange={(v) => OnBorderRadiusChange(v[0])}
      />
    </div>
  );
}

export default BorderRadius;
