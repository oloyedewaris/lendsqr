import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/actions/authActions";
import { clearErrors } from "../../redux/actions/errorActions";

const RegisterUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("")
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
    if (error.id === "REGISTER_FAILED") {
      setMsg(error.msg);
    } else {
      setMsg(null)
    }
  }, [error]);

  const onNameChange = e => {
    setMsg(null)
    setName(e.target.value);
  };

  const onEmailChange = e => {
    setMsg(null)
    setEmail(e.target.value);
  };

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
      name,
      email,
      phone,
      password,
    };
    dispatch(register(newUser));
  }

  return (
    <div>
      {!redirect ? (
        <div className="container">
          <form className="form">
            <h1 className="card-head">Create a New Account</h1>
            {msg ? (
              <div className="error-msg">{msg}</div>
            ) : null}
            <input
              className="form-input"
              type="text"
              value={name}
              placeholder="Name"
              onChange={onNameChange}
            />
            <input
              className="form-input"
              type="email"
              value={email}
              placeholder="Email"
              onChange={onEmailChange}
            />
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
              REGISTER
            </button>
            <div className="submit-container">Login <Link to="/login"> Here</Link></div>
            <div>By joining, you agree to our Terms and Privacy</div>
          </form>
        </div>
      ) : (
        <div>{history.push("/home")}</div>
      )
      }
    </div >
  );
};

export default RegisterUser;
