import React from "react";
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../../redux/actions/authActions";

const SlideDrawer = (props) => {
  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.auth.isAuthenticated)

  let drawerClasses = "side-drawer";
  if (props.show) {
    drawerClasses = "side-drawer open";
  }

  return (
    <div className={drawerClasses}>
      <div className="drawer">
        <div className="closer" onClick={props.close} >&#x2715;</div>
        <div className="options">
          <div onClick={props.close}>
            <Link style={{ color: "black" }} to="/home">Home</Link>
          </div>
          <div onClick={props.close}>
            <Link style={{ color: "black" }} to="/profile">Profile</Link>
          </div>
          <div onClick={props.close}>
            <Link style={{ color: "black" }} to="/transactions">Transactions</Link>
          </div>
        </div>
        {isAuth ?
          <div onClick={() => { dispatch(logout()); props.close(); }} className="last-option">
            <Link style={{ color: "red" }} to="/login">Sign Out</Link>
          </div> :
          <div onClick={props.close} className="last-option">
            <div><Link to="/login">Sign In</Link></div>
            <div><Link to="/register">Sign Up</Link></div>
          </div>}
      </div>
    </div>
  );
};

export default SlideDrawer;
