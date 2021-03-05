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

  return (
    <header>
      <List className="list-header">
        <SideMenuHeader className="left" />

        <List className="middle responsive-search-invisible">
          <SearchBar />

          <Icon type="mic" />
        </List>

        <List className="right">
          <Icon type="mic" className="responsive-search-visible" />
          <Icon type="search" className="responsive-search-visible" />
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
            <Menu>
              <MenuButton>
                <Icon className="user">
                  <img
                    alt="아바타 이미지"
                    height="32"
                    width="32"
                    src={`${config.APIServer}/identicon/image/${user.profile.user_id}`}
                  />
                </Icon>
              </MenuButton>

              <DescIcon desc="동영상 업로드" type="upload" />
              <DescIcon desc="동영상 업로드" type="upload" />
              <DescIcon desc="동영상 업로드" type="upload" />
              <button
                onClick={() => {
                  console.log("sign out user", user);
                  user.signOut();
                }}
              >
                <DescIcon desc="로그아웃" type="logout" />
              </button>
            </Menu>
          ) : (
            <LoginButton />
          )}
        </List>
      </List>
    </header>
  );
};

export default Header;
