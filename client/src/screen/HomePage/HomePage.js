import React from 'react';
import { SendOutlined, MobileOutlined, SwapOutlined, PayCircleOutlined, UserOutlined, PlusOutlined, MoneyCollectOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"
import "./HomePage.css";

const HomePage = () => {
  const user = useSelector(state => state.auth.user)

  return (
    <div className="home-main">
      <div className="home-container">
        <h1 className="home-h1">Home</h1>
        <div className="balance">Balance: N{user.balance}</div>
        <div className="payment">
          <div><Link style={{ color: "white" }} to="deposit">
            <PlusOutlined /> Deposit
          </Link>
          </div>
          <div><Link style={{ color: "white" }} to="withdraw">
            <MoneyCollectOutlined /> Withdraw
          </Link>
          </div>
        </div>
        <h1 className="services">Services</h1>
        <div className="flex-container">
          <div className="flex-row">
            <div style={{ backgroundColor: "purple" }} className="flex-item">
              <Link style={{ color: "white" }} to="/transfer">
                <SendOutlined style={{ fontSize: "2rem" }} />
                <div>Transfer</div>
              </Link>
            </div>
            <div style={{ backgroundColor: "orange" }} className="flex-item">
              <Link style={{ color: "white" }} to="/service/pay_bill">
                <PayCircleOutlined style={{ fontSize: "2rem" }} />
                <div>Pay Bill</div>
              </Link>
            </div>
            <div style={{ backgroundColor: "red" }} className="flex-item">
              <Link style={{ color: "white" }} to="/service/buy_airtime">
                <MobileOutlined style={{ fontSize: "2rem" }} />
                <div>Top up Airtime</div>
              </Link>
            </div>
          </div>
          <div className="flex-row">
            <div style={{ backgroundColor: "green" }} className="flex-item">
              <Link style={{ color: "white" }} to="/service/buy_data">
                <SwapOutlined style={{ fontSize: "2rem" }} />
                <div>Buy Data Bundle</div>
              </Link>
            </div>
            <div style={{ backgroundColor: "yellow" }} className="flex-item">
              <Link style={{ color: "white" }} to="/service/merchant_payment">
                <UserOutlined style={{ fontSize: "2rem" }} />
                <div>Merchant Payment</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
