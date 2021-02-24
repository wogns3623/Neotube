import React, { useContext } from "react";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";

import List from "components/List";
import Menu, { MenuButton } from "components/Menu";
import Icon, { DescIcon } from "components/Icon";
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
      fetch(`${config.APIServer}/accounts/google/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((json) => {
          localStorage.setItem("neotube_token", json.token);
          if (json.token) {
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
                if (json.token) {
                  // login success
                }
              });
          }
        });
    }
  };

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

          <Icon type="notice" />

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
