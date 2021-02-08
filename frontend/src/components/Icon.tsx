import React from "react";
import "styles/Icon.scss";

type IconProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const Icon = ({ children, className, onClick }: IconProps) => {
  return (
    <div className={`Icon ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};

// const DefaultIcon = () => {}
// const UserIcon = () => {}

Icon.defaultProps = {
  className: "",
};

export default Icon;
