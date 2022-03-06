import React from "react";
import { useSelector } from "react-redux"
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./screen/Login/Login";
import Register from "./screen/Register/Register";
import HomePage from "./screen/HomePage/HomePage";
import auth from "./hoc/auth";
import Whoops404 from "./Utils/Whoops404";
import LandingPage from "./screen/LandingPage/LandingPage";
import Navbar from "./components/Navbar/Navbar";
import Transaction from "./screen/Transaction/Transaction";
import Profile from "./screen/Profile/Profile";
import BuyData from "./screen/HomePage/Sections/BuyData";
import BuyAirtime from "./screen/HomePage/Sections/BuyAirtime";
import Paybills from "./screen/HomePage/Sections/Paybills";
import MerchantPayment from "./screen/HomePage/Sections/MerchantPayment";
import Deposit from "./screen/HomePage/Sections/Deposit";
import Withdraw from "./screen/HomePage/Sections/Withdraw";
import Transfer from "./screen/HomePage/Sections/Transfer";
import Footer from "./components/Footer/Footer";

const App = () => {
  const isAuth = useSelector(state => state.auth.isAuthenticated)
  return (
    <div style={{ position: "relative" }}>
      <div className="home-navigation-container">
        <Navbar />
      </div>
      <Switch>
        <Route exact path="/" render={() => isAuth ? <Redirect to="/home" /> : <LandingPage />} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/home" component={auth(HomePage)} />
        <Route exact path="/transactions" component={auth(Transaction)} />
        <Route exact path="/profile" component={auth(Profile)} />
        <Route exact path="/transfer" component={auth(Transfer)} />
        <Route exact path="/deposit" component={auth(Deposit)} />
        <Route exact path="/withdraw" component={auth(Withdraw)} />
        <Route exact path="/service/buy_airtime" component={auth(BuyAirtime)} />
        <Route exact path="/service/buy_data" component={auth(BuyData)} />
        <Route exact path="/service/pay_bill" component={auth(Paybills)} />
        <Route exact path="/service/merchant_payment" component={auth(MerchantPayment)} />
        <Route component={Whoops404} />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
