import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Landing/Navbar";
import History from "./components/history/orderHistory";
import Landing from "./components/Landing/Landing";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import About from "./components/About/About";
import Home from "./components/Home/Home";
import product from "./components/Product/product";
import cart from "./components/Cart/Cart";
import feedback from "./components/Feedback/Feedback";
import account from "./components/Account/Account";
import "./App.css";
const App = () => (
  <Router>
    <Fragment>
      <Navbar />
      <Route exact path="/" component={Landing} />
      <section className="container">
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/about" component={About} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/cart" component={cart} />
          <Route exact path="/feed" component={feedback} />
          <Route exact path="/acc" component={account} />
          <Route exact path="/history" component={History} />
          <Route exact path="/product/:item" component={product} />
        </Switch>
      </section>
    </Fragment>
  </Router>
);

export default App;
