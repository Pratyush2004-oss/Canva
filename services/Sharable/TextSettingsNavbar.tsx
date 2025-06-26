import React from "react";
import { TextSettingsList } from "../Options";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Trash } from "lucide-react";
import { useCanvasHook } from "@/app/(routes)/design/[designId]/page";
function TextSettingsNavbar() {
  const {canvasEditor} = useCanvasHook();
  const onDeleteShape = () => {
    const activeObject = canvasEditor?.getActiveObject();
    if (activeObject) {
      canvasEditor.remove(activeObject);
      canvasEditor.renderAll();
    }
  }
  return (
    <div className="flex gap-6">
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
      <div className="p-1 hover:bg-gray-100 cursor-pointer hover:scale-105 transition-all duration-200 rounded-md" onClick={onDeleteShape}>
        <Trash strokeWidth={2.5} className="size-6 text-black font-extrabold" />
      </div>
    </div>
  );
}

export default TextSettingsNavbar;
