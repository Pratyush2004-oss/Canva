import {
  Component,
  Folder,
  Home,
  Image,
  LayoutDashboard,
  LayoutTemplate,
  Settings,
  ShapesIcon,
  Sparkle,
  Type,
  WalletCardsIcon,
} from "lucide-react";
import BackgroundSetting from "./Components/BackgroundSetting";
import AiTransformSetting from "./Components/AiTransformation";
import TextSetting from "./Components/TextSetting";
import AddImageSetting from "./Components/AddImageSetting";
import TemplateList from "./Components/TemplateList";
import Elements from "./Components/Elements";

export const WorkspaceMenu = [
  {
    name: "Home",
    icon: Home,
    path: "/",
  },
  {
    name: "Projects",
    icon: Folder,
    path: "/workspace/projects",
  },
  {
    name: "Templates",
    icon: LayoutDashboard,
    path: "/workspace/templates",
  },
  {
    name: "Billing",
    icon: WalletCardsIcon,
    path: "/workspace/billing",
  },
];

export const canvasSizeOptions = [
  {
    name: "Instagram Post",
    width: 500,
    height: 500,
    icon: "/instagram.png",
  },
  {
    name: "Instagram Story",
    width: 473,
    height: 700,
    icon: "/instagram.png",
  },
  {
    name: "YouTube Thumbnail",
    width: 700,
    height: 394,
    icon: "/youtube.png",
  },
  {
    name: "YouTube Banner",
    width: 700,
    height: 394,
    icon: "/youtube-2.png",
  },
  {
    name: "YouTube Post",
    width: 500,
    height: 500,
    icon: "/youtube.png",
  },
  {
    name: "PowerPoint Slide",
    width: 700,
    height: 394,
    icon: "/ppt.png",
  },
  {
    name: "Flyer (A4)",
    width: 508,
    height: 700,
    icon: "/circle.png",
  },
  {
    name: "Facebook Post",
    width: 700,
    height: 368,
    icon: "/facebook.png",
  },
  {
    name: "Twitter Post",
    width: 700,
    height: 394,
    icon: "/twitter.png",
  },
  {
    name: "LinkedIn Post",
    width: 700,
    height: 366,
    icon: "/linkedin.png",
  },
  {
    name: "Pinterest Pin",
    width: 467,
    height: 700,
    icon: "/pinterest.png",
  },
];

type SideBarMenu = {
  name: string;
  desc: string;
  icon: any;
  component?: any;
};
export const sideBarMenu = [
  {
    name: "Templates",
    desc: "Select Prebuild Template",
    icon: LayoutTemplate,
    component: TemplateList,
  },
  {
    name: "Elements",
    desc: "Select Shapes and Stickers",
    icon: ShapesIcon,
    component: Elements,
  },
  {
    name: "Images",
    desc: "Add Image or Upload your own",
    icon: Image,
    component: AddImageSetting,
  },
  {
    name: "Text",
    desc: "Add Text and Heading",
    icon: Type,
    component: TextSetting,
  },
  {
    name: "AI",
    desc: "More AI Feature to enhance your design",
    icon: Sparkle,
    component: AiTransformSetting,
  },
  {
    name: "Background",
    desc: "Change Canvas Background",
    icon: Component,
    component: BackgroundSetting,
  },
  {
    name: "Settings",
    desc: "Update Canvas Size and background",
    icon: Settings,
    component: null,
  },
];

export const ShapeList = [
  {
    name: 'Circle',
    icon: '/moon.png'
  },
  {
    name: 'Square',
    icon: '/square.png'
  },
  {
    name: "Triangle",
    icon: '/triangle.png'
  },
  {
    name: "Line",
    icon: '/line.png'
  }
]
