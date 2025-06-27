import React from "react";
import { ShapeList } from "../Options";
import Image from "next/image";
import { Circle, Line, Rect, Triangle } from "fabric";
import { useCanvasHook } from "@/app/(routes)/design/[designId]/page";
import Stickers from "./Stickers";

type ShapeType = {
  name: string;
  icon: string;
};
function Shapes() {
  const { canvasEditor } = useCanvasHook();
  const onShapeSelect = (shape: ShapeType) => {
    const properties = {
      left: 100,
      top: 100,
      radius: 50,
      fill: "black",
      stroke: "black",
      width:100,
      height: 100,
      strokeWidth: 1,
    };
    if (shape.name == "Circle") {
      const circleRef = new Circle({
        ...properties,
      });
      canvasEditor.add(circleRef);
    }
    else if(shape.name == 'Square'){
        const SquareRef = new Rect({
            ...properties,
        })
        canvasEditor.add(SquareRef);
    }
    else if(shape.name == 'Triangle'){
        const triangleRef = new Triangle({
            ...properties
        })
        canvasEditor.add(triangleRef);        
    }
    else if(shape.name == 'Line'){
        const lineRef = new Line([50,50,200,200],{
            stroke: 'black',
            strokeWidth: 5
        })
        canvasEditor.add(lineRef); 
    }
    canvasEditor.renderAll();
  };
  return (
    <div>
      <div className="grid grid-cols-3 gap-2">
        {ShapeList.map((shape, idx) => (
          <div key={idx} onClick={() => onShapeSelect(shape)} className="cursor-pointer">
            <div>
              <Image
                src={shape.icon}
                alt={shape.name}
                width={100}
                height={100}
                className="p-2 border rounded-xl"
              />
            </div>
          </div>
        ))}
      </div>
      {/* Stickers */}
      <Stickers />
    </div>
  );
}

export default Shapes;
