import React, { useEffect, useState } from "react";
import axios from "axios";
import "styles/VideoContainer.scss";
import CreateAt from "./CreateAt";
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

// todo list
// position공부해서 화면 조정하기 (0)
// react 이벤트 핸들링 하기
// - videoview 띄우기
// - 영상 이미지 focus : 영상 출력(0.5초 뒤) + runtime:none(0.5초 뒤) hidden: ''(바로)
// - hidden focus: overflow만들기
// videoName 두줄 + ... 만들기
// hiddenadd focus: block, onclik: overflow뜨기

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

  // TODO mouseOn- (desc,menu):on
  // TODO
  return (
    <div className="video">
      <figure className="thumnail">
        <video className="backVideo"></video>
        <div className="hidden">
          <div className="lastview">
            <span className="lastview-item1">나중에 볼 동영상</span>
            <span className="lastview-item2"> ☑</span>
          </div>
          <div className="addlist">
            <span className="addlist-item1">목록에 추가</span>
            <span className="addlist-item2"> +</span>
          </div>
        </div>
      </figure>
      <div className="videoDesc">
        <div className="videoImg"></div>
        <div className="videoContent">
          <div className="videoName">
            <p className="videoName-item">
              {title} {thumbnail}
            </p>
          </div>
          <div className="videoChannel">
            <p className="videoChannel-item">{channel}</p>
          </div>
          <CreateAt view={views} create={create_at} />
          <span className="runtime">
            <span className="runtime-item">
              {(runtime - (runtime % 60)) / 60}:{runtime % 60}
            </span>
          </span>
        </div>
        <div className="hiddenAdd">
          <div className="Add">⁝</div>
        </div>
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
