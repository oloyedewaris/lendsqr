import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../redux/actions/authActions"

const Main = (props) => {
  const user = useSelector(state => state.auth.user);
  const isAuth = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  return (
    <>
      <div className="nav-container">
        <div className="nav-icon-container" onClick={props.toggle}>
          <div
            className="nav-icon"
            style={{ width: "22px", background: "black" }}
          />
          <div
            className="nav-icon"
            style={{ width: "22px", background: "black" }}
          />
          <div
            className="nav-icon"
            style={{ width: "15px", background: "black" }}
          />
        </div>
        <div className="nav-header"><Link to="/" style={{ color: "black" }}>Lendsqr</Link></div>
      </div>
      <div className="full-nav-container">
        <div className="nav-left">
          <Link to="/"><div className="nav-head">Lendsqr</div></Link>
          {isAuth && <>
            <Link to="/home"><div className="nav-item">Home</div></Link>
            <Link to="/profile"><div className="nav-item">Profile</div></Link>
            <Link to="/transactions"><div className="nav-item">Transactions</div></Link>
          </>}
        </div>
        {isAuth ?
          <div className="nav-right">
            {user && <div className="nav-item">Balance: N{user.balance}</div>}
            <Link to="/login" onClick={() => { dispatch(logout()) }} className="nav-item">Sign Out</Link>
          </div> :
          <div className="nav-right">
            <Link to="/login"><div className="nav-item">Sign In</div></Link>
            <Link to="/register"><div className="nav-item">Sign Up</div></Link>
          </div>}
      </div>
    </>
  );
};

export default Main;
