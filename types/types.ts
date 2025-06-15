import { LucideProps } from "lucide-react";
import { JSX } from "react";

export interface CanvasOptionTypes {
  width: number;
  height: number;
  icon: string;
  name: string;
}

export interface DesignSidebarType {
  name: string;
  desc: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  component?: JSX.Element;
}
