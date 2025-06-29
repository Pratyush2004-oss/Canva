import { ImageUp, Loader, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ImageKit from "imagekit";
import { FabricImage } from "fabric";
import { useCanvasHook } from "@/app/(routes)/design/_components/useCanvasHook";
import { useParams } from "next/navigation";
import { AITransformationSettingType } from "@/types/types";
function CustomImageUpload({
  selectedAI,
}: {
  selectedAI: AITransformationSettingType | undefined;
}) {
  const [image, setImage] = useState("");
  const [loading, setloading] = useState(false);
  const { canvasEditor } = useCanvasHook();
  const { designId } = useParams();

  var imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGE_KIT_PUBLIC_KEY!,
    privateKey: process.env.NEXT_PUBLIC_IMAGE_KIT_PRIVATE_KEY!,
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGE_KIT_URL_ENDPOINT!,
  });

  // using imagekit to upload the image and get the url
  const onImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setloading(true);
    const file = event.target.files![0];
    const reader = new FileReader();
    reader.onload = async () => {
      const base64File = reader.result as string;
      const imageRef = await imagekit.upload({
        file: base64File,
        fileName: designId + ".png",
        isPublished: true,
      });
      setImage(imageRef.url);
      setloading(false);
    };
    reader.readAsDataURL(file);
  };

  //   adding image to the canvas
  const addToCanvas = async () => {
    const canvasImageRef = await FabricImage.fromURL(image, {
      crossOrigin: "anonymous",
    });
    canvasEditor?.add(canvasImageRef);
    setImage("");
  };

  useEffect(() => {
    if (selectedAI) {
      let imageUrl = image;
      if (image.includes("?tr=")) {
        imageUrl = imageUrl + "," + selectedAI.command;
      } else {
        imageUrl = imageUrl + "?tr=" + selectedAI.command;
      }
      setImage(imageUrl);
    }
  }, [selectedAI]);

  return (
    <div>
      {image ? (
        <>
          <div className="mv-b-2 border-2 border-black rounded-lg relative">
            <Image
              src={image}
              alt="Uploaded"
              width={500}
              height={500}
              className="w-full h-full object-cover rounded-lg"
            />
            <X
              size={22}
              color="white"
              className="bg-red-500 text-white rounded-full p-1 absolute -top-2 -right-2 hover:bg-red-600 hover:scale-105 transition-all duration-200 "
              onClick={() => setImage("")}
            />
          </div>
          <Button
            className="w-full mt-2 cursor-pointer"
            variant="secondary"
            onClick={addToCanvas}
            disabled={loading}
          >
            {loading ? <Loader className="animate-spin" /> : "Add to Canvas"}
          </Button>
        </>
      ) : (
        <>
          <label
            htmlFor="customImageUpload"
            className="bg-secondary cursor-pointer h-[100px] p-4 rounded-lg mb-4 flex-col flex items-center justify-center gap-2"
          >
            <ImageUp />
            <h2 className="text-sm">Upload Image</h2>
          </label>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="customImageUpload"
            onChange={onImageUpload}
          />
        </>
      )}
    </div>
  );
}

export default CustomImageUpload;
