import React from "react";
import Icon from "components/Icon";
import "./ThumbNail.scss";
import config from "config.json";

type ThumbNailProps = {
  thumb_nail: string;
  video: String;
  run_time: number;
};

const ThumbNail = ({ thumb_nail, video, run_time }: ThumbNailProps) => {
  return (
    <a href=" " className="thumb_nail">
      <img src={`${config.APIServer}${thumb_nail}`} alt="썸네일" />
      <div className="hidden">
        <div className="lastview">
          <span className="lastview-item1">
            <div className="overlay1">나중에 볼 동영상</div>
          </span>
          <Icon className="lastview-item2" type="lastView" />
        </div>

        <div className="addlist">
          <span className="addlist-item1">
            <div className="overlay2">목록에 추가</div>
          </span>
          <Icon className="addlist-item2" type="addList" />
        </div>
      </div>

      <span className="run_time">
        {(run_time - (run_time % 60)) / 60}:{run_time % 60}
      </span>
    </a>
  );
};

export default ThumbNail;
