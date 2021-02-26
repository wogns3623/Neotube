import React, { useMemo, useState } from "react";
import List, { ListProps } from "components/List";

import { ClickableProps } from "types";
import "./Menu.scss";

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

const Menu = ({ className, children, direction }: ListProps) => {
  const menuButtonChild = children.find((child) => {
    return (child as JSX.Element).type.name === "MenuButton";
  });
  const [isOpen, setIsOpen] = useState(menuButtonChild ? false : true);

  const handleOpenMenu = (value: boolean) => {
    setIsOpen(value);
  };

  const renderedButton = useMemo(
    () =>
      React.cloneElement(menuButtonChild as React.ReactElement, {
        className: "react-menu-button",
        onClick: () => {
          setIsOpen((value) => !value);
        },
      }),
    [menuButtonChild]
  );

  const renderList = useMemo(
    () => (
      <List
        className={`react-menu-list${!isOpen ? " disable" : ""}`}
        direction={direction}
      >
        {children.filter((child) => {
          return (child as JSX.Element).type.name !== "MenuButton";
        })}
      </List>
    ),
    [direction, children, isOpen]
  );

  return (
    <div
      className={`react-menu ${className ? className : ""}`}
      onBlur={() => handleOpenMenu(false)}
    >
      {renderedButton}
      {renderList}
    </div>
  );
};
Menu.defaultProps = {
  direction: "column",
};

export default Menu;
export { MenuButton };
