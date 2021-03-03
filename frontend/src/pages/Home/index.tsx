import React, { useState, useEffect } from "react";
import { SideMenu } from "components/SideMenu";
import VideoContainer, { VideoData } from "components/VideoContainer";
import myFetch from "utils/myFetch";
import config from "config.json";
import "./Home.scss";

let tempData = [
  {
    uploader: 1,
    title: "[상여자] 라이벌",
    thumb_nail:
      "/media/thumbnail/2021/15/02/16/21/%EB%9D%BC%EC%9D%B4%EB%B2%8C.jpg",
    video:
      "/media/video/2021/15/02/16/21/%EC%83%81%EC%97%AC%EC%9E%90_%EB%9D%BC%EC%9D%B4%EB%B2%8C.mp4",
    description:
      "이 만화는 무료로 웃겨줍니다!\r\n\r\n[배급 : 빅픽처팀] [기획 : 비크리스피] [제작 : 짤태식 스튜디오]\r\n각본 - 이수빈 / 작화 - 이수빈 / 도움 - 황현식, 안송주, 장다현, 김주은, 이유진, 최지영, 황태훈 / 성우 - 짤태식, 성현희, 이수빈",
    run_time: 278,
    channel: "채널이름",
    watch_count: 1255027,
    created_at: "2021-02-16T02:15:59.959096+09:00",
  },
];

const Home = () => {
  const [videoList, setVideoList] = useState(tempData as VideoData[]);

  // load guide data after mount
  useEffect(() => {
    myFetch(`${config.APIServer}/guide/`)
      .then((res) => {
        if (!res.parsedBody.detail) {
          setVideoList(res.parsedBody);
        } else {
          console.log("error occured!", res.parsedBody.detail);
        }
      })
      .catch((err) => {
        console.log("err in guide api", err);
      });
  }, []);

  return (
    <main className="Home">
      <SideMenu />
      <VideoContainer videoList={videoList} />
    </main>
  );
};

export default Home;
