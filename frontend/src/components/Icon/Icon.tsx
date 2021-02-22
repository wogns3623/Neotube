import React from "react";
import { SingleWrapperProps } from "utils/types";

import "./Icon.scss";

const Icon = ({ children, className }: SingleWrapperProps) => {
  return (
    <div className={`react-icon ${className ? className : ""}`}>{children}</div>
  );
};

export default Icon;
