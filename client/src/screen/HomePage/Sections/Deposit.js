import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { tokenConfig, saveUser } from "../../../redux/actions/authActions";
import axios from "axios";

function Deposit() {
  const [amount, setAmount] = useState("");
  const [details, setDetails] = useState("");
  const [msg, setMsg] = useState(null);
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth);
  const history = useHistory();

  const onAmountChange = e => {
    setMsg(null)
    setAmount(e.target.value);
  };

  const onDetailsChange = e => {
    setMsg(null)
    setDetails(e.target.value);
  };

  const onFormSubmit = e => {
    e.preventDefault();
    const data = {
      userId: auth.user._id,
      amount,
      details,
    };
    axios
      .post(`/api/transaction/deposit`, data, tokenConfig)
      .then(res => {
        if (res.data.success) {
          setAmount("")
          setDetails("")
          dispatch(saveUser(res.data.user))
          setMsg("Successful")
          setTimeout(() => {
            history.push("/home")
          }, 2000);
        }
      }).catch(err => setMsg(err.response.data.msg))
  }

  return (
    <div>
      <div className="container">
        <form className="form">
          <h1 className="card-head">Deposit</h1>
          {msg ? (
            <div className="error-msg">{msg}</div>
          ) : null}
          <input
            className="form-input"
            type="number"
            value={amount}
            placeholder="Amount to deposit (N)"
            onChange={onAmountChange}
          />
          <input
            className="form-input"
            type="text"
            value={details}
            placeholder="Details"
            onChange={onDetailsChange}
          />
          <button onClick={onFormSubmit} className="form-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Deposit;