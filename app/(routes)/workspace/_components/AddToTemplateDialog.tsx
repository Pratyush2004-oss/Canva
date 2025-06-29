"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { UserDetailContext } from "@/context/UserDetailContext";
import Image from "next/image";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function AddToTemplateDialog() {
  const { userDetail } = useContext(UserDetailContext);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [designList, setdesignList] = useState<Doc<"designs">[]>([]);
  const convex = useConvex();
  const GetDesignsByUser = async () => {
    const designs = await convex.query(
      api.designs.GetDesignsByUserForTemplate,
      {
        id: userDetail?._id as Id<"users">,
      }
    );
    setdesignList(designs);
  };

  useEffect(() => {
    if (userDetail?._id) {
      GetDesignsByUser();
    }
  }, [userDetail]);

  const createNewTemplate = useMutation(api.templates.SaveTemplate);

  const onAddtoTemplate = async (design: Doc<"designs">) => {
    await createNewTemplate({
      height: design.height,
      width: design.width,
      name: design.name,
      JSONData: design.jsonTemplate,
      ImagePreview: design.imagePreview ?? "",
    });
    toast.success("Template added!");
    setDialogOpen(false);
  };
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="bg-gradient-to-br from-primary to-secondary"
        >
          Add Template
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Template?</DialogTitle>
          <DialogDescription>
            Add your Recent Design to a template available to all users
          </DialogDescription>
        </DialogHeader>
        <div className="">
          {designList?.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-80 overflow-auto">
              {designList?.map((design, index) => (
                <div key={index} className="" onClick={() => onAddtoTemplate(design)}>
                  <Image
                    src={design.imagePreview ?? ""}
                    height={500}
                    width={500}
                    alt={design.name}
                    className="w-56 border-2 object-contain bg-secondary rounded-xl cursor-pointer"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <h1 className="text-xl font-medium font-mono text-red-400">
                No design found
              </h1>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddToTemplateDialog;
