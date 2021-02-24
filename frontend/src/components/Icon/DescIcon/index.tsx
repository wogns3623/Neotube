import React from "react";
import Icon, { IconProps } from "../index";
import List from "components/List";

import "./DescIcon.scss";

type DescIconProps = IconProps & {
  desc: string;
  href: string;
  additionalIcon?: React.ReactNode;
};
const DescIcon = ({
  className,
  children,
  type,
  desc,
  href,
  additionalIcon,
}: DescIconProps) => {
  // children: image | svg icon
  // desc: channel name | 홈, 인기, 구독 등
  return (
    <div className={`react-icon-desc ${className ? className : ""}`}>
      <a href={href}>
        <List className="item-wrapper">
          <Icon type={type}>{children}</Icon>
          <div className="desc">{desc}</div>
          <div className="additional-icon">{additionalIcon}</div>
        </List>
      </a>
    </div>
  );
};
DescIcon.defaultProps = {
  href: "",
};

export default DescIcon;
