import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import LoginRoute from "components/common/LoginRoute";
import { Home } from "pages";

import "styles/App.scss";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <LoginRoute exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
