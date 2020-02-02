import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import img1 from "../../images/i1.jpg";
import img2 from "../../images/i2.jpg";
import img3 from "../../images/i3.jpg";
import img4 from "../../images/i4.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const Login = () => {
  const [formData, setFormData] = useState({
    tel: "",
    password: "",
    isFound: false
  });
  const { tel, password } = formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/loginForm", {
        tel: formData.tel,
        password: formData.password
      })
      .then(res => {
        if (!res.data.token) {
          alert(res.data);
        } else {
          localStorage.setItem("token", res.data.token);
          setFormData({ ...formData, isFound: true });
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
  if (formData.isFound === true) return <Redirect to={{ pathname: "/home" }} />;
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <section
        className="container"
        style={{ display: "inline", width: "50%", marginLeft: "-50px" }}
      >
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead">
          <i className="fa fa-user"></i> Login in Your Account
        </p>
        <form className="form" onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="tel"
              placeholder="Mobile Number"
              name="tel"
              value={tel}
              onChange={e => onChange(e)}
              minLength="10"
              maxLength="10"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={e => onChange(e)}
              minLength="6"
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </section>
      <div style={{ marginTop: "60px", width: "50%" }}>
        <Carousel
          width={400}
          infiniteLoop={true}
          transitionTime={2000}
          autoPlay={true}
        >
          <div>
            <img src={img1} alt="Carousal-1" />
          </div>
          <div>
            <img src={img2} alt="Carousal-2" />
          </div>
          <div>
            <img src={img3} alt="Carousal-3" />
          </div>
          <div>
            <img src={img4} alt="Carousal-4" />
          </div>
        </Carousel>
      </div>
    </div>
  );
};
export default Login;
