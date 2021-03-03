import React from "react";
import "./ChannelIcon.scss";
import { IconProps } from "../index";
import config from "config.json";

type ChannelIconProps = IconProps & {
  channel: string;
  href: string;
};

const ChannelIcon = ({ channel, href }: ChannelIconProps) => {
  return (
    <a className="channelIcon" href={href} title={channel}>
      <img
        alt="채널 이미지 "
        width="36px"
        height="36px"
        src={`${config.APIServer}/identicon/image/${channel}`}
      />
    </a>
  );
};

export default ChannelIcon;
