import React from 'react'
import { useSelector } from "react-redux"

function Profile() {
  const user = useSelector(state => state.auth.user)

  return (
    <div>
      <div className="container">
        <div className="form">
          <h1 className="card-head">My Profile</h1>
          <p>Name: {user.name}</p>
          <p>Phone: {user.phone}</p>
          <p>Email: {user.email}</p>
          <p>Balance: N{user.balance}</p>
        </div>
      </div>
    </div>
  )
}

export default Profile
