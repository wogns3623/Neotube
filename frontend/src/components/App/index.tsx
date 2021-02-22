import React, { useState, useEffect } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { useGoogleLogout } from "react-google-login";

import config from "config.json";
// import LoginRoute from "components/Route/LoginRoute";
import { Home } from "pages/index";
import { UserContext } from "context";

import "./App.scss";
import Header from "components/Header";

/* TODO: 로그인 & 토큰 관리를 하나의 후크로 분리하기
 * const {isAuthenticated, userProfile} = useAuth(googleLoginParams, googleLogoutParams, token)
 */
function App() {
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
      fetch(`${config.APIServer}/validate/`, {
        headers: {
          Authorization: `JWT ${localStorage.getItem("neotube_token")}`,
        },
      })
        .then(() => {
          // token is valid
          // get current user information
          fetch(`${config.APIServer}/user/current/`, {
            headers: {
              Authorization: `JWT ${localStorage.getItem("neotube_token")}`,
            },
          })
            .then((res) => res.json())
            .then((json) => {
              setUserProfile(json.user);
              // refresh token
              fetch(`${config.APIServer}/refresh/`, {
                headers: {
                  Authorization: `JWT ${localStorage.getItem("neotube_token")}`,
                },
              })
                .then((res) => res.json())
                .then((json) => {
                  localStorage.setItem("neotube_token", json.token);
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
              signOut();
            });
        })
        .catch((err) => {
          // token is not valid
          console.log(err);
          signOut();
        });
    }
  }, [isAuthenticated, signOut]);

  return (
    <UserContext.Provider value={{ profile: userProfile }}>
      <div className="App">
        <Header />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
}

export default App;
