import React, { useEffect, useState } from "react";
import axios from "axios";
import "styles/VideoContainer.scss";
import imageTest from "D:/Neotube/frontend/src/styles/images/ilbuni.png";
// require() 안됨.
// 상대경로 안됨

export type VideoData = {
  channel: string;
  title: string;
  video: string;
  thumbnail: string;
  runtime: number;
  views: number;
  create_at: string;
};

type VideoBoxProps = {
  videoData: VideoData;
};

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

  const BackgroundStyle = {
    paddingBottom: `60%`,
    backgroundColor: `#9e9e9e`,
    backgroundRepeat: `no-repeat`,
    backgroundPosition: `top`,
    backgroundSize: `cover`,
    backgroundImage: `url(${imageTest})`,
  };

  return (
    <div className="video">
      <figure className="thumnail" style={BackgroundStyle}>
        <div className="hidden">
          <div className="lastview">a</div>
          <div className="addlist">b</div>
        </div>
        <div className="runtime">{runtime}분</div>
      </figure>
      <div className="videoDesc">
        <div className="videoImg">img</div>
        <div className="videoContent">
          <div className="videoName">
            <p className="videoName-item">{thumbnail}</p>
          </div>
          <div className="videoChannel">
            <p className="videoChannel-item">{channel}</p>
          </div>
          <div className="likesUpload">
            좋아요{views} . {create_at}
          </div>
        </div>
        <div className="hiddenAdd">...</div>
      </div>
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
