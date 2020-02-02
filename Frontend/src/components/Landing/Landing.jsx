import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  console.log(localStorage.token);
  return (
    <section className="landing" style={{ scroll: "no" }}>
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">FoOd FaCtOrY</h1>
          <p className="lead">Eat Meet & Greet</p>
          {!localStorage.token ? (
            <div className="buttons">
              <Link to="/register" className="btn btn-primary">
                Sign Up
              </Link>
              <Link to="/login" className="btn btn-light">
                Login
              </Link>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </section>
  );
};
export default Landing;
