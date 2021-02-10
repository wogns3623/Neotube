import React from "react";
import Menu from "components/Menu";
import SearchBar from "components/Header/SearchBar";
import { SideMenuHeader } from "components/SideMenu";
import Icon from "components/Icon";

import "styles/Header.scss";

type UserInfo = {
  username: string | null;
  img: string | null;
};

interface HeaderProps {
  userInfo: UserInfo;
}

const Header = (props: HeaderProps) => {
  return (
    <header>
      <Menu className="menu-header">
        <SideMenuHeader />

        <Menu id="middle">
          <SearchBar />

          <Icon className="Icon-mic">
            <svg
              viewBox="0 0 24 24"
              preserveAspectRatio="xMidYMid meet"
              focusable="false"
            >
              <g>
                <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"></path>
              </g>
            </svg>
          </Icon>
        </Menu>

        <Menu id="right">
          <Icon className="Icon-upload">
            <svg
              viewBox="0 0 24 24"
              preserveAspectRatio="xMidYMid meet"
              focusable="false"
            >
              <g>
                <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4zM14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2z"></path>
              </g>
            </svg>
          </Icon>

          <Icon className="Icon-notice">
            <svg
              viewBox="0 0 24 24"
              preserveAspectRatio="xMidYMid meet"
              focusable="false"
            >
              <g>
                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"></path>
              </g>
            </svg>
          </Icon>

          {props.userInfo.username !== null ? (
            <Icon className="Icon-user">
              <img
                alt="아바타 이미지"
                height="32"
                width="32"
                src={props.userInfo.img as string}
              />
            </Icon>
          ) : (
            <a href="http://www.neotubei.kro.kr/accounts/google/login/">
              로그인
            </a>
          )}
        </Menu>
      </Menu>
    </header>
  );
};

export default Header;
