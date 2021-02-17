import React from "react";
import "styles/Icon.scss";

type IconProps = {
  children: React.ReactNode;
  className?: string;
};
const Icon = ({ children, className }: IconProps) => {
  return <div className={`react-icon ${className}`}>{children}</div>;
};
Icon.defaultProps = {
  className: "",
};

Object.defineProperty(Icon, "component_name", {
  value: "Icon",
  writable: false,
});

export default Icon;
