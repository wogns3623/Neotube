import React, { useMemo, useState } from "react";

import "./List.scss";
import { MultipleWrapperProps } from "types";
import { DescIcon } from "components/Icon";

type ListProps = MultipleWrapperProps & {
  direction?: "row" | "column";
  size?: number;
};
const List = ({ children, className, direction, size }: ListProps) => {
  const [hasShowMore] = useState(size);
  const [showMore, setShowMore] = useState(
    size ? children.length > size : false
  );
  // console.log(
  //   "size:",
  //   size,
  //   "\nchildren length:",
  //   children.length,
  //   "\nshowMore:",
  //   showMore
  // );

  const readmore = useMemo(() => {
    if (hasShowMore) {
      if (showMore) {
        return (
          <button
            onClick={() => {
              setShowMore(false);
            }}
          >
            <DescIcon type="arrowDown" desc="더보기" />
          </button>
        );
      } else {
        return (
          <button
            onClick={() => {
              setShowMore(true);
            }}
          >
            <DescIcon type="arrowUp" desc="간략히 보기" />
          </button>
        );
      }
    }
  }, [hasShowMore, showMore]);

  return (
    <div
      className={`react-list react-list-${direction} ${
        className ? className : ""
      }`}
    >
      {children.slice(0, showMore ? size : undefined)}
      {readmore}
    </div>
  );
};

List.defaultProps = {
  direction: "row",
};

export type { ListProps };
export default List;
