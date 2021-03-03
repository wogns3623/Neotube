import React from "react";
import "./ChannelIcon.scss";
import { IconProps } from "../index";
import TestImg from "styles/images/ilbuni.png";

type ChannelIconProps = IconProps & {
  channel: string;
  href: string;
};

const ChannelIcon = ({ channel, href }: ChannelIconProps) => {
  const img = TestImg;
  return (
    <a className="channelIcon" href={href} title={channel}>
      <img alt="채널 이미지 " width="36px" height="36px" src={img} />
    </a>
  );
};

export default ChannelIcon;
