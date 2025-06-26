import React, { useState } from "react";
import { AITransformationSettings } from "../Options";
import Image from "next/image";
import CustomImageUpload from "../Sharable/CustomImageUpload";
import { AITransformationSettingType } from "@/types/types";

function AITransformSetting() {
  const [selectedAI, setselectedAI] = useState<AITransformationSettingType>();
  return (
    <div>
      <CustomImageUpload selectedAI={selectedAI} />
      <h2 className="text-lg font-mono font-semibold my-2">
        AI Transformation
      </h2>
      <div className="grid grid-cols-2 gap-3 max-h-[calc(100vh-200px)] overflow-auto">
        {AITransformationSettings.map((setting, index) => (
          <div key={index} className="mb-2" onClick={() => setselectedAI(setting)}>
            <Image
              src={setting.image}
              alt={setting.name}
              width={500}
              height={500}
              className="inline-block mr-2 w-full rounded-lg object-cover h-[70px] "
            />
            <h2 className="text-xs font-mono font-medium text-center">
              {setting.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AITransformSetting;
