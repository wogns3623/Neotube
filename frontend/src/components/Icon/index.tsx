import React from "react";
import ButtonIcon from "./ButtonIcon";
import DescIcon from "./DescIcon";
import { SingleWrapperProps } from "types";

import "./Icon.scss";

const Icon = ({ children, className }: SingleWrapperProps) => {
  return (
    <div className={`react-icon ${className ? className : ""}`}>{children}</div>
  );
};

export default Icon;
export { ButtonIcon, DescIcon };
