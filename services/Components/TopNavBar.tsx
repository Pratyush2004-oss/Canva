import React, { useEffect, useState } from "react";
import ShapesSetting from "../Sharable/ShapesSetting";
import { useCanvasHook } from "@/app/(routes)/design/_components/useCanvasHook";
import TextSettingsNavbar from "../Sharable/TextSettingsNavbar";

function TopNavBar() {
  const { canvasEditor } = useCanvasHook();
  const [showShapeSetting, setshowShapeSetting] = useState(false);
  const [enableTextSettings, setEnableTextSettings] = useState(false);

  useEffect(() => {
  }, [canvasEditor]);

  if (canvasEditor) {
    canvasEditor.on("selection:created", function (e: any) {
      const activeObject = canvasEditor.getActiveObject();
      if (activeObject) {
        if (!activeObject.text) {
          setshowShapeSetting(true);
          setEnableTextSettings(false);
        }
        if (activeObject.text) {
          setEnableTextSettings(true);
          setshowShapeSetting(false);
        }
      }
    });
    canvasEditor.on("selection:updated", function () {
      const activeObject = canvasEditor.getActiveObject();
        if (!activeObject.text) {
          setshowShapeSetting(true);
          setEnableTextSettings(false);
        }
        if (activeObject.text) {
          setEnableTextSettings(true);
          setshowShapeSetting(false);
        }
    });
    canvasEditor.on("selection:cleared", function () {
      setshowShapeSetting(false);
      setEnableTextSettings(false);
    });
  }
  return (
    <div className={`${showShapeSetting || enableTextSettings ? "" : "hidden"} p-3 bg-white`}>
      {showShapeSetting && <ShapesSetting />}
      {enableTextSettings && <TextSettingsNavbar />}
    </div>
  );
}

export default TopNavBar;
