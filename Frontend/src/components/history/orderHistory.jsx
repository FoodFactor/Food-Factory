import React, { Component } from "react";
import { Header, Icon, Segment, Label } from "semantic-ui-react";
import { Accordion, List, Image } from "semantic-ui-react";
import Axios from "axios";

class account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      mno: "",
      orders: [
        {
          products: [
            {
              qty: "",
              title: "",
              date: "",
              img: "",
              id: "",
              price: ""
            }
          ],
          price: ""
        }
      ]
    };
  }
  userinfo() {
    Axios.get(`http://localhost:5000/protected/userinfo`, {
      headers: {
        authorization: "JWT " + localStorage.token
      }
    }).then(res => {
      this.setState({
        name: res.data[0],
        email: res.data[1],
        mno: res.data[2]
      });
    });
  }

  UNSAFE_componentWillMount() {
    Axios.get(`http://localhost:5000/protected/renderacc`, {
      headers: {
        authorization: "JWT " + localStorage.token
      }
    }).then(res => {
      if (res.data === "!user") {
        alert("Unauthorized user");
        localStorage.clear();
        this.props.history.push("/login");
      }
      if (res.data === "user not found") {
        alert("user not found");
        localStorage.clear();
        this.props.history.push("/login");
      } else {
        this.setState(
          {
            orders: res.data
          },
          () => {
            this.loadData();
            this.userinfo();
          }
        );
      }
    });
  }
  async loadApiData(id) {
    const res = await Axios.get(
      `https://api.spoonacular.com/food/menuItems/${id}?apiKey=e90c5ccd385d41c9abb0566e5bace3e3`
    );
    return {
      id: res.data.id,
      image: res.data.images[1],
      title: res.data.title,
      price: res.data.id.toString().substring(0, 3)
    };
  }
  async loadData() {
    const { orders } = this.state;
    for (let i = 0; i < orders.length; i++) {
      for (let j = 0; j < orders[i].products.length; j++) {
        const details = await this.loadApiData(orders[i].products[j].id);
        orders[i].products[j] = {
          ...details,
          qty: orders[i].products[j].qty,
          date: orders[i].date
        };
      }
    }

    this.setState({
      orders: orders
    });
  }
  mapOrdersToPanels(orders) {
    return orders.reverse().map(o => {
      return {
        title: {
          content: <Label color="blue" content={o.date} />
        },
        content: {
          content: (
            <>
              <List.Header as="h3">Total:Rs.{o.totalPrice}</List.Header>
              <List style={{ content: "inline" }}>
                {o.products.reverse().map(p => (
                  <List.Item>
                    <Image
                      avatar
                      style={{ width: "100px", height: "100px" }}
                      src={p.image}
                    />
                    <List.Content>
                      <List.Header>
                        <h3>{p.title}</h3>
                      </List.Header>
                      <List.Description>
                        <h5 style={{ margin: "10px" }}>
                          {p.qty} X Rs.{p.price}
                        </h5>
                      </List.Description>
                    </List.Content>
                  </List.Item>
                ))}
              </List>
            </>
          )
        }
      };
    });
  }
  render() {
    return (
      <div style={{ marginTop: "50px" }}>
        <div>
          <Segment secondary inverted color="black">
            <Label
              color="teal"
              size="large"
              ribbon
              icon="user"
              style={{ textTransformation: "capitalize" }}
              content="user"
            />
            <Header inverted textAlign="center" as="h1" icon>
              <Icon name="user" />
              {this.state.name}
              <Header.Subheader>{this.state.email}</Header.Subheader>
              <Header.Subheader>{this.state.mno}</Header.Subheader>
            </Header>
          </Segment>
          <Header as="h2">
            <icon name="folder open" />
            Order History
          </Header>
          <Accordion
            fluid
            styled
            exclusive={true}
            panels={this.mapOrdersToPanels(this.state.orders)}
          />
        </div>
      </div>
    );
  }
}
export default account;
