import React from 'react'
import { Link } from "react-router-dom"
import "./LandingPage.css"

const LandingPage = () => {
  return (
    <div className="container">
      <h1>Lendsqr</h1>
      <div className="button-container">
        <Link to="/register">
          <button className="landing-button">SIGN UP</button>
        </Link>
        <Link to="/login">
          <button className="landing-button" >SIGN IN</button>
        </Link>
      </div>
    </div>
  )
}

export default LandingPage
