import React from "react";
import List from "components/common/List";
import { Icon } from "components/common/Icon";

type DescIconProps = {
  desc: string;
  href: string;
  className?: string;
  children?: React.ReactNode;
  additionalIcon?: React.ReactNode;
};
const DescIcon = ({
  desc,
  href,
  className,
  children,
  additionalIcon,
}: DescIconProps) => {
  // children: image | svg icon
  // desc: channel name | 홈, 인기, 구독 등
  return (
    <div className={`react-icon-desc ${className}`}>
      <a href={href}>
        <List className="item-wrapper">
          <Icon>{children}</Icon>
          <div className="desc">{desc}</div>
        </List>
        <div className="additional-icon">{additionalIcon}</div>
      </a>
    </div>
  );
};
DescIcon.defaultProps = {
  href: "",
  className: "",
};

Object.defineProperty(DescIcon, "component_name", {
  value: "DescIcon",
  writable: false,
});

export default DescIcon;
