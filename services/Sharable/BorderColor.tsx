import React, { useState } from 'react'
import ColorPicker from './ColorPicker'
import { useCanvasHook } from '@/app/(routes)/design/[designId]/page';

function BorderColor() {
    const [color, setcolor] = useState('#000');
    const {canvasEditor} = useCanvasHook();
    const handleColorChange = (value: string) => {
        setcolor(value);
        const activeObject = canvasEditor?.getActiveObject();
        if (activeObject) {
            activeObject.set({
                stroke: value,
            });
            canvasEditor?.renderAll();
        }
    }
  return (
    <ColorPicker onColorChange={handleColorChange} value={color}/>
  )
}

export default BorderColor