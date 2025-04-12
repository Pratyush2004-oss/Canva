import React from "react";
import { ChromePicker, CirclePicker } from "react-color";

const ColorPicker = ({
  value,
  onColorChange,
}: {
  value: string;
  onColorChange: (color: string) => void;
}) => {
  return (
    <div>
      <ChromePicker
        color={value}
        onChange={(e) => onColorChange(e.hex)}
        className="rounded-xl mb-5 "
      />
      <CirclePicker color={value} onChange={(e) => onColorChange(e.hex)} />
    </div>
  );
};

export default ColorPicker;
