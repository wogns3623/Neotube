import React, { useEffect, useState } from "react";

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
  watch_count: number;
  created_at: string;
};

type VideoBoxProps = {
  videoData: VideoData;
};

const VideoBox = ({ videoData }: VideoBoxProps) => {
  const {
    uploader,
    title,
    video,
    thumb_nail,
    run_time,
    watch_count,
    created_at,
  } = videoData;
  return (
    <div className="video-box">
      <a href={video}>
        <div className="thumbnail">
          <img alt={title} src={thumb_nail} />
          <div className="runtime">{run_time}</div>
        </div>
        <div className="detail">
          <div className="channel-icon"></div>
          <div className="meta">
            <div className="title">{title}</div>
            <div className="channel-name">{uploader}</div>
            <div className="etc">
              <div className="views">{watch_count}</div>
              <div className="created">{created_at}</div>
            </div>
          </div>
          <div className="menu"></div>
        </div>
      </a>
    </div>
  );
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
    setVideoList(props.videoList);
  }, [props.videoList]);

  // load additional video after scroll event
  useEffect(() => {
    if (loadVideo === true) {
      console.log("get additional video");
      myFetch(`${config.APIServer}/browse/`).then((res) => {
        console.log("add video", res.jsonBody);
        setVideoList((vl) => vl.concat(res.jsonBody.results));
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
