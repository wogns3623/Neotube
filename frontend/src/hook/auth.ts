import { useState, useEffect } from "react";
import { useGoogleLogout } from "react-google-login";
import config from "config.json";
import myFetch from "utils/myFetch";

export function useTokenAuth() {
  const [token, setToken] = useState(localStorage.getItem("neotube_token"));
  const [isAuthenticated, setIsAuthenticated] = useState(token ? true : false);
  const [profile, setProfile] = useState(null);

  const changeToken = (value?: string) => {
    if (value) {
      localStorage.setItem("neotube_token", value);
      setToken(value);
    } else {
      localStorage.removeItem("neotube_token");
      setToken(null);
    }
  };

  const { signOut } = useGoogleLogout({
    onFailure: () => console.log("google logout fail"),
    clientId: config.googleAPI.clientId,
    onLogoutSuccess: () => {
      console.log("google logout success");
      setIsAuthenticated(false);
      setProfile(null);
      changeToken();
    },
  });

  // 기본적으로 로그인되어있다고 가정하고 더미 컴포넌트를 띄움
  // 서버에 validate 요청을 보내 토큰을 검사하고, 만료되었거나 부적절하다면 비로그인 상태라고 인식함

  // * check token is valid and get user information
  // ? validation step is necessary?
  useEffect(() => {
    if (isAuthenticated) {
      let fetchInit = {
        method: "POST",
        body: {
          token: token,
        },
      };
      // validate token
      myFetch(`${config.APIServer}/accounts/validate/`, fetchInit)
        .then(() => {
          myFetch(`${config.APIServer}/accounts/current/`)
            .then((res) => {
              console.log("setting user profile to", res.parsedBody);
              setProfile(res.parsedBody);

              myFetch(`${config.APIServer}/accounts/refresh/`, fetchInit).then(
                (res) => {
                  let refreshedToken = res.parsedBody.token;
                  console.log("set token in refresh", refreshedToken);
                  changeToken(refreshedToken);
                }
              );
            })
            .catch((err) => {
              console.log("err in useTokenAuth current", err);
              signOut();
            });
        })
        .catch((err) => {
          console.log("err in useTokenAuth validate", err);
          signOut();
        });
    }
  }, [token, isAuthenticated, signOut]);

  return { token, profile };
}
