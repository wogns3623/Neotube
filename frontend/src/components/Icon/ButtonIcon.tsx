import React from "react";
import Icon from "./Icon";

type IconProps = {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
};
const ButtonIcon = ({ children, className, onClick }: IconProps) => {
  return (
    <div className={`react-icon-button ${className}`}>
      <button type="button" onClick={onClick}>
        <Icon>{children}</Icon>
      </button>
    </div>
  );
};
ButtonIcon.defaultProps = {
  className: "",
};

export default ButtonIcon;
