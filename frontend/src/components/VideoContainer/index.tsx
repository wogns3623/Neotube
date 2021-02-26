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
    channel,
    title,
    video,
    thumbnail,
    runtime,
    views,
    create_at,
  } = videoData;

  // TODO hover: 하이퍼링크 + title + a태그말고 onClick으로하기 (comptlete)
  // TODO animation 한번에 글씨 써지게끔 만들기 overflow로 감싸기 (complete)
  // TODO addmenu- window위치에따라 어느 방향으로 뜰지(window기준), on: 스크롤이벤트x
  // TODO thumbnail, videoDesc을 나눠서 component만들기
  // TODO tooltip 만들기 (header-icon, videoview-channelname)
  return (
    <div className="video">
      <figure className="thumnail">
        <div className="hidden">
          <div className="lastview">
            <span className="lastview-item1">
              <div className="overlay1">나중에 볼 동영상</div>
            </span>
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
            <span className="addlist-item1">
              <div className="overlay2">목록에 추가</div>
            </span>
            <span className="addlist-item2">
              <svg
                viewBox="0 0 24 24"
                preserveAspectRatio="xMidYMid meet"
                focusable="false"
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
        {/* <a
          href={"https://www.google.com/"}
          className="videoImg"
          title={channel}
        /> */}
        <div
          className="videoImg"
          title={channel}
          onClick={() => (window.location.href = "https://www.google.com")}
        />
        <div className="videoContent">
          <div
            className="videoName"
            onClick={() => (window.location.href = "https://www.google.com/")}
          >
            <p className="videoName-item" title={title + thumbnail}>
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
            <DescIcon desc="동영상 업로드">
              <svg
              // viewBox="0 0 24 24"
              // preserveAspectRatio="xMidYMid meet"
              // focusable="false"
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
              // viewBox="0 0 24 24"
              // preserveAspectRatio="xMidYMid meet"
              // focusable="false"
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
