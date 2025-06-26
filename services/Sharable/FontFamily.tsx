import React from "react";
import { FontFamilyList } from "../Options";
import { useCanvasHook } from "@/app/(routes)/design/[designId]/page";

function FontFamily() {
  const { canvasEditor } = useCanvasHook();
  const onFontFamilyChange = (value: string) => {
    // Handle the value change logic here
    const activeObject = canvasEditor?.getActiveObject();
    if (activeObject) {
      activeObject.set({
        fontFamily: value, // Set the font family to the active object
      });
      canvasEditor?.renderAll();
    }
  };

  return (
    <div className="h-[300px] overflow-auto py-2 ">
      {FontFamilyList.map((font, index) => (
        <h2
          key={index}
          onClick={() => onFontFamilyChange(font)}
          className="text-lg p-2 bg-secondary rounded-lg mb-2 cursor-pointer"
          style={{
            fontFamily: font,
          }}
        >
          {font}
        </h2>
      ))}
    </div>
  );
}

export default FontFamily;
