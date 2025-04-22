"use client";
import { useCanvasHook } from "@/app/(routes)/design/[designId]/page";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { FabricImage } from "fabric";
import { Search } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type ImageListType = {
  urls: {
    thumb: string;
    regular: string;
    small: string;
  };
};
function SearchImage() {
  const [imageList, setimageList] = useState<ImageListType[]>([]);
  const [imageInput, setimageInput] = useState<string>("Nature");
  const {canvasEditor} = useCanvasHook();
  const GetImageList = async (imageInput: string) => {
    setimageList([]);
    const result = await axios.get("https://api.unsplash.com/search/photos", {
      params: {
        query: imageInput,
        page: 1,
        per_page: 20,
      },
      headers: {
        Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
      },
    });
    result &&
      result.data.results.map((result: ImageListType, idx: number) => {
        setimageList((prev: ImageListType[]) => [...prev, result]);
      });
  };

  const addImageToCanvas = async (image: string) => {
    const canvasImageRef = await FabricImage.fromURL(image);
    canvasEditor?.add(canvasImageRef);
    canvasEditor.renderAll();

  }
  useEffect(() => {
    GetImageList("Nature");
  }, []);


  return (
    <div className="">
      <div className="mt-5 relative">
        <Search className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer p-0.5" onClick={() => GetImageList(imageInput)}/>
        <Input placeholder="Enter Image" onChange={(e) => setimageInput(e.target.value)} className="pr-12" />
      </div>
      {imageList.length > 0 && (
        <div className="mt-5 grid grid-cols-2 gap-2 h-[75vh] overflow-auto">
          {imageList.map((image: ImageListType, index: number) => (
            <div key={index} className="" onClick={() => addImageToCanvas(image.urls.small)}>
              <Image
                className="h-[80px] rounded-sm w-full object-cover"
                src={image.urls.thumb}
                alt="image"
                width={300}
                height={300}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchImage;
