import React, { Component } from "react";
import { Rating, Form } from "semantic-ui-react";
import Axios from "axios";

class feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: "",
      review: ""
    };
  }

  handleRate = (a, { rating }) => {
    this.setState({ rating: rating });
  };

  handleChange = (e, { value }) => {
    this.setState({ review: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    Axios.post(
      "http://localhost:5000/protected/feedForm",
      {
        rating: this.state.rating,
        review: this.state.review
      },
      {
        headers: {
          authorization: "JWT " + localStorage.token
        }
      }
    )
      .then(res => {
        if (res.data === "feedback added") {
          alert("Added");
        }
      })
      .catch(err => {
        alert(err);
      });
  };
  render() {
    return (
      <div style={{ marginTop: "50px" }}>
        <h1>Feedback</h1>
        <p>How satisfied are you with our services?</p>
        <Rating
          icon="star"
          size="huge"
          maxRating={5}
          onRate={this.handleRate}
        />
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
        <p>
          If you have any other feedback , please let us know here. We would
          love to improve our service.
        </p>
        <Form onSubmit={this.handleSubmit}>
          <Form.TextArea onChange={this.handleChange} />
          <Form.Button
            labelPosition="left"
            icon="edit"
            primary
            content="Submit"
          />
        </Form>
      </div>
    );
  }
}

export default feedback;
