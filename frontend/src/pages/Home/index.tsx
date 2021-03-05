import React, { useState, useEffect } from "react";
import { SideMenu } from "components/SideMenu";
import VideoContainer, { VideoData } from "components/VideoContainer";
import myFetch from "utils/myFetch";
import config from "config.json";
import "./Home.scss";

const Home = () => {
  const [videoList, setVideoList] = useState<VideoData[]>([]);

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
