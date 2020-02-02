import React from "react";
import { Link, withRouter } from "react-router-dom";
import img from "../../images/logo.png";
import "./Navbar.css";

const style = {
  color: "white"
};
const Navbar = props => {
  const logOut = e => {
    e.preventDefault();
    localStorage.removeItem("token");
    console.log(props);
    // props.history.push(`/`);
    window.location = "/";
  };
  const loginRegLink = (
    <ul class="actions">
      <li>
        <Link style={style} to="/login">
          <i class="fa fa-sign-in" aria-hidden="true">
            {"  "}
            Login
          </i>
        </Link>
      </li>
      <li>
        <Link style={style} to="/register">
          <i class="fa fa-user-plus" aria-hidden="true">
            {"  "}
            Register
          </i>
        </Link>
      </li>
      <li>
        <Link style={style} to="/about">
          <i class="fa fa-info" aria-hidden="true">
            {"  "}
            About
          </i>
        </Link>
      </li>
    </ul>
  );
  const userLink = (
    <ul className="actions">
      <li class="active">
        <Link style={style} to="/home" aria-hidden="true" className="link">
          <i class="fa fa-home">
            {"  "}
            Home
          </i>
        </Link>
      </li>
      <li>
        <Link style={style} to="/account">
          <i class="fa fa-user" aria-hidden="true">
            {"  "}
            Account
          </i>
        </Link>
      </li>
      <li>
        <Link style={style} to="/cart">
          <i class="fa fa-shopping-cart" aria-hidden="true">
            {"  "}
            Cart
          </i>
        </Link>
      </li>
      <li>
        <Link style={style} to="/about">
          <i class="fa fa-info" aria-hidden="true">
            {"  "}
            About
          </i>
        </Link>
      </li>
      <li>
        <Link style={style} to="" onClick={logOut}>
          <i class="fa fa-info" aria-hidden="true">
            {"  "}Logout
          </i>
        </Link>
      </li>
    </ul>
  );
  return (
    <header className="nnheader">
      <div className="title">
        <Link style={style} to="/">
          <img
            src={img}
            alt="Food factory"
            style={{ width: "220px", height: "60px" }}
          />
        </Link>
      </div>
      {localStorage.token ? userLink : loginRegLink}
    </header>
  );
};
export default withRouter(Navbar);
