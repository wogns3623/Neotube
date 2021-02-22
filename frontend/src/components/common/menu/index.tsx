import React, { useState } from "react";
import List, { ListProps } from "components/common/List";

import "styles/Menu.scss";
import { ClickableProps } from "utils/types";

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

  const renderMenuButton = (
    <MenuButton
      className="react-menu-button"
      onClick={() => {
        handleOpenMenu(!isOpen);
      }}
    >
      {menuButtonChild}
    </MenuButton>
  );

  return (
    <div
      className={`react-menu ${className ? className : ""}`}
      onBlur={() => {
        handleOpenMenu(false);
      }}
    >
      {renderMenuButton}
      <List
        className={`react-menu-list${isOpen ? " visible" : ""}`}
        direction={direction}
      >
        {children}
      </List>
    </div>
  );
};

export default Menu;
export { MenuButton };
