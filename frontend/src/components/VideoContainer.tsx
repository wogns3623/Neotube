import React, { useEffect, useState } from "react";
import "styles/VideoContainer.scss";
import CreateAt from "./CreateAt";
import { DescIcon, Icon } from "components/common/Icon";
import Menu from "./common/menu";
// require() 안됨.

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

  // TODO mouseOn- (desc):on
  // TODO animation 한번에 글씨 써지게끔 만들기
  // TODO 돋보기 on/off
  // TODO addmenu- window위치에따라 어느 방향으로 뜰지
  return (
    <div className="video">
      <figure className="thumnail">
        <div className="hidden">
          <div className="lastview">
            <span className="lastview-item1">나중에 볼 동영상</span>
            <span className="lastview-item2">
              <svg
                viewBox="0 0 24 24"
                preserveAspectRatio="xMidYMid meet"
                focusable="false"
              >
                <g>
                  <path d="M12 3.67c-4.58 0-8.33 3.75-8.33 8.33s3.75 8.33 8.33 8.33 8.33-3.75 8.33-8.33S16.58 3.67 12 3.67zm3.5 11.83l-4.33-2.67v-5h1.25v4.34l3.75 2.25-.67 1.08z"></path>
                </g>
              </svg>
            </span>
          </div>
          <div className="addlist">
            <span className="addlist-item1">목록에 추가</span>
            <span className="addlist-item2">
              <svg
                viewBox="0 0 24 24"
                // preserveAspectRatio="xMidYMid meet"
                // focusable="false"
              >
                <g>
                  <path d="M9,10 L18,10 L18,12 L9,12 L9,10 Z M6,6 L18,6 L18,8 L6,8 L6,6 Z M12,14 L18,14 L18,16 L12,16 L12,14 Z M6,12 L6,18 L10,15 L6,12 Z"></path>
                </g>
              </svg>
            </span>
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
          {/* <div className="Add">⁝</div> */}
          <Menu
            className="add"
            menuButton={
              <svg
                viewBox="0 0 24 24"
                preserveAspectRatio="xMidYMid meet"
                focusable="false"
              >
                <g>
                  <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
                </g>
              </svg>
            }
          >
            <Icon>
              <svg
                viewBox="0 0 24 24"
                preserveAspectRatio="xMidYMid meet"
                focusable="false"
              >
                <g>
                  <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4zM14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2z"></path>
                </g>
              </svg>
            </Icon>
            <DescIcon desc="동영상 업로드">
              <svg
                viewBox="0 0 24 24"
                preserveAspectRatio="xMidYMid meet"
                focusable="false"
                // style="pointer-events: none; display: block; width: 100%; height: 100%;"
              >
                <g>
                  <path
                    d="M19,4H5A2.15,2.15,0,0,0,3,6V18a2.15,2.15,0,0,0,2,2H19a2.15,2.15,0,0,0,2-2V6A2.15,2.15,0,0,0,19,4ZM5,18H19V6H5Z"
                    fill="#6f6f6f"
                    fillRule="evenodd"
                  ></path>
                  <path
                    d="M15,12,10,8v8Z"
                    fill="#f80000"
                    fillRule="evenodd"
                  ></path>
                </g>
              </svg>
            </DescIcon>
            <DescIcon desc="동영상 업로드">
              <svg
                viewBox="0 0 24 24"
                preserveAspectRatio="xMidYMid meet"
                focusable="false"
                // style="pointer-events: none; display: block; width: 100%; height: 100%;"
              >
                <g>
                  <path
                    d="M19,4H5A2.15,2.15,0,0,0,3,6V18a2.15,2.15,0,0,0,2,2H19a2.15,2.15,0,0,0,2-2V6A2.15,2.15,0,0,0,19,4ZM5,18H19V6H5Z"
                    fill="#6f6f6f"
                    fillRule="evenodd"
                  ></path>
                  <path
                    d="M15,12,10,8v8Z"
                    fill="#f80000"
                    fillRule="evenodd"
                  ></path>
                </g>
              </svg>
            </DescIcon>
          </Menu>
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
