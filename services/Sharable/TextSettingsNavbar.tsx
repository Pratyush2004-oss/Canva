import React from "react";
import { TextSettingsList } from "../Options";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { ArrowDown, ArrowUp, Trash } from "lucide-react";
import { useCanvasHook } from "@/app/(routes)/design/[designId]/page";
import FontStyle from "./FontStyle";
function TextSettingsNavbar() {
  const {canvasEditor} = useCanvasHook();
  const onDeleteShape = () => {
    const activeObject = canvasEditor?.getActiveObject();
    if (activeObject) {
      canvasEditor.remove(activeObject);
      canvasEditor.renderAll();
    }
  }

   // moving the object to forward 
  const onMoveForward = () => {
    const activeObject = canvasEditor?.getActiveObject();
    if (activeObject) {
      const objects = canvasEditor.getObjects();
      const currentIndex = objects.indexOf(activeObject);
      if (currentIndex !== -1 && currentIndex < objects.length - 1) {
        canvasEditor.bringObjectForward(activeObject);
        canvasEditor.renderAll();
      }
    }
  }

  // moving the object to backward
  const onMoveBackward = () => {
    const activeObject = canvasEditor?.getActiveObject();
    if (activeObject) {
      const objects = canvasEditor.getObjects();
      const currentIndex = objects.indexOf(activeObject);
      if (currentIndex !== -1 && currentIndex > 0) {
        canvasEditor.sendObjectBackwards(activeObject);
        canvasEditor.renderAll();
      }
    }
  }
  return (
    <div className="flex gap-6 w-[calc(100vh - 70px)] overflow-auto">
      {TextSettingsList.map((shape, index) => (
        <div
          key={index}
          className="p-1 hover:bg-gray-100 cursor-pointer hover:scale-105 transition-all duration-200 rounded-md"
        >
          <Popover>
            <PopoverTrigger asChild>
              <shape.icon
                strokeWidth={2.5}
                className="size-6 text-black font-extrabold"
              />
            </PopoverTrigger>
            <PopoverContent>
              {shape.component && <shape.component />}
            </PopoverContent>
          </Popover>
        </div>
      ))}
      <div
        className="p-1 hover:bg-gray-100 cursor-pointer hover:scale-105 transition-all duration-200 rounded-md"
        onClick={onMoveForward}
      >
        <ArrowUp
          strokeWidth={2.5}
          className="size-6 text-black font-extrabold"
        />
      </div>
      <div
        className="p-1 hover:bg-gray-100 cursor-pointer hover:scale-105 transition-all duration-200 rounded-md"
        onClick={onMoveBackward}
      >
        <ArrowDown
          strokeWidth={2.5}
          className="size-6 text-black font-extrabold"
        />
      </div>
      <FontStyle />

      <div className="p-1 hover:bg-gray-100 cursor-pointer hover:scale-105 transition-all duration-200 rounded-md" onClick={onDeleteShape}>
        <Trash strokeWidth={2.5} className="size-6 text-black font-extrabold" />
      </div>
    </div>
  );
}

export default TextSettingsNavbar;
