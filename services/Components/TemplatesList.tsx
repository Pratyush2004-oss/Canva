import { useCanvasHook } from "@/app/(routes)/design/[designId]/page";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import Image from "next/image";

function TemplatesList() {
  const { canvasEditor } = useCanvasHook();
  const templates = useQuery(api.templates.fetchAllTemplates);

  const onTemplateSelect = (template: Doc<"templates">) => {
    if (canvasEditor) {
      canvasEditor.loadFromJSON(template?.jsonData, () => {
        canvasEditor?.requestRenderAll();
      });
    }
  };

  return (
    <div>
      {templates && templates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((template) => (
            <div
              key={template._id}
              onClick={() => onTemplateSelect(template)}
              className="cursor-pointer"
            >
              <Image
                src={template.imagePreview}
                alt={template.name}
                width={500}
                height={500}
                className="w-full border-2 rounded-lg object-contain mb-4 cursor-pointer hover:scale-105 transition-transform duration-200 bg-secondary"
              />
            </div>
          ))}
        </div>
      ) : (
        <p>No templates found.</p>
      )}
    </div>
  );
}

export default TemplatesList;
