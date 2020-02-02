import React from "react";
import { Component } from "react";
import Axios from "axios";
import { Input } from "semantic-ui-react";
import Spinner from "react-bootstrap/spinner";

import "semantic-ui-css/semantic.min.css";
class product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: [
        {
          title: "",
          img: "",
          id: "",
          price: ""
        }
      ],
      itemCount: 12,
      pageNo: 1,
      loading: true
    };
    console.log(this);
    this.LoadData = this.LoadData.bind(this);
    this.incPageNo = this.incPageNo.bind(this);
    this.decPageNo = this.decPageNo.bind(this);
  }
  addToCart = a => {
    const qty = document.getElementById(a).value;
    console.log(qty);
    Axios.post(
      "http://localhost:5000/protected/addtocart",
      {
        id: a,
        qty: qty
      },
      {
        headers: {
          authorization: "JWT " + localStorage.token
        }
      }
    )
      .then(res => {
        if (res.data === "already in your cart") {
          alert("Already in your cart");
        } else if (res.data === "added") {
          alert("Added");
        }
      })
      .catch(err => {
        alert(err);
      });
  };
  LoadData() {
    Axios.get(
      `https://api.spoonacular.com/food/menuItems/search?apiKey=f96c9f5d127148acbbafb6cc39791ca2&query=${
        this.props.match.params.item
      }&number=${this.state.itemCount * this.state.pageNo}`
    ).then(res => {
      console.log("response received");
      this.setState({
        item: res.data.menuItems.slice(-this.state.itemCount).map(it => {
          return {
            id: it.id,
            img: it.image,
            title: it.title,
            price: it.id.toString().substring(0, 3),
            qty: 1
          };
        }),
        loading: false
      });
    });
  }
  componentDidMount() {
    Axios.get("http://localhost:5000/protected/verify", {
      headers: {
        authorization: "JWT " + localStorage.token
      }
    }).then(res => {
      if (res.data !== "verified") {
        localStorage.clear();
        this.props.history.push("/login");
      } else {
        this.LoadData();
      }
    });
  }
  incPageNo() {
    this.setState(
      {
        pageNo: 1 + this.state.pageNo
      },
      this.LoadData
    );
  }
  decPageNo() {
    if (this.state.pageNo > 1) {
      this.setState(
        {
          pageNo: this.state.pageNo - 1
        },
        this.LoadData
      );
    }
  }
  render() {
    if (this.state.loading) {
      return (
        <div className="d-flex justify-content-center mt-5">
          <Spinner animation="border" role="status" variant="dark">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      );
    }
    return (
      <div>
        <div className="row1">
          {this.state.item.map(it => (
            <div className="column1">
              <div className="card1">
                <div>
                  <img
                    style={{
                      height: "160px",
                      width: "210px",
                      borderRadius: "10px"
                    }}
                    src={it.img}
                    alt="pic"
                  />
                </div>
                <h3>{it.title}</h3>
                <p>
                  <b>Price</b>: {it.price}
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Input
                    size="mini"
                    placeholder="Quantity"
                    type="number"
                    defaultValue="1"
                    min="1"
                    max="10"
                    id={it.id}
                    action={{
                      color: "teal",
                      icon: "plus cart",
                      // content: "cart"
                      onClick: event => this.addToCart(it.id)
                    }}
                  />
                </p>
              </div>
            </div>
          ))}
        </div>
        <div
          className="itemsCount"
          style={{ margin: "25px", textAlign: "center" }}
        >
          <button class="btn btn-primary" onClick={this.decPageNo}>
            {"<"}
          </button>
          <strong>&nbsp;{this.state.pageNo}&nbsp;&nbsp;&nbsp;</strong>
          <button class="btn btn-primary" onClick={this.incPageNo}>
            {">"}
          </button>
        </div>
      </div>
    );
  }
}

export default product;
