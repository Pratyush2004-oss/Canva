import { useCanvasHook } from "@/app/(routes)/design/_components/useCanvasHook";
import { FabricImage } from "fabric";
import ImageKit from "imagekit";
import { Loader } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useState } from "react";

function UploadImage() {
  const { designId } = useParams();
  const [loading, setloading] = useState<boolean>(false);
  const { canvasEditor } = useCanvasHook();
  var imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGE_KIT_PUBLIC_KEY!,
    privateKey: process.env.NEXT_PUBLIC_IMAGE_KIT_PRIVATE_KEY!,
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGE_KIT_URL_ENDPOINT!,
  });

  const onFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    const reader = new FileReader();
    reader.onload = async () => {
      setloading(true);
      const base64File = reader.result as string;
      const imageRef = await imagekit.upload({
        file: base64File,
        fileName: designId + ".png",
        isPublished: true,
      });
      const canvasImageRef = await FabricImage.fromURL(imageRef.url, {
        crossOrigin: "anonymous",
      });
      setloading(false);
      canvasEditor?.add(canvasImageRef);
      canvasEditor.renderAll();
    };
    reader.readAsDataURL(file);
  };
  return (
    <div>
      <label htmlFor="uploadImage">
        <h2 className="p-2 bg-primary text-white rounded-lg text-center font-semibold cursor-pointer text-sm ">
          {loading ? (
            <Loader className="animate-spin mx-auto" />
          ) : (
            "Upload Image"
          )}
        </h2>
      </label>
      <input
        type="file"
        id="uploadImage"
        className="hidden"
        multiple={false}
        onChange={onFileUpload}
      />
    </div>
  );
}

export default UploadImage;
