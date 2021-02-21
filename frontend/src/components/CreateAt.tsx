import React from "react";
// import "styles/Crate-at.scss";

type CreateAtProps = {
  views: number;
  create_at: string;
};

const CreateAt = ({ views, create_at }: CreateAtProps) => {
  function dateDiff(date1: Date, date2: Date) {
    const diffSeconds = (date1.getTime() - date2.getTime()) / 1000;
    // 시간차이 초단위

    if (diffSeconds < 60 * 60) return `${diffSeconds / 60}분 전`;
    else {
      if (diffSeconds < 60 * 60 * 24)
        return `${Math.floor(diffSeconds / (60 * 60))}시간 전`;
      else {
        if (diffSeconds < 60 * 60 * 24 * 7)
          return `${Math.floor(diffSeconds / (60 * 60 * 24))}일 전`;
        else {
          if (diffSeconds < 60 * 60 * 24 * 7 * 5)
            return `${Math.floor(diffSeconds / (60 * 60 * 24 * 7))}주 전`;
          // n*7일 <= n주전 < (n+1)*7일
          else {
            if (date1.getFullYear() === date2.getFullYear()) {
              return `${date1.getMonth() - date2.getMonth()}달 전`;
              // 그전 if문 에서 걸러져서 같은 달 없음
            } else if (date1.getFullYear() - date2.getFullYear() === 1) {
              return `${date1.getMonth() + 12 - date2.getMonth()}달 전`;
            } else return `${date1.getFullYear() - date2.getFullYear()}년 전`;
          }
        }
      }
    }
  }

  const at = dateDiff(new Date(), new Date(create_at));

  return (
    <p className="likesUpload">
      좋아요 {views} • {at}
    </p>
  );
};

export default CreateAt;
