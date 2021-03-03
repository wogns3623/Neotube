import React from "react";
import Icon, { DescIcon, ChannelIcon } from "components/Icon";
import CreateAt, { WatchCount } from "components/CalcFnc";
import Menu, { MenuButton } from "components/Menu";
import "./VideoDesc.scss";

type VideoDescProps = {
  thumb_nail: string;
  title: string;
  description?: string;
  channel: string;
  watch_count: number;
  created_at: string;
};

const VideoDesc = ({
  thumb_nail,
  title,
  description,
  channel,
  watch_count,
  created_at,
}: VideoDescProps) => {
  return (
    <div className="videoDesc">
      <ChannelIcon className="" channel={channel} href=" " />

      <div className="videoContent">
        <a className="videoName" href=" " title={title}>
          {title}
        </a>
        <div className="videoChannel"> {channel}</div>
        <div className="viewDesc">
          <WatchCount watch_count={watch_count} />
          <CreateAt created_at={created_at} />
        </div>
      </div>

      <div className="hiddenAdd">
        <Menu className="add">
          <MenuButton>
            <Icon type="hiddenMenu" />
          </MenuButton>
          <DescIcon desc="동영상 업로드" type="upload" />
          <DescIcon desc="동영상 업로드" type="upload" />
        </Menu>
      </div>
    </div>
  );
};

export default VideoDesc;
