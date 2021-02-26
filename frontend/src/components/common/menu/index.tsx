import React, { useState } from "react";
import List, { ListProps } from "components/common/List";

import "styles/Menu.scss";
import ButtonIcon from "components/common/Icon/ButtonIcon";
import { ClickableProps } from "utils/types";

const MenuButton = ({ className, children }: ClickableProps) => {
  return (
    <div className={`react-menu-button ${className ? className : ""}`}>
      {children}
    </div>
  );
};

type MenuProps = ListProps & {
  menuButton: React.ReactNode;
};

// TODO 메뉴창 뜨면 스크롤 정지
const Menu = ({ className, children, direction, menuButton }: MenuProps) => {
  const [isOpen, setIsOpen] = useState(menuButton ? false : true);

  const handleOpenMenu = (value: boolean) => {
    setIsOpen(value);
  };

  return (
    <div
      className={`react-menu ${className ? className : ""}`}
      onBlur={() => {
        handleOpenMenu(false);
      }}
    >
      <ButtonIcon
        className="react-menu-button"
        onClick={() => {
          handleOpenMenu(!isOpen);
        }}
      >
        {menuButton}
      </ButtonIcon>
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
