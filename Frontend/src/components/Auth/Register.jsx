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

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    tel: "",
    password: "",
    password2: "",
    isnew: false,
    isFound: false
  });
  const { name, email, tel, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) alert("!= password match");
    else {
      axios
        .post("http://localhost:5000/registerForm", {
          name: formData.name,
          email: formData.email,
          tel: formData.tel,
          password: formData.password
        })
        .then(res => {
          if (res.data === "found") {
            alert("user already exists");
            setFormData({ ...formData, isFound: true });
          }
          if (res.data === "Submitted") {
            alert("Your data is submitted ,plz login to continue");
            setFormData({ ...formData, isnew: true });
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  };
  if (formData.isnew === true) return <Redirect to={{ pathname: "/login" }} />;
  if (formData.isFound === true)
    return <Redirect to={{ pathname: "/login" }} />;
  else {
    return (
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <section
          className="container"
          style={{ display: "inline", width: "50%", marginLeft: "-50px" }}
        >
          <h1 className="large text-primary">Sign Up</h1>
          <p className="lead">
            <i className="fa fa-user"></i> Create Your Account
          </p>
          <form className="form" onSubmit={e => onSubmit(e)}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                pattern="[A-Za-z]{0-20}"
                onChange={e => onChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={e => onChange(e)}
              />
            </div>
            <div className="form-group">
              <input
                type="tel"
                placeholder="Mobile Number"
                name="tel"
                pattern="^[1-9]\d*$"
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
            <div className="form-group">
              <input
                type="password"
                placeholder="Confirm Password"
                name="password2"
                value={password2}
                onChange={e => onChange(e)}
                minLength="6"
              />
            </div>
            <input type="submit" className="btn btn-primary" value="Register" />
          </form>
          <p className="my-1">
            Already have an account? <Link to="/login">Sign In</Link>
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
              <img src={img1} alt="Carousel-1" />
            </div>
            <div>
              <img src={img2} alt="Carousel-2" />
            </div>
            <div>
              <img src={img3} alt="Carousel-3" />
            </div>
            <div>
              <img src={img4} alt="Carousel-4" />
            </div>
          </Carousel>
        </div>
      </div>
    );
  }
};
export default Register;
