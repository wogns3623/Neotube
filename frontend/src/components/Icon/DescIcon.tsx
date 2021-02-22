import React from "react";
import Icon from "./Icon";
import List from "components/List";
import { SingleWrapperProps } from "types";

type DescIconProps = SingleWrapperProps & {
  desc: string;
  href: string;
  additionalIcon?: React.ReactNode;
};
const DescIcon = ({
  className,
  children,
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
};

export default DescIcon;
