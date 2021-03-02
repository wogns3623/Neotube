import React from "react";
import "./ChannelIcon.scss";
import { IconProps } from "../index";
import TestImg from "D:/Neotube/frontend/src/styles/images/ilbuni.png";
// ? require()왜 안됨?

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
