import React from "react";
import { ReactComponent as RightIcon } from "../assets/right.svg";

interface IconProps {
  name: string;
  width?: string;
  height?: string;
}

const FnIcon: React.FC<IconProps> = ({ name, width = 20, height = 20 }) => {
  let IconComponent;
  switch (name) {
    case "right":
      IconComponent = RightIcon;
      break;
    // 在这里添加更多的case，以支持更多的图标
    default:
      return null;
  }

  return <IconComponent style={{ width: width, height: height }} />;
};

export default FnIcon;
