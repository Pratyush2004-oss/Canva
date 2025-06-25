import React, { useEffect, useState } from "react";
import ShapesSetting from "../Sharable/ShapesSetting";
import { useCanvasHook } from "@/app/(routes)/design/[designId]/page";

function TopNavBar() {
  const { canvasEditor } = useCanvasHook();
  const [showShapeSetting, setshowShapeSetting] = useState(false)

  useEffect(() => {
    const activeObject = canvasEditor?.getActiveObject();

  }, [canvasEditor]);
  if(canvasEditor) {
    canvasEditor.on('selection:created', function(e: any) {
      const activeObject = canvasEditor.getActiveObject();
      if (activeObject && e.selected[0].cornerStyle == 'rect') {
        setshowShapeSetting(true);
      }
    })
    canvasEditor.on('selection:cleared', function() {
      setshowShapeSetting(false);
    });
  }
  return (
    <div className="p-3 bg-white">
      {showShapeSetting && <ShapesSetting />}
    </div>
  );
}

export default TopNavBar;
