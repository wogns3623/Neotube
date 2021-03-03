import React from "react";
import ButtonIcon from "./ButtonIcon";
import DescIcon from "./DescIcon";
import ChannelIcon from "./CannelIcon";
import { BasicProps } from "types";
import { SvgEnum, svgList } from "assets/svg";
import "./Icon.scss";

export type IconProps = BasicProps & {
  children?: React.ReactNode;
  type?: SvgEnum;
};

const Icon = ({ className, children, type }: IconProps) => {
  if (type && !className) className = type;
  if (type) {
    children = svgList[type];
  }

  return (
    <div className={`react-icon ${className ? className : ""}`}>{children}</div>
  );
};

export default Icon;
export { ButtonIcon, DescIcon, ChannelIcon };
