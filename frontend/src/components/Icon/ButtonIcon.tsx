import React from "react";
import Icon from "./index";
import { ClickableProps } from "types";

const ButtonIcon = ({ children, className, onClick }: ClickableProps) => {
  return (
    <div className={`react-icon-button ${className ? className : ""}`}>
      <button type="button" onClick={onClick}>
        <Icon>{children}</Icon>
      </button>
    </div>
  );
};

export default ButtonIcon;
