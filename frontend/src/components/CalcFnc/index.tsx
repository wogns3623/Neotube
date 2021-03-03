import React, { useEffect, useState } from "react";
import "./CalcFnc.scss";

// TODO view, create_at component나누기 (complete)
// TODO useeffect사용(complete), 두개 같은 함수로 할 수 있게만들기
// TODO 커스텀hook사용

type CountProps = {
  watch_count: number;
};

const WatchCount = ({ watch_count }: CountProps) => {
  const [watchCount, setWatchCount] = useState(watch_count + "");

  useEffect(() => {
    if (watch_count < 1000) setWatchCount(`${watch_count}회`);
    else {
      if (watch_count < 10000)
        setWatchCount(`${(watch_count / 1000).toFixed(1)}천회`);
      else {
        if (watch_count < 100000)
          setWatchCount(`${(watch_count / 1000).toFixed(1)}만회`);
        else {
          if (watch_count < 100000000)
            setWatchCount(`${Math.floor(watch_count / 10000)}만회`);
          else {
            if (watch_count < 1000000000)
              setWatchCount(`${(watch_count / 100000000).toFixed(1)}억회`);
            else setWatchCount(`${Math.floor(watch_count / 100000000)}억회`);
          }
        }
      }
    }
  }, [watch_count]);

  return <span className="watchCount"> {watchCount} •</span>;
};

type CreateAtProps = {
  created_at: string;
};

const CreateAt = ({ created_at }: CreateAtProps) => {
  const [createdAt, setCreateAt] = useState(created_at + "");
  const toDay = new Date(),
    createDay = new Date(created_at);

  useEffect(() => {
    const diffSeconds = (toDay.getTime() - createDay.getTime()) / 1000;

    if (diffSeconds < 60 * 60)
      setCreateAt(`${Math.floor(diffSeconds / 60)}분 전`);
    else {
      if (diffSeconds < 60 * 60 * 24)
        setCreateAt(`${Math.floor(diffSeconds / (60 * 60))}시간 전`);
      else {
        if (diffSeconds < 60 * 60 * 24 * 7)
          setCreateAt(`${Math.floor(diffSeconds / (60 * 60 * 24))}일 전`);
        else {
          if (diffSeconds < 60 * 60 * 24 * 7 * 5)
            setCreateAt(`${Math.floor(diffSeconds / (60 * 60 * 24 * 7))}주 전`);
          // n*7일 <= n주전 < (n+1)*7일
          else {
            if (toDay.getFullYear() === createDay.getFullYear()) {
              setCreateAt(`${toDay.getMonth() - createDay.getMonth()}달 전`);
              // 그전 if문 에서 걸러져서 같은 달 없음
            } else if (toDay.getFullYear() - createDay.getFullYear() === 1) {
              setCreateAt(
                `${toDay.getMonth() + 12 - createDay.getMonth()}달 전`
              );
            } else
              setCreateAt(
                `${toDay.getFullYear() - createDay.getFullYear()}년 전`
              );
          }
        }
      }
    }
  }, []);

  return <span className="createAt">{createdAt}</span>;
};

export default CreateAt;
export { WatchCount };
