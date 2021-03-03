import React, { useContext } from "react";

import List from "components/List";
import Menu, { MenuButton } from "components/Menu";
import Icon, { DescIcon } from "components/Icon";
import { SideMenuHeader } from "components/SideMenu";
import SearchBar from "components/Header/SearchBar";
import LoginButton from "components/LoginButton";
import { UserContext } from "context";
import config from "config.json";

import "./Header.scss";

const Header = () => {
  const user = useContext(UserContext);
  console.log("in header, user info is", user);

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
                src={`${config.APIServer}/identicon/image/${user.profile.user_id}`}
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
