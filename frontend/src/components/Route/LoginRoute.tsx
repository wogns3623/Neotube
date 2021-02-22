// import React, { useState } from "react";
import { Route, RouteProps } from "react-router-dom";
// import { UserContext } from "context";

// TODO: 로그인이 필요한 페이지용 라우터 만들기
const LoginRoute = (props: RouteProps) => {
  console.log("login route debug======");
  console.log("token value is", localStorage.getItem("neotube_token"));
  console.log("=======================");

  return <Route {...props} />;
  // return (
  //   <UserContext.Provider
  //     value={{ token: token, setToken: setToken as () => void }}
  //   >
  //     <Route {...props}></Route>;
  //   </UserContext.Provider>
  // );
};

export default LoginRoute;
