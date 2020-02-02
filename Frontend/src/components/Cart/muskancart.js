import React from "react";
import StripeCheckout from "react-stripe-checkout";
import {
  Button,
  Header,
  Icon,
  Segment,
  Divider,
  Item
} from "semantic-ui-react";
//import img from "../../img/logo.png";

// function mapCartProductsToItems(){
//     return products.map(p => ({
//       //childKey: p.product._id,
//       childKey: 0,

//       header:(
//         <Item.Header as="a">
//              {p.product.name}
//         </Item.Header>
//       ),
//       image:p.product.mediaUrl,
//       meta: "${p.quantity} X ${p.product.price}",
//       fluid:"true",
//       extra: (
//         <Button
//         basic
//         icon="remove"
//         floated="right"

//         />
//       )
//     }))
// }
const items = [
  {
    childKey: 0,

    header: <Item.Header>Burger</Item.Header>,
    image: "/images/avatar/large/jenny.jpg",
    meta: "2 X 3",
    fluid: "true",
    extra: <Button basic icon="remove" floated="right" />
  },
  {
    childKey: 1,

    header: <Item.Header>Pizza</Item.Header>,
    image: "/images/avatar/large/jenny.jpg",
    meta: "2 X 3",
    fluid: "true",
    extra: <Button basic icon="remove" floated="right" />
  }
];
const Cart = () => (
  <div style={{ marginTop: "40px" }}>
    <React.Fragment>
      <Segment inverted color="white" placeholder>
        <Header icon>
          <Icon name="shopping cart" />
          Add More Items!!
        </Header>
        <Button primary>Go to home</Button>
      </Segment>
      <Divider horizontal>
        <Header as="h4">
          <Icon name="" />
          Orders
        </Header>
      </Divider>
      <Item.Group divided items={items} />
      <Segment clearing size="large">
        <strong>Sub total :</strong> Rs. 0.00
        <StripeCheckout
          name="Food Factory"
          amount="345"
          currency="usd"
          shippingAddress={true}
          bllingAddress={true}
          zipCode={true}
          stripeKey="pk_test_92Qf9m1MSIed8ZmkSDjXwnzE00bhgDt35w"
          triggerEvent="onClick"
        >
          <Button icon="cart" color="teal" floated="right" content="Checkout" />
        </StripeCheckout>
      </Segment>
    </React.Fragment>
  </div>
);

export default Cart;
