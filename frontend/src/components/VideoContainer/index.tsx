import React, { useEffect, useState } from "react";
import CreateAt, { WatchCount } from "./CalcFnc";
// import CreateAt from "./CreateAt";
import Icon, { DescIcon } from "components/Icon";
import "./VideoContainer.scss";
import Menu, { MenuButton } from "components/Menu";

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
    description,
    run_time,
    watch_count,
    created_at,
  } = videoData;

  // TODO hover: 하이퍼링크 + title + a태그만들기 ,  (comptlete)
  // TODO addmenu- window위치에따라 어느 방향으로 뜰지(window기준), on: 스크롤이벤트x
  // TODO thumb_nail, videoDesc을 나눠서 component만들기
  // TODO tooltip 만들기 (header-icon, videoview-uploadername)
  // TODO svg분리하기 (complete)
  // TODO menu 사용법 바뀐거대로 수정 (complete)
  // TODO 좀 더 간결하게 만들고 최대한 안 감싸게 만들기
  // TODO backgroundImage => img태그로 바꾸기 (?)

  return (
    <div className="video">
      <figure className="thumb_nail">
        <div className="hidden">
          <div className="lastview">
            <span className="lastview-item1">
              <div className="overlay1">나중에 볼 동영상</div>
            </span>
            <span className="lastview-item2">
              <Icon type="lastView" />
            </span>
          </div>
          <div className="addlist">
            <span className="addlist-item1">
              <div className="overlay2">목록에 추가</div>
            </span>
            <span className="addlist-item2">
              <Icon type="addList" />
            </span>
          </div>
        </div>
        <span className="run_time">
          <span className="run_time-item">
            {(run_time - (run_time % 60)) / 60}:{run_time % 60}
          </span>
        </span>
      </figure>

      <div className="videoDesc">
        <div className="videoImg" title={title} />
        <div className="videoContent">
          <div
            className="videoName"
            onClick={() => (window.location.href = "https://www.google.com/")}
          >
            <p className="videoName-item" title={title + thumb_nail}>
              {title} {thumb_nail}
            </p>
          </div>
          <div className="videouploader">
            <p className="videouploader-item">{uploader}</p>
          </div>
          <div className="viewDesc">
            <WatchCount watch_count={watch_count} />
            <CreateAt created_at={created_at} />
          </div>
        </div>
        <div className="hiddenAdd">
          <Menu className="add">
            <MenuButton>
              <Icon type="hiddenMenu" />
            </MenuButton>
            <DescIcon desc="동영상 업로드" type="upload" />
            <DescIcon desc="동영상 업로드" type="upload" />
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
