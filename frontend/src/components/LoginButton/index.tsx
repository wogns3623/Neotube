import React, { useContext } from "react";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";

import { UserContext } from "context";
import myFetch from "utils/myFetch";
import config from "config.json";

const LoginButton = () => {
  const { setToken } = useContext(UserContext);

  const onLogin = (
    googleUser: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if ((googleUser as GoogleLoginResponse).accessToken === undefined) {
      console.log("offline, code is ", googleUser.code);
    } else {
      googleUser = googleUser as GoogleLoginResponse;
      let profile = googleUser.getBasicProfile();

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
        body: data,
      })
        .then((res) => {
          setToken(res.parsedBody.token);
        })
        .catch((err) => {
          console.log("err in google login api", err);
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
