import React from "react";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";

import myFetch from "utils/myFetch";
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
      console.log(profile);

      let data = {
        username: profile.getName(),
        email: profile.getEmail(),
        id: profile.getId(),
        first_name: profile.getGivenName(),
        last_name: profile.getFamilyName(),
        image: profile.getImageUrl(),
      };

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
    />
  );
};

export default LoginButton;
