import React, { Component } from "react";
import { Header, Icon, Segment, Grid, Image, Divider } from "semantic-ui-react";
import img1 from "../../images/female.jpg";
import img2 from "../../images/male.jpg";

export class About extends Component {
  render() {
    return (
      <div style={{ marginTop: "50px" }}>
        <Segment secondary inverted color="black">
          <Header inverted textAlign="center" as="h1" icon>
            <Icon name="user" />
            About Us
            <Header.Subheader>
              This is a food ordering app with self pick option .<br /> We came
              up with this idea when we saw the chaos at food ordering counter
              in our institute .<br /> To fix this problem we thought about this
              online ordering app.
            </Header.Subheader>
          </Header>
        </Segment>
        <div style={{ padding: "5px" }}>
          <Divider horizontal>
            <Header as="h2">
              <Icon name="" />
              Our Team
            </Header>
          </Divider>
          <Segment raised>
            <Grid stackable columns={2}>
              <Grid.Column>
                <Image src={img1} size="medium" />

                <h2>Muskan</h2>
                <p style={{ color: "#808080" }}>
                  Student of Chitkara University
                </p>

                <p>
                  You can join us on
                  <br />
                  <span>
                    {" "}
                    <i class="fa fa-instagram" aria-hidden="true"></i>{" "}
                  </span>
                  <span>
                    {" "}
                    <i class="fa fa-facebook" aria-hidden="true"></i>{" "}
                  </span>
                </p>
              </Grid.Column>
              <Grid.Column>
                <Image src={img2} size="medium" />

                <h2>Nikhil</h2>
                <p style={{ color: "#808080" }}>
                  Student of Chitkara University
                </p>

                <p>
                  You can join us on
                  <br />
                  <span>
                    {" "}
                    <i class="fa fa-instagram" aria-hidden="true"></i>{" "}
                  </span>
                  <span>
                    {" "}
                    <i class="fa fa-facebook" aria-hidden="true"></i>{" "}
                  </span>
                </p>
              </Grid.Column>
            </Grid>
          </Segment>
        </div>
      </div>
    );
  }
}

export default About;
