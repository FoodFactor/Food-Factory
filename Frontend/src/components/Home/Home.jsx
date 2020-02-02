import React, { useEffect } from "react";
import Carousel from "semantic-ui-carousel-react";
import { Link } from "react-router-dom";
import Axios from "axios";

import { Grid, Image, Segment } from "semantic-ui-react";
import img1 from "../../images/pizza.jpg";
import img2 from "../../images/burger.jpg";
import img3 from "../../images/shakes.jpg";
import img4 from "../../images/veg.jpg";
import img5 from "../../images/dessert.jpg";
import img6 from "../../images/chicken.jpg";
import img7 from "../../images/tea.jpg";
import img8 from "../../images/pasta.jpg";
import img9 from "../../images/meals.jpg";

import img11 from "../../images/i1.jpg";
import img12 from "../../images/i2.jpg";
import img13 from "../../images/i3.jpg";
import img14 from "../../images/i4.jpg";
import img15 from "../../images/i5.jpg";
import img16 from "../../images/i6.jpg";

const Home = () => {
  const style = {
    color: "black"
  };
  let elements = [
    {
      render: () => {
        return <Image src={img11} size="medium" centered />;
      }
    },
    {
      render: () => {
        return <Image src={img12} size="large" centered />;
      }
    },
    {
      render: () => {
        return <Image src={img13} size="large" centered />;
      }
    },
    {
      render: () => {
        return <Image src={img14} size="large" centered />;
      }
    },
    {
      render: () => {
        return <Image src={img15} size="large" centered />;
      }
    },
    {
      render: () => {
        return <Image src={img16} size="large" centered />;
      }
    }
  ];
  useEffect(() => {
    Axios.get("http://localhost:5000/protected/verify", {
      headers: {
        authorization: "JWT " + localStorage.token
      }
    }).then(res => {
      if (res.data !== "verified") {
        localStorage.clear();
        // this.props.history.push("/login");
      }
      console.log(res);
    });
  });

  return (
    <div style={{ marginTop: "50px" }}>
      <center>
        <div style={{ width: "600px", height: "400px" }}>
          <Carousel
            centered
            elements={elements}
            duration={3000}
            animation="slide left"
            showNextPrev={false}
            showIndicators={true}
          />
        </div>
      </center>
      <Grid stackable centered columns={3}>
        <Grid.Row>
          <Grid.Column>
            <Segment>
              <Link style={style} to="/product/pizza">
                <Image src={img1} size="small" centered />
                <h1>La' Pinoz</h1>
                <p>Renowned for their delicious, traditional Italian pizzas</p>
              </Link>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <Link style={style} to="/product/burger">
                <Image src={img2} size="small" centered />
                <h1>Burgrill</h1>
                <p>
                  Burgrill stands for everything that defines a perfect meal.
                </p>
              </Link>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <Link style={style} to="/product/salad">
                <Image src={img4} size="small" centered />
                <h1>Salad and Fruits</h1>
                <p>Make People Happy, Have Some Fun and Be Number 1!</p>
              </Link>
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Segment>
              <Link style={style} to="/product/juice">
                <Image src={img3} size="small" centered />
                <h1>Juicery</h1>
                <p>Venue for a range of freshly made juices and smoothies </p>
              </Link>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <Link style={style} to="/product/cake">
                <Image src={img5} size="small" centered />
                <h1>The Slice</h1>
                <p>
                  If you let the cake control, you’ll look like a cinnamon roll.
                </p>
              </Link>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <Link style={style} to="/product/chicken">
                <Image src={img6} size="small" centered />
                <h1>Chicken</h1>
                <p>
                  Lick your lips after our craziest chicken strips! {"("}Made
                  with love{")"}
                </p>
              </Link>
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Segment>
              <Link style={style} to="/product/tea">
                <Image src={img7} size="small" centered />
                <h1>Chai Nagri</h1>
                <p>Flavors that will lift you off your feet</p>
              </Link>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <Link style={style} to="/product/pasta">
                <Image src={img8} size="small" centered />
                <h1>The Pasta Artist</h1>
                <p>Pasta la vista baby!</p>
              </Link>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <Link style={style} to="/product/plate">
                <Image src={img9} size="small" centered />
                <h1>Bhojan</h1>
                <p>Ek swadist mulaquat</p>
              </Link>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Home;
