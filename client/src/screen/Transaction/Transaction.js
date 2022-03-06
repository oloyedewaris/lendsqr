import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import axios from "axios";
import "./Transaction.css";

function Transaction() {
  const [transactions, setTransactions] = useState([])
  const user = useSelector(state => state.auth.user)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios.get(`/api/transaction/get_transactions/${user._id}`)
      .then(res => {
        setTransactions(res.data.transaction)
        setLoading(false)
      })
      .catch(err => alert("Can't get transactions"))
  }, [])

  return (
    <div className="home-main">
      <h1>All Transactions</h1>
      {loading ? <h1 style={{ textAlign: "center", }} >Loading...</h1> : null}
      {transactions.map((trans, i) => (
        <div className="trans-container">
          <div className="trans-card">
            <h1 className="card-head">{trans.type}</h1>
            <h4>Amount: {trans.amount}</h4>
            <h4>Details: {trans.details}</h4>
            {trans.service && <h4>Service type: {trans.service}</h4>}
            <h4>Perform on: {trans.performedAt}</h4>
          </div>
        </div>
      ))}
      {transactions.length < 1 && <p>No transactions yet</p>}
    </div>
  )
}

export default Transaction
