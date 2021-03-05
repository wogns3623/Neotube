import React from "react";
import ThumbNail from "components/VideoBox/ThumbNail";
import VideoDesc from "components/VideoBox/VideoDesc";
import { VideoData } from "components/VideoContainer";
import "./VideoBox.scss";

type VideoBoxProps = {
  videoData: VideoData;
};

// TODO tooltip 만들기 (header-icon, videoview-uploadername)

const VideoBox = ({ videoData }: VideoBoxProps) => {
  const {
    video,
    thumb_nail,
    description,
    run_time,
    title,
    channel,
    watch_count,
    created_at,
  } = videoData;

  return (
    <div className="video">
      <ThumbNail thumb_nail={thumb_nail} video={video} run_time={run_time} />

      <VideoDesc
        thumb_nail={thumb_nail}
        title={title}
        description={description}
        channel={channel}
        watch_count={watch_count}
        created_at={created_at}
      />
    </div>
  );
};

export default VideoBox;
