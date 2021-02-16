import React, { useEffect, useState } from "react";
import axios from "axios";
import "styles/VideoContainer.scss";

type VideoData = {
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

interface VideoSectionProps {
  children: React.ReactNode;
  className?: string;
}
const VideoSection = ({ children, className }: VideoSectionProps) => {
  return <section className={`video-section ${className}`}>{children}</section>;
};
VideoSection.defaultProps = {
  className: "",
};

interface VideoContainerProps {
  videoList: VideoData[];
}

const VideoContainer = ({ videoList }: VideoContainerProps) => {
  const [loadVideo, setLoadVideo] = useState(false);

  useEffect(() => {
    // add scroll event to VideoContainer
    console.log("add event listener");

    let infiScrollEvent = (event: Event): void => {
      let element = document.getElementsByClassName(
        "VideoContainer"
      )[0] as HTMLElement;

      let threshold = 100;

      let elementHeight =
        element.offsetHeight +
        element.offsetTop -
        document.documentElement.clientHeight;

      console.log(elementHeight, window.scrollY);

      if (window.scrollY > elementHeight - threshold) setLoadVideo(true);
    };

    window.addEventListener("scroll", infiScrollEvent);

    return () => {
      window.removeEventListener("scroll", infiScrollEvent);
    };
  }, []);

  useEffect(() => {
    // load additional video after scroll event
    if (loadVideo === true) {
      setTimeout(() => {
        setLoadVideo(false);
        // setVideoData(videoData + 30);
        // axios.get("http://www.neotubei.kro.kr/neotubei/v1/browse/");
      }, 1000);
    }
  }, [loadVideo]);

  let videoBoxes = [];

  for (let i = 0; i < videoList.length; i++) {
    videoBoxes.push(<VideoBox videoData={videoList[i]}></VideoBox>);
  }

  return (
    <div className="VideoContainer">
      <VideoSection>{videoBoxes}</VideoSection>
      <div className={`spinner ${loadVideo ? "active" : ""}`}>
        it's spinner!
      </div>
      <button onClick={() => setLoadVideo(true)}></button>
    </div>
  );
};

export default VideoContainer;
