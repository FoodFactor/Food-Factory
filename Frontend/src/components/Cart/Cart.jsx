import React from "react";
import { Component } from "react";
import { Button, Header, Segment, Divider } from "semantic-ui-react";
import Axios from "axios";
import { Grid } from "semantic-ui-react";
import StripeCheckout from "react-stripe-checkout";
import Spinner from "react-bootstrap/spinner";

class AddToCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [{ id: "", qty: "" }],
      item: [
        {
          title: "",
          img: "",
          id: "",
          price: "",
          qty: ""
        }
      ],
      nodata: false,
      carTotal: "",
      stripeTotal: "0",
      loading: true
    };
    this.loadData = this.loadData.bind(this);
  }

  loadData = async a => {
    for (let i = 0; i < a.length; i++) {
      if (a[i].id) {
        await Axios.get(
          `https://api.spoonacular.com/food/menuItems/${a[i].id}?apiKey=f96c9f5d127148acbbafb6cc39791ca2`
        ).then(res => {
          let item = this.state.item;
          item[i] = [];
          item[i].id = res.data.id;
          item[i].img = res.data.images[1];
          item[i].title = res.data.title;
          item[i].price = res.data.id.toString().substring(0, 3);
          item[i].qty = a[i].qty;
          console.log(a[i].qty);
          let tprice =
            Number(res.data.id.toString().substring(0, 3)) * a[i].qty;
          let total = Number(Number(this.state.stripeTotal) + tprice).toFixed(
            2
          );
          this.setState({
            stripeTotal: total,
            item: item
          });
        });
      }
      this.setState({
        loading: false
      });
    }
  };
  fetchCartData = () => {
    Axios.get(`http://localhost:5000/protected/rendercart`, {
      headers: {
        authorization: "JWT " + localStorage.token
      }
    }).then(res => {
      if (res.data.length === 0) {
        this.setState({ nodata: true, loading: false });
      } else {
        this.setState({ product: res.data });
        this.loadData(res.data);
      }
    });
  };
  deleteHandle = (y, x) => {
    //this.setState({ loading: true });
    const item = this.state.item.filter(item => item.id !== y);
    Axios.post(
      "http://localhost:5000/protected/deleteFromCart",
      {
        id: y,
        qty: x
      },
      {
        headers: {
          authorization: "JWT " + localStorage.token
        }
      }
    ).then(res => {
      if (res.data === "deleted") {
        this.setState({ item: item, loading: true, stripeTotal: "0" });
        this.fetchCartData();
      }
    });
  };

  componentDidMount() {
    Axios.get(`http://localhost:5000/protected/verify`, {
      headers: {
        authorization: "JWT " + localStorage.token
      }
    }).then(res => {
      if (res.data === "verified") {
        setTimeout(() => this.fetchCartData());
      } else {
        alert("user not found");
        localStorage.clear();
        //this.props.history.push("/login");
      }
    });
  }
  payment = () => {
    Axios.post(
      "http://localhost:5000/protected/orderHistory",
      {
        product: this.state.product,
        price: this.state.stripeTotal
      },
      {
        headers: {
          authorization: "JWT " + localStorage.token
        }
      }
    ).then(res => {
      if (res.data === "order placed") {
        alert("order placed");
        this.setState({ loading: true });
        this.fetchCartData();
      }
    });
  };
  render() {
    if (this.state.loading && this.state.product.length) {
      return (
        <div className="d-flex justify-content-center mt-5">
          <Spinner animation="border" role="status" variant="dark">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      );
    }
    if (this.state.nodata) {
      return (
        <div style={{ marginTop: "50px" }}>
          <h1>
            <i className="fa fa-shopping-cart" /> Your Shopping Cart is Empty
          </h1>
        </div>
      );
    }
    return (
      <div style={{ marginTop: "40px" }}>
        <React.Fragment>
          <Divider horizontal>
            <Header as="h4">Cart</Header>
          </Divider>
          {this.state.item.map(it => (
            <div style={{ padding: "5px" }}>
              <Segment raised>
                <Grid>
                  <Grid.Row columns={2}>
                    <Grid.Column>
                      <div style={{ display: "flex" }}>
                        <img
                          style={{
                            height: "120px",
                            minWidth: "140px",
                            maxWidth: "140px",
                            borderRadius: "10px"
                          }}
                          src={it.img}
                          alt="pic"
                        />
                        <div style={{ marginLeft: "15px" }}>
                          <h3>{it.title}</h3>
                          <strong>Price :</strong> Rs.{it.price}
                          <div>
                            <strong>Qty : </strong>
                            {it.qty}
                          </div>
                        </div>
                      </div>
                    </Grid.Column>
                    <Grid.Column>
                      <Button
                        basic
                        icon="remove"
                        floated="right"
                        onClick={() => this.deleteHandle(it.id, it.qty)}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
            </div>
          ))}
          <Segment raised clearing size="large">
            <strong>Sub total :</strong> Rs. {this.state.stripeTotal}
            <StripeCheckout
              name="Food Factory"
              amount={this.state.stripeTotal * 100}
              currency="INR"
              zipCode={true}
              stripeKey="pk_test_92Qf9m1MSIed8ZmkSDjXwnzE00bhgDt35w"
              triggerEvent="onClick"
              token={this.payment}
            >
              <Button
                icon="cart"
                color="teal"
                floated="right"
                content="Checkout"
              />
            </StripeCheckout>
          </Segment>
        </React.Fragment>
      </div>
    );
  }
}
export default AddToCart;
