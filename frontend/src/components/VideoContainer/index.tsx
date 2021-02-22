import React, { useEffect, useState } from "react";

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

  useEffect(() => {
    // add scroll event to VideoContainer

    let infiScrollEvent = (event: Event): void => {
      let element = document.getElementsByClassName(
        "VideoContainer"
      )[0] as HTMLElement;

      let threshold = 100;

      let elementHeight =
        element.offsetHeight +
        element.offsetTop -
        document.documentElement.clientHeight;

      console.log(window.scrollY, elementHeight, elementHeight - threshold);

      if (window.scrollY > elementHeight - threshold) {
        console.log("set loadVideo true");
        setLoadVideo(true);
      }
    };

    console.log("add infiscroll event");
    window.addEventListener("scroll", infiScrollEvent);

    return () => {
      console.log("remove infiScroll event");
      window.removeEventListener("scroll", infiScrollEvent);
    };
  }, []);

  useEffect(() => {
    setVideoList(props.videoList);
  }, [props.videoList]);

  useEffect(() => {
    // load additional video after scroll event
    if (loadVideo === true) {
      // console.log("get additional video");
      // setTimeout(() => {
      //   setVideoList((vl) => vl.concat(vl));
      //   setLoadVideo(false);
      // }, 1000);

      fetch("http://www.neotubei.kro.kr/neotubei/v1/browse/")
        .then((res) => res.json())
        .then((json) => {
          setVideoList((vl) => vl.concat(json.video));
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
