import React from "react";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";

import config from "config.json";
import myFetch from "utils/myFetch";
import { parseBody } from "utils/myFetchMiddleware";

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
      };

      // 유저 생성 시도
      // fetch(`${config.APIServer}/accounts/login/google/`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(data),
      // })
      //   .then((res) => res.json())
      //   .then((json) => {
      //     localStorage.setItem("neotube_token", json.token);
      //   });

      myFetch(`${config.APIServer}/accounts/login/google/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => {
        localStorage.setItem("neotube_token", res.jsonBody.token);
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
