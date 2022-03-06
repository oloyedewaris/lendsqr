import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { tokenConfig, saveUser } from "../../../redux/actions/authActions";
import axios from "axios";

function Transfer() {
  //{ userId, phone, details, amount }
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  const [details, setDetails] = useState("");
  const [msg, setMsg] = useState(null);
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch()
  const history = useHistory();

  const onAmountChange = e => {
    setMsg(null)
    setAmount(e.target.value);
  };

  const onPhoneChange = e => {
    setMsg(null)
    setPhone(e.target.value);
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
      phone,
      details,
    };
    axios
      .post(`/api/transaction/transfer`, data, tokenConfig)
      .then(res => {
        if (res.data.success) {
          setAmount("")
          setDetails("")
          setPhone("")
          dispatch(saveUser(res.data.sender))
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
          <h1 className="card-head">Transfer Funds</h1>
          {msg ? (
            <div className="error-msg">{msg}</div>
          ) : null}
          <input
            className="form-input"
            type="number"
            value={amount}
            placeholder="Amount to transfer (N)"
            onChange={onAmountChange}
          />
          <input
            className="form-input"
            type="number"
            value={phone}
            placeholder="Receiver's Phone"
            onChange={onPhoneChange}
          />
          <input
            className="form-input"
            type="text"
            value={details}
            placeholder="Enter details"
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

export default Transfer;