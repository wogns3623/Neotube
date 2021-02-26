import React, { useContext } from "react";

import List from "components/List";
import Menu, { MenuButton } from "components/Menu";
import Icon, { DescIcon } from "components/Icon";
import { SideMenuHeader } from "components/SideMenu";
import SearchBar from "components/Header/SearchBar";
import LoginButton from "components/LoginButton";
import { UserContext } from "context";

import "./Header.scss";

// TODO: 다른곳에서도 구글 로그인 버튼이 필요할 수 있으니 따로 분리하기(ex: SideMenu)
const Header = () => {
  const user = useContext(UserContext);

  return (
    <header>
      <List className="list-header">
        <SideMenuHeader className="left" />

        <List className="middle">
          <SearchBar />

          <Icon type="mic" />
        </List>

        <List className="right">
          <Menu className="menu-upload">
            <MenuButton>
              <Icon type="make" />
            </MenuButton>

            <DescIcon desc="동영상 업로드" type="upload" />
            <DescIcon desc="동영상 업로드" type="upload" />
          </Menu>

          <Menu className="menu-notice">
            <MenuButton>
              <Icon type="notice" />
            </MenuButton>

            <DescIcon desc="동영상 업로드" type="upload" />
            <DescIcon desc="동영상 업로드" type="upload" />
          </Menu>

          {user.profile ? (
            <Icon className="user">
              <img
                alt="아바타 이미지"
                height="32"
                width="32"
                src={user.profile.image as string}
              />
            </Icon>
          ) : (
            <LoginButton />
          )}
        </List>
      </List>
    </header>
  );
};

export default Header;
