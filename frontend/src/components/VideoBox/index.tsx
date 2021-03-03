import React from "react";
import ThumbNail from "components/VideoBox/ThumbNail";
import VideoDesc from "components/VideoBox/VideoDesc";
import { VideoData } from "components/VideoContainer";
import "./VideoBox.scss";

type VideoBoxProps = {
  videoData: VideoData;
};

// TODO thumb_nail, videoDesc을 나눠서 component만들기 (complete)
// TODO tooltip 만들기 (header-icon, videoview-uploadername)
// TODO svg분리하기 (complete)
// TODO menu 사용법 바뀐거대로 수정 (complete)
// TODO 좀 더 간결하게 만들고 최대한 안 감싸게 만들기
// TODO backgroundImage => img태그로 바꾸기 (?)

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
