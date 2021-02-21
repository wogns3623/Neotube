import React, { useEffect, useState } from "react";
import axios from "axios";
import "styles/VideoContainer.scss";
import imageTest from "D:/Neotube/frontend/src/styles/images/ilbuni.png";
import CreateAt from "./CreateAt";
import { getTsBuildInfoEmitOutputFilePath } from "typescript";
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
// position공부해서 화면 조정하기
// react 이벤트 핸들링 하기
// - videoview
// - menu Onclick : sidevar->sidemenu
// - 영상 이미지 focus : 영상 출력(0.5초 뒤) + runtime:none(0.5초 뒤) hidden: ''(바로)
// - hidden focus: overflow만들기

// creaste-at = 현재시간 - 게시시간 만들기
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

  const ThunmbnailImg = {
    backgroundColor: `#9e9e9e`,
    backgroundRepeat: `no-repeat`,
    backgroundPosition: `top`,
    backgroundSize: `cover`,
    backgroundImage: `url(${imageTest})`,
  };

  const ChannelImg = {
    backgroundColor: `gold`,
    backgroundRepeat: `no-repeat`,
    backgroundPosition: `top`,
    backgroundSize: `150%`,
    backgroundImage: `url(${imageTest})`,
  };

  // ? 변수로 받아오는 값은 css가 안걸림... 왜죠...?
  // ? line97은 왜 안걸릴까..?
  const Overflow = {
    overflow: `hidden`,
    textOverflow: `ellipsis`,
    // lineClamp: `2`,
    // ? CSSProperties 형식에서 에러뜸
    // ! webkt 프레임워크 사용해서 해결 가능 -> 사용할 것인가?
  };

  return (
    <div className="video">
      <figure className="thumnail" style={ThunmbnailImg}>
        <div className="hidden">
          <div className="lastview">a</div>
          <div className="addlist">b</div>
        </div>
        <div className="runtime">
          <div className="runtime-item">
            {(runtime - (runtime % 60)) / 60}:{runtime % 60}
          </div>
        </div>
      </figure>
      <div className="videoDesc">
        <div className="videoImg" style={ChannelImg}>
          {/* <img src={ChannelImg.backgroundImage} /> */}
        </div>
        <div className="videoContent">
          <div className="videoName">
            <p className="videoName-item" style={Overflow}>
              {thumbnail}
            </p>
          </div>
          <div className="videoChannel">
            <p className="videoChannel-item">{channel}</p>
          </div>
          {/* 여기를 어떻게 해야 되지,,? */}
          <CreateAt createAtDate={none} />
          {/* <p className="likesUpload" style={Overflow}>
            좋아요 {views} • {create_at}
          </p> */}
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
