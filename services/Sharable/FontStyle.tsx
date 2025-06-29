import { useCanvasHook } from "@/app/(routes)/design/_components/useCanvasHook";
import { Toggle } from "@/components/ui/toggle";
import { Bold, Italic, Underline } from "lucide-react";
import React from "react";

function FontStyle() {
  const { canvasEditor } = useCanvasHook();
  const activeObject = canvasEditor?.getActiveObject();
  const onSetFontStyle = (style: string) => {
    if (activeObject) {
      if (style == "bold") {
        activeObject.set(
          "fontWeight",
          activeObject.fontWeight === "bold" ? "normal" : "bold"
        );
      }
      if (style == "italic") {
        activeObject.set(
          "fontStyle",
          activeObject.fontStyle === "italic" ? "normal" : "italic"
        );
      }
      if (style == "underline") {
        activeObject.set("underline", !activeObject.underline);
      }
    }
    canvasEditor.add(activeObject);
  };
  return (
    <div className="flex">
      <Toggle
        defaultPressed={activeObject?.fontWeight === "bold"}
        onClick={() => onSetFontStyle("bold")}
        aria-label="Toggle bold"
      >
        <Bold className="size-5" />
      </Toggle>
      <Toggle
        defaultPressed={activeObject?.fontStyle === "italic"}
        onClick={() => onSetFontStyle("italic")}
        aria-label="Toggle italic"
      >
        <Italic className="size-5" />
      </Toggle>
      <Toggle
        defaultPressed={activeObject?.underline}
        onClick={() => onSetFontStyle("underline")}
        aria-label="Toggle underline"
      >
        <Underline className="size-5" />
      </Toggle>
    </div>
  );
}

export default FontStyle;
