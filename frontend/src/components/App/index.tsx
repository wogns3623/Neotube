import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";

// import LoginRoute from "components/Route/LoginRoute";
import Header from "components/Header";
import { Home } from "pages/index";
import { UserContext } from "context";
import { useTokenAuth } from "hook/auth";

import "./App.scss";

/* TODO: 로그인 & 토큰 관리를 하나의 후크로 분리하기
 * const {isAuthenticated, userProfile} = useAuth(googleLoginParams, googleLogoutParams, token)
 */
function App() {
  const user = useTokenAuth();

  return (
    <UserContext.Provider value={user}>
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
