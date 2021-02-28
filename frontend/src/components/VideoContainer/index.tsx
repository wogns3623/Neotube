import React, { useEffect, useState } from "react";
import VideoDesc from "components/VideoBox/VideoDesc";
import ThumbNail from "components/VideoBox/ThumbNail";
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

type VideoBoxProps = {
  videoData: VideoData;
};

// TODO thumb_nail, videoDesc을 나눠서 component만들기 (complete)
// TODO tooltip 만들기 (header-icon, videoview-uploadername)
// TODO svg분리하기 (complete)
// TODO menu 사용법 바뀐거대로 수정 (complete)
// TODO 좀 더 간결하게 만들고 최대한 안 감싸게 만들기
// TODO backgroundImage => img태그로 바꾸기 (?)

const VideoBox = ({ videoData }: VideoBoxProps) => {
  const {
    video,
    thumb_nail,
    description,
    run_time,
    title,
    channel,
    watch_count,
    created_at,
  } = videoData;

  return (
    <div className="video">
      <ThumbNail thumb_nail={thumb_nail} video={video} run_time={run_time} />

      <VideoDesc
        title={title}
        description={description}
        channel={channel}
        watch_count={watch_count}
        created_at={created_at}
      />
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
