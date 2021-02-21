import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "components/Header";
import { SideMenu } from "components/SideMenu";
import VideoContainer, { VideoData } from "components/VideoContainer";
import "styles/App.scss";

function App() {
  const [guide, setGuide] = useState({
    video: [] as VideoData[],
    user: undefined,
  });

  useEffect(() => {
    // load video after mount
    let tempData = {
      video: [
        {
          channel: "junsu",
          title: "[상여자] 라이벌",
          video: "video/2021/10/02/05/21/상여자_라이벌.mp4",
          thumbnail: "thumbnail/2021/10/02/05/21/fiveDice.png",
          runtime: 192,
          views: 1,
          create_at: "2021년 2월 5일 1:10 오전",
        },
      ],
      user: undefined,
    };
    setGuide(tempData);

    // axios.get("http://www.neotubei.kro.kr/neotubei/v1/guide/").then((res) => {
    //   console.log(res.data);
    //   setGuide(res.data);
    // });
  }, []);

  return (
    <div className="App">
      <Header userInfo={guide.user} />
      <main>
        <SideMenu />
        <VideoContainer videoList={guide.video} />
      </main>
      <nav className="overlay"></nav>
    </div>
  );
}

export default App;
