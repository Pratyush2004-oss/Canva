import { useCanvasHook } from '@/app/(routes)/design/[designId]/page';
import { IText } from 'fabric';
import React from 'react'

const TextSetting = () => {
  const {canvasEditor} = useCanvasHook();
  const onAddTextClick = (type: string) => {
    // Logic to add text based on the type
    if(canvasEditor){
      if(type === "Heading"){
        const textRef = new IText("Add Heading", {
          fontSize: 30,
          fontWeight: "bold",
          fontFamily: "Arial",
          fill: "#000",
          left: 100,
          top: 100,
        });
        canvasEditor.add(textRef);
      }
      else if(type === "SubHeading"){
        const textRef = new IText("Add SubHeading", {
          fontSize: 24,
          fontWeight: "600",
          fontFamily: "Arial",
          fill: "#000",
          left: 100,
          top: 150,
        });
        canvasEditor.add(textRef);
      }
      else if(type === "paragraph"){
        const textRef = new IText("Add Paragraph", {
          fontSize: 18,
          fontWeight: "400",
          fontFamily: "Arial",
          fill: "#000",
          left: 100,
          top: 200,
        });
        canvasEditor.add(textRef);
      }

    }
    console.log(`Adding ${type}`);
  }
  return (
    <div className='text-center'>
      <h2 className="text-2xl bg-secondary p-3 rounded-lg font-mono font-bold my-2 cursor-pointer" onClick={() => onAddTextClick("Heading")}>Add Heading</h2>
      <h2 className="text-xl bg-secondary p-3 rounded-lg font-mono font-semibold my-2 cursor-pointer" onClick={() => onAddTextClick("SubHeading")}>Add SubHeading</h2>
      <h2 className="text-lg bg-secondary p-3 rounded-lg font-mono font-medium my-2 cursor-pointer" onClick={() => onAddTextClick("paragraph")}>Paragraph</h2>
    </div>
  )
}

export default TextSetting