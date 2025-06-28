"use client";
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { toast } from "sonner";

function PreTemplateList() {
  const templateList = useQuery(api.templates.fetchAllTemplates);

  const createNewDesignFromTemplate = useMutation(
    api.designs.CrateDesignFromTemplate
  );
  const { userDetail } = useContext(UserDetailContext);
  const router = useRouter();
  const onTemplateSelect = async (template: Doc<"templates">) => {
    // save to design table with user Id
    const id = await createNewDesignFromTemplate({
      name: template.name,
      JSONTemplate: template.jsonData,
      uid: userDetail?._id,
      imagePreview: template.imagePreview,
      height: template.height || 500,
      width: template.width || 500,
    });
    toast.success("Template added!");
    router.push(`/design/${id}`);
  };
  return (
    templateList && (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {templateList.map((template, index) => (
          <div
            key={index}
            onClick={() => onTemplateSelect(template)}
            className="cursor-pointer"
          >
            <Image
              src={template.imagePreview || "/edittool.png"}
              alt={template.name}
              width={200}
              height={200}
              className="w-full h-[200px] object-contain bg-secondary rounded-xl cursor-pointer"
            />
          </div>
        ))}
      </div>
    )
  );
}

export default PreTemplateList;
