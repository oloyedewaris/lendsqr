import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/authActions";
import { clearErrors } from "../../redux/actions/errorActions";

const LoginUser = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const [redirect, setRedirect] = useState(null);

  const dispatch = useDispatch();

  const auth = useSelector(state => state.auth);
  const error = useSelector(state => state.error);

  const history = useHistory();

  useEffect(() => {
    return () => {
      dispatch(clearErrors);
    }
  }, []);

  useEffect(() => {
    if (auth.isAuthenticated) {
      setRedirect("home");
    }
  }, [auth]);

  useEffect(() => {
    if (error.id === "LOGIN_FAILED") {
      setMsg(error.msg);
    } else {
      setMsg(null)
    }
  }, [error]);

  const onPhoneChange = e => {
    setMsg(null)
    setPhone(e.target.value);
  };

  const onPasswordChange = e => {
    setMsg(null)
    setPassword(e.target.value);
  };

  const onFormSubmit = e => {
    e.preventDefault();
    const newUser = {
      phone,
      password,
    };
    dispatch(login(newUser));
  }

  return (
    <div>
      {!redirect ? (
        <div className="container">
          <form className="form">
            <h1 className="card-head">Login Here</h1>
            {msg ? (
              <div className="error-msg">{msg}</div>
            ) : null}
            <input
              className="form-input"
              type="number"
              value={phone}
              placeholder="Phone"
              onChange={onPhoneChange}
            />
            <input
              className="form-input"
              type="password"
              value={password}
              placeholder="Password"
              onChange={onPasswordChange}
            />
            <button onClick={onFormSubmit} className="form-button">
              LOG IN
            </button>
            <div className="submit-container">Register <Link to="/register"> Here</Link>
            </div>
            <Link to="/">Forgot Password?</Link>
          </form>
        </div>
      ) : (
        <div>{history.push("/home")}</div>
      )}
    </div>
  );
};

export default LoginUser;
