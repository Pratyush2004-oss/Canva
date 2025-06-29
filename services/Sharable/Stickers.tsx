import React from "react";
import { StickerList } from "../Options";
import { useCanvasHook } from "@/app/(routes)/design/_components/useCanvasHook";
import Image from "next/image";
import { FabricImage } from "fabric";

function Stickers() {
  const { canvasEditor } = useCanvasHook();
  const onStickerSelect = async (sticker: string) => {
    const canvasImageRef = await FabricImage.fromURL(sticker, {
      crossOrigin: "anonymous",
    });
    canvasEditor?.add(canvasImageRef);
    canvasEditor.renderAll();
  };
  return (
    <div className="my-5">
      <h1 className="font-bold text-xl md:text-2xl">Stickers</h1>
      <div className="grid grid-cols-3 gap-2">
        {StickerList.map((sticker, idx) => (
          <div
            key={idx}
            onClick={() => onStickerSelect(sticker)}
            className="cursor-pointer"
          >
            <div>
              <Image
                src={sticker}
                alt={"sticker"}
                width={100}
                height={100}
                className="p-2 border rounded-xl"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Stickers;
