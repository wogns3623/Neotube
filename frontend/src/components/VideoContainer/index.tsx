import React, { useEffect, useState } from "react";
import VideoBox from "components/VideoBox";

import { useInfiscrollEvent } from "hook/event";
import myFetch from "utils/myFetch";
import config from "config.json";

import "./VideoContainer.scss";

export type VideoData = {
  uploader: number;
  title: string;
  thumb_nail: string;
  video: string;
  description?: string;
  run_time: number;
  channel: string;
  watch_count: number;
  created_at: string;
};

type VideoContainerProps = {
  videoList: VideoData[];
};

const VideoContainer = (props: VideoContainerProps) => {
  const [loadVideo, setLoadVideo] = useState(false);
  const [videoList, setVideoList] = useState([] as VideoData[]);

  useInfiscrollEvent(() => setLoadVideo(true), 100);

  // reset videoList using props
  useEffect(() => {
    console.log("initial videoList prop is", props.videoList);
    setVideoList(props.videoList);
  }, [props.videoList]);

  // load additional video after scroll event
  useEffect(() => {
    if (loadVideo === true) {
      console.log("get additional video");
      myFetch(`${config.APIServer}/browse/`).then((res) => {
        console.log("add video", res.parsedBody);
        setVideoList((vl) => vl.concat(res.parsedBody.results));
        setLoadVideo(false);
      });
    }
  }, [loadVideo]);

  return (
    <div className="VideoContainer">
      <section className="video-section">
        {videoList.map((videoInfo, index) => {
          return <VideoBox videoData={videoInfo} key={index}></VideoBox>;
        })}
      </section>
      <div className={`spinner ${loadVideo ? "active" : ""}`}>
        it's spinner!
      </div>
      <button onClick={() => setLoadVideo(true)}></button>
    </div>
  );
};

export default VideoContainer;
