import { Doc } from "@/convex/_generated/dataModel";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

function DesignList({ designList }: { designList: Doc<"designs">[] }) {
    const router = useRouter();
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {designList.map((design, index) => (
        <div key={index} onClick={() => router.push(`/design/${design._id}`)} className="cursor-pointer">
          <Image
            src={design.imagePreview || "/edittool.png"}
            alt={design.name}
            width={200}
            height={200}
            className="w-full h-auto object-contain bg-secondary rounded-xl cursor-pointer"
          />
        </div>
      ))}
    </div> 
  );
}

export default DesignList;
