import React, { useContext } from "react";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";

import List from "components/List";
import Menu, { MenuButton } from "components/Menu";
import { Icon, DescIcon } from "components/Icon";
import { SideMenuHeader } from "components/SideMenu";
import SearchBar from "components/Header/SearchBar";
import config from "config.json";

import "./Header.scss";
import { UserContext } from "context";

// TODO: 다른곳에서도 구글 로그인 버튼이 필요할 수 있으니 따로 분리하기(ex: SideMenu)
const Header = () => {
  const user = useContext(UserContext);

  const onLogin = (
    googleUser: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if ((googleUser as GoogleLoginResponse).accessToken === undefined) {
      console.log("offline, code is ", googleUser.code);
    } else {
      googleUser = googleUser as GoogleLoginResponse;
      console.log(googleUser);
      let profile = googleUser.getBasicProfile();

      let username = profile.getName();
      let email = profile.getEmail();
      let id = profile.getId();
      let firstname = profile.getGivenName();
      let lastname = profile.getFamilyName();
      let image = profile.getImageUrl();

      let data = {
        username: username,
        email: email,
        id: id,
        first_name: firstname,
        last_name: lastname,
        image: image,
        provider: "google",
      };

      // 유저 생성 시도
      fetch(`${config.APIServer}/account/google/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((json) => {
          localStorage.setItem("neotube_token", json.token);
          if (json.username && json.token) {
            // 유저 생성 완료
          } else {
            // 이미 유저가 존재하면 로그인 시도
            fetch(`${config.APIServer}login/`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            })
              .then((res) => res.json())
              .then((json) => {
                if (json.user && json.user.username && json.token) {
                  // login success
                }
              });
          }
        });
    }
  };

  return (
    <header>
      <List className="menu-header">
        <SideMenuHeader className="left" />

        <List className="middle">
          <SearchBar />

          <Icon className="mic">
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
        </List>

        <List className="right">
          <Menu className="upload">
            <MenuButton>
              <Icon>
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
            </MenuButton>

            <DescIcon desc="동영상 업로드">
              <svg
                viewBox="0 0 24 24"
                preserveAspectRatio="xMidYMid meet"
                focusable="false"
                // style="pointer-events: none; display: block; width: 100%; height: 100%;"
              >
                <g>
                  <path
                    d="M19,4H5A2.15,2.15,0,0,0,3,6V18a2.15,2.15,0,0,0,2,2H19a2.15,2.15,0,0,0,2-2V6A2.15,2.15,0,0,0,19,4ZM5,18H19V6H5Z"
                    fill="#6f6f6f"
                    fillRule="evenodd"
                  ></path>
                  <path
                    d="M15,12,10,8v8Z"
                    fill="#f80000"
                    fillRule="evenodd"
                  ></path>
                </g>
              </svg>
            </DescIcon>
            <DescIcon desc="동영상 업로드">
              <svg
                viewBox="0 0 24 24"
                preserveAspectRatio="xMidYMid meet"
                focusable="false"
                // style="pointer-events: none; display: block; width: 100%; height: 100%;"
              >
                <g>
                  <path
                    d="M19,4H5A2.15,2.15,0,0,0,3,6V18a2.15,2.15,0,0,0,2,2H19a2.15,2.15,0,0,0,2-2V6A2.15,2.15,0,0,0,19,4ZM5,18H19V6H5Z"
                    fill="#6f6f6f"
                    fillRule="evenodd"
                  ></path>
                  <path
                    d="M15,12,10,8v8Z"
                    fill="#f80000"
                    fillRule="evenodd"
                  ></path>
                </g>
              </svg>
            </DescIcon>
          </Menu>

          <Icon className="notice">
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
            <GoogleLogin
              clientId={config.googleAPI.clientId}
              buttonText="login"
              onSuccess={onLogin}
              onFailure={(err) => console.log(err)}
              isSignedIn={true}
            />
          )}
        </List>
      </List>
    </header>
  );
};

export default Header;
