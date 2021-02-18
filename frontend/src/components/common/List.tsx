import React from "react";

import "styles/List.scss";
import { MultipleWrapperProps } from "utils/types";

type ListProps = MultipleWrapperProps & {
  direction?: "row" | "column";
};
const List = ({ children, className, direction }: ListProps) => {
  children.forEach((child) => {
    console.log(
      "list " + className + "'s children\n",
      (child as JSX.Element).type.name
    );
  });

  return (
    <div
      className={`react-list react-list-${direction} ${
        className ? className : ""
      }`}
    >
      {children}
    </div>
  );
};
List.defaultProps = {
  direction: "row",
};

export type { ListProps };
export default List;
