import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import LoginRoute from "components/Route/LoginRoute";
import { Home } from "Domain";

import "./App.scss";

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
