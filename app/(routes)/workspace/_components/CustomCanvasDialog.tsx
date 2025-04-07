"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { Loader2 } from "lucide-react";
import React, { useContext, useState } from "react";
import { toast } from "sonner";

const CustomCanvasDialog = ({ children }: { children: React.ReactElement }) => {
  const [name, setname] = useState<string>("");
  const [height, setheight] = useState<number>(0);
  const [width, setwidth] = useState<number>(0);
  const [loading, setloading] = useState<boolean>(false);
  const { userDetail } = useContext(UserDetailContext);

  const createDesignRecord = useMutation(api.designs.CreateNewDesign);
  const onCreate = async () => {
    setloading(true);
    try {
      const result = await createDesignRecord({
        name: name,
        width: width,
        height: height,
        uid: userDetail?._id,
      });
      console.log(result);
      setname("");
      setheight(0);
      setwidth(0);
    } catch (error) {
      console.log(error);
      toast.error("Error in creating design");
    } finally {
      setloading(false);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Custom Canvas</DialogTitle>
          <DialogDescription asChild>
            <div>
              <h2 className="text-sm">Provide Canvas size</h2>
              <div className="mt-2">
                <label>
                  <Input
                    placeholder="Design Name"
                    className="w-full"
                    onChange={(e) => setname(e.target.value)}
                    value={name}
                  />
                </label>
                <div className="mt-1 flex justify-between w-full gap-5">
                  <div className="w-full">
                    <label>Height</label>
                    <Input
                      onChange={(e) => setheight(parseInt(e.target.value))}
                      value={height}
                      type="number"
                      className="mt-1 "
                      placeholder={"500"}
                      min={0}
                    />
                  </div>
                  <div className="w-full">
                    <label>Width</label>
                    <Input
                      min={0}
                      value={width}
                      onChange={(e) => setwidth(parseInt(e.target.value))}
                      type="number"
                      className="mt-1"
                      placeholder={"500"}
                    />
                  </div>
                </div>
              </div>
              <div className="flex mt-6 w-full">
                <Button
                  className="w-full cursor-pointer"
                  onClick={onCreate}
                  disabled={loading}
                >
                  {loading ? <Loader2 /> : "Create"}
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CustomCanvasDialog;
