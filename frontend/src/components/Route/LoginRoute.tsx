// import React, { useState } from "react";
import { UserContext } from "context";
import { useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
// import { UserContext } from "context";

// TODO: 로그인이 필요한 페이지용 라우터 만들기
const LoginRoute = (props: RouteProps) => {
  const userProfile = useContext(UserContext);
  console.log("login route debug======");
  console.log("token value is", localStorage.getItem("neotube_token"));
  console.log("=======================");

  if (userProfile) {
    return <Route {...props} />;
  } else {
    return <Redirect to="/" />;
  }
};

export default LoginRoute;
