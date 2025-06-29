import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { UserButton } from "@stackframe/stack";
import { Download, Save } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useCanvasHook } from "../[designId]/page";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import ImageKit from "imagekit";
import Link from "next/link";

const DesignHeader = ({ DesignInfo }: { DesignInfo: Doc<"designs"> }) => {
  const { canvasEditor } = useCanvasHook();
  const SaveDesign = useMutation(api.designs.SaveDesign);
  const { designId } = useParams();

  var imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGE_KIT_PUBLIC_KEY!,
    privateKey: process.env.NEXT_PUBLIC_IMAGE_KIT_PRIVATE_KEY!,
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGE_KIT_URL_ENDPOINT!,
  });

  // use to save the design data to the convex
  const onSave = async () => {
    if (canvasEditor) {
      const base64Image = canvasEditor.toDataURL({
        format: "png",
        quality: 1,
      });

      // get list of all the files
      const existingFiles = await imagekit.listFiles({
        searchQuery: `name=${designId}.png`,
      });

      // delete old files of exist
      if (existingFiles && existingFiles.length > 0) {
        await Promise.all(
          existingFiles.map(async (file) => {
            // Only delete if it's a FileObject (has fileId)
            if ("fileId" in file && typeof file.fileId === "string") {
              await imagekit.deleteFile(file.fileId);
            }
          })
        );
      }

      const imageRef = await imagekit.upload({
        file: base64Image || "",
        fileName: designId + ".png",
        isPublished: true,
        useUniqueFileName: false,
      });

      const JSONDesign = canvasEditor.toJSON();
      await SaveDesign({
        id: designId as Id<"designs">,
        jsonDesign: JSONDesign,
        imageUrl: imageRef.url,
      });
      toast.success("Saved!");
    }
  };
  // use to export the design data as a JSON file
  const onExport = () => {
    const dataUrl = canvasEditor?.toDataURL({
      format: "png",
      multiplier: 2,
      quality: 1,
    });
    const link = document?.createElement("a");
    link.href = dataUrl || "";
    link.download = `${DesignInfo?.name || "design"}.png`;
    link.click();
  };
  return (
    DesignInfo && (
      <div className="p-3 flex items-center justify-between px-5 gap-10 bg-gradient-to-r from-sky-500 via-blue-400 to-purple-600">
        <Link href={"/workspace"}>
          <Image src={"/logo-white.png"} alt="" width={100} height={60} />
        </Link>
        <Input
          defaultValue={DesignInfo?.name}
          placeholder="Design Name"
          className="text-white font-medium border-none placeholder:text-white placeholder:font-normal"
        />
        <div className="flex items-center gap-3">
          <Button
            onClick={onSave}
            disabled={!canvasEditor}
            className="text-white cursor-pointer bg-gradient-to-tl  from-sky-500 via-blue-400 to-purple-600"
            variant={"outline"}
          >
            {" "}
            <Save /> Save
          </Button>
          <Button onClick={onExport} variant={"outline"}>
            <Download /> Export
          </Button>
          <UserButton />
        </div>
      </div>
    )
  );
};

export default DesignHeader;
