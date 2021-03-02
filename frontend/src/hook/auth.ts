import { useState, useEffect } from "react";
import { useGoogleLogout } from "react-google-login";
import config from "config.json";
import myFetch from "utils/myFetch";
import { addToken } from "utils/myFetch/middleware";

export function useTokenAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("neotube_token") ? true : false
  );
  const [userProfile, setUserProfile] = useState(undefined);

  const { signOut } = useGoogleLogout({
    onFailure: () => console.log("google logout fail"),
    clientId: config.googleAPI.clientId,
    onLogoutSuccess: () => {
      console.log("google logout success");
      setIsAuthenticated(false);
      setUserProfile(undefined);
      localStorage.removeItem("neotube_token");
    },
  });

  // 기본적으로 로그인되어있다고 가정하고 더미 컴포넌트를 띄움
  // 서버에 validate 요청을 보내 토큰을 검사하고, 만료되었거나 부적절하다면 비로그인 상태라고 인식함

  // * check token is valid and get user information
  // ? validation step is necessary?
  useEffect(() => {
    if (isAuthenticated) {
      // validate token
      myFetch(
        `${config.APIServer}/accounts/validate/`,
        { method: "POST" },
        { prefList: [addToken] }
      )
        .then(() => {
          myFetch(`${config.APIServer}/accounts/current/`)
            .then((res) => {
              console.log("setting user profile to", res.jsonBody);
              setUserProfile(res.jsonBody);
              myFetch(
                `${config.APIServer}/accounts/refresh/`,
                { method: "POST" },
                { prefList: [addToken] }
              ).then((res) => {
                console.log("set token in refresh", res.jsonBody.token);
                localStorage.setItem("neotube_token", res.jsonBody.token);
              });
            })
            .catch((err) => {
              console.log("err in useTokenAuth current", err);
              signOut();
            });
        })
        .catch((err) => {
          signOut();
        });
    }
  }, [isAuthenticated, signOut]);

  return { isAuthenticated, userProfile };
}
