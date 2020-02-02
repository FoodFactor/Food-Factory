import React from "react";
import { Link } from "react-router-dom";
import img from "../../img/logo2.png";
const nav = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link to="/" className="navbar-brand">
        <img src={img} alt="Food Factory"></img>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </li>
          <li className="nav-item active">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
          <li className="nav-item active">
            <Link to="/about" className="nav-link">
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>

    // <nav className="navbar bg-dark">
    //   <h1>
    //     <Link to="/">
    //       <img src={img} alt="Food Factory"></img>
    //     </Link>
    //   </h1>
    //   <ul>
    //     <li>
    //       <Link to="/register">Register</Link>
    //     </li>
    //     <li>
    //       <Link to="/login">Login</Link>
    //     </li>
    //     <li>
    //       <Link to="/about">About</Link>
    //     </li>
    //   </ul>
    // </nav>
  );
};
export default nav;
