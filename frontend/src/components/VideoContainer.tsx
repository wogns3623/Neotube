import React, { useEffect, useState } from "react";
import axios from "axios";
import "styles/VideoContainer.scss";

export type VideoData = {
  channel: string;
  title: string;
  video: string;
  thumbnail: string;
  runtime: number;
  views: number;
  create_at: string;
};

interface VideoBoxProps {
  videoData: VideoData;
}

const VideoBox = ({ videoData }: VideoBoxProps) => {
  const {
    channel,
    title,
    video,
    thumbnail,
    runtime,
    views,
    create_at,
  } = videoData;
  return (
    <div className="video-box">
      <a href={video}>
        <div className="thumbnail">
          <img alt={title} src={thumbnail} />
          <div className="runtime">{runtime}</div>
        </div>
        <div className="detail">
          <div className="channel-icon"></div>
          <div className="meta">
            <div className="title">{title}</div>
            <div className="channel-name">{channel}</div>
            <div className="etc">
              <div className="views">{views}</div>
              <div className="created">{create_at}</div>
            </div>
          </div>
          <div className="menu"></div>
        </div>
      </a>
    </div>
  );
};

interface VideoContainerProps {
  videoList: VideoData[];
}

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
      console.log("get additional video");
      setTimeout(() => {
        setVideoList((vl) => vl.concat(vl));
        setLoadVideo(false);
      }, 1000);

      // axios
      //   .get("http://www.neotubei.kro.kr/neotubei/v1/browse/")
      //   .then((res) => {
      //     setVideoList((vl) => vl.concat(res.data));
      //     setLoadVideo(false);
      //   });
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
