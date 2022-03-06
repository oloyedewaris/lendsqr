import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom"

function Auth(Component) {
  const AuthCheck = () => {
    const history = useHistory();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    if (isAuthenticated) {
      return <Component />;
    } else {
      return <div>{history.push("/login")}</div>;
    }
  };
  return AuthCheck;
}

export default Auth;
