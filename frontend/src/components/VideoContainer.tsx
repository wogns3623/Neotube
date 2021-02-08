import React, { useEffect, useState } from "react";
import "styles/VideoContainer.scss";

// type VideoData = {
//   channel: string;
//   title: string;
//   thumbnail: string;
//   runtine: number;
//   views: number;
//   create_at: Date;
// };

// let videoData = {
//   video: [
//     {
//       channel: "junsu",
//       title: "[상여자] 라이벌",
//       video: "video/2021/10/02/05/21/상여자_라이벌.mp4",
//       thumbnail: "thumbnail/2021/10/02/05/21/fiveDice.png",
//       runtime: 192,
//       views: 1,
//       create_at: "2021년 2월 5일 1:10 오전",
//     },
//   ],
//   user: { username: null, img: null },
// };

const VideoBox = () => {
  return <div className="video-box"></div>;
};

type Props = {
  children: React.ReactNode;
  className?: string;
};
const VideoSection = ({ children, className }: Props) => {
  return <section className={`video-section ${className}`}>{children}</section>;
};
VideoSection.defaultProps = {
  className: "",
};

const VideoContainer = () => {
  const [loadVideo, setLoadVideo] = useState(false);
  const [videoData, setVideoData] = useState(30);

  // useEffect(() => {
  //   window.addEventListener("scroll", () => {
  //     console.log(document.documentElement.offsetHeight;
  //   });
  // });

  useEffect(() => {
    if (loadVideo === true) {
      setTimeout(() => {
        setLoadVideo(false);
        setVideoData(videoData + 30);
      }, 1000);
    }
  });

  let videos = [];

  for (let i = 0; i < videoData; i++) {
    videos.push(<VideoBox></VideoBox>);
  }

  return (
    <div className="VideoContainer">
      <VideoSection>{videos}</VideoSection>
      <div className={`spinner ${loadVideo ? "active" : ""}`}>
        it's spinner!
      </div>
      <button onClick={() => setLoadVideo(true)}></button>
    </div>
  );
};

export default VideoContainer;
