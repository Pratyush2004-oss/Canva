'use client'
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Search } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type ImageListType = {
  urls: {
    thumb: string;
  };
};
function SearchImage() {
  const [imageList, setimageList] = useState<ImageListType[]>([]);
  const [imageInput, setimageInput] = useState<string>("Nature");
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

  useEffect(() => {
    GetImageList(imageInput);
  }, [imageInput]);
  return (
    <div className="">
      <div className="mt-5 relative">
      <Search className="absolute top-2 right-3"/>

      <Input />
      </div>
      {imageList.length > 0 && (
        <div className="mt-5 grid grid-cols-2 gap-2 h-[75vh] overflow-auto">
          {
            imageList.map((image: ImageListType, index: number) => (
              <div key={index} className="">
                <Image
                  className="h-[80px] rounded-sm w-full"
                  src={image.urls.thumb}
                  alt="image"
                  width={300}
                  height={300}
                />
              </div>
            ))    
          }
        </div>
      )
        }
    </div>
  );
}

export default SearchImage;
