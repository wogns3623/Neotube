import React, { useEffect, useState } from "react";
import VideoBox from "components/VideoBox";
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

      fetch("http://www.neotubei.kro.kr/browse/")
        .then((res) => res.json())
        .then((json) => {
          setVideoList((vl) => vl.concat(json.video));
          setLoadVideo(false);
        });
    }
  }, [loadVideo]);

  console.log(videoList);

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
