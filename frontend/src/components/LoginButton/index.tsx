import React from "react";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";

import config from "config.json";

const LoginButton = () => {
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
    <GoogleLogin
      clientId={config.googleAPI.clientId}
      buttonText="login"
      onSuccess={onLogin}
      onFailure={(err) => console.log(err)}
      isSignedIn={true}
    />
  );
};

export default LoginButton;
