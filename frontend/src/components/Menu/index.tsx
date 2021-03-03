import React, { useMemo, useState } from "react";
import List, { ListProps } from "components/List";

import { ClickableProps } from "types";
import "./Menu.scss";

// TODO addmenu- window위치에따라 어느 방향으로 뜰지(window기준), on: 스크롤이벤트x
const MenuButton = ({ className, children, onClick }: ClickableProps) => {
  return (
    <div className={`react-menu-button ${className ? className : ""}`}>
      <button type="button" onClick={onClick}>
        {children}
      </button>
    </div>
  );
};
MenuButton.defaultProps = {
  onClick: (e: React.MouseEvent<any, MouseEvent>) => {},
};

type DirectionEnum = "up" | "down" | "left" | "right";

type MenuProps = ListProps & {
  alwaysOpen?: boolean;
};

const Menu = ({ className, children, direction, alwaysOpen }: MenuProps) => {
  const menuButtonChild = children.find((child) => {
    return (child as JSX.Element).type.name === "MenuButton";
  });
  const [isOpen, setIsOpen] = useState(menuButtonChild ? false : true);
  const [openDirection] = useState(["down", "left"] as DirectionEnum[]);

  const handleOpenMenu = (value: boolean) => {
    setIsOpen(value);
  };

  const renderedButton = useMemo(() => {
    if (menuButtonChild) {
      return React.cloneElement(menuButtonChild as React.ReactElement, {
        className: "react-menu-button",
        onClick: () => {
          setIsOpen((value) => !value);
        },
      });
    } else {
      return undefined;
    }
  }, [menuButtonChild]);

  const renderedList = useMemo(() => {
    let listChildren = children.filter((child) => {
      return (child as JSX.Element).type.name !== "MenuButton";
    });

    return (
      <List
        className={`react-menu-list ${
          alwaysOpen && isOpen ? "" : "disable"
        } ${openDirection.map((value) => "direction-" + value).join(" ")}`}
        direction={direction}
      >
        {listChildren}
      </List>
    );
  }, [direction, children, alwaysOpen, isOpen, openDirection]);

  // TODO: scroll막는 이벤트 등록하기

  return (
    <div
      className={`react-menu ${className ? className : ""}`}
      onBlur={() => handleOpenMenu(false)}
    >
      {renderedButton}
      {renderedList}
    </div>
  );
};
Menu.defaultProps = {
  direction: "column",
  alwaysOpen: "false",
};

export default Menu;
export { MenuButton };
