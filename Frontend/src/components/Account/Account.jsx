// import React,{Component} from "react";
// import {Header , Icon , Segment , Label }from "semantic-ui-react";
// import {Accordion , Button , List , Image} from "semantic-ui-react";
// import {Link} from "react-router-dom";

// const order=[
//     {
//    _id:"123456",
//    number:1,
//    total:456,
//    email:"muskangoel17@gmail.com",
//    products:[
//        {
//        name:"Pizza",
//        quantity:3,
//        price:153,
//        mediaUrl:""
//    }
//    ]
// },
//    {
//     _id:"123456",
//    number:2,
//    total:728,
//    email:"nikhilgolyan@gmail.com",
//    products:
//    [{
//        name:"cashuj",
//        quantity:3,
//        price:153,
//        mediaUrl:""
//    }],
// }

// ];
// function mapOrdersToPanels(order){
//     return order.map(order=>({
//         key : order._id,
//         title:{
//             content :<Label color="blue" content={order.number}/>
//         },
//         content:{
//            content:(
//                <>
//                  <List.Header as="h3">
//                      Total:${order.total}
//                      <Label
//                       content={order.email}
//                       icon="email"
//                       basic
//                       horizontal
//                       style={{ marginLeft:'1em' }}
//                      />
//                  </List.Header>
//                  <List>
//                      {order.products.map(p=>(
//                           <List.Item>
//                                <Image avatar src={p.mediaUrl}/>
//                               <List.Content>
//                                   <List.Header>
//                                      {p.name}
//                                   </List.Header>
//                                   <List.Description>
//                                       {p.quantity} X Rs.{p.price}
//                                   </List.Description>
//                               </List.Content>
//                           </List.Item>
//                      ))}
//                  </List>
//                </>
//            )
//         }
//     }))
// }

// class account extends Component{
//     constructor(props){
//         super(props);
//     this.state={

//         };
//    }
//     render(){
//     return (
//         <div style={{marginTop:"50px"}}>
//         <Segment secondary inverted color="black">
//           <Label
//             color="teal"
//             size="large"
//             ribbon
//             icon="user"
//             style={{textTransformation:"capitalize"}}
//             content="user"
//           />
//           <Header inverted textAlign="center" as="h1" icon>
//              <Icon name="user"/>
//              Muskan
//              <Header.Subheader>muskangoel17@gmail.com</Header.Subheader>
//              {/* <Header.Subheader>{phone}</Header.Subheader> */}
//           </Header>
//         </Segment>
//         <Header as="h2" >
//             <icon name="folder open"/>
//             Order History
//         </Header>
//         {order.length === 0 ? (
//             <Segment inverted tertiary
//             color="grey"
//              textAlign="center">
//                <Header icon >
//                   <Icon name="copy outline"/>
//                   No past orders.
//                </Header>
//                <div>
//                    <Button color="blue">
//                       <Link to="/home"><p style={{color:"white"}}>View Food</p> </Link>
//                    </Button>
//                </div>
//             </Segment>
//         ) : (
//             <Accordion
//             fluid
//             styled
//             //multiple panels opened at same time
//             exclusive={false}
//             panels={mapOrdersToPanels(order)}
//             />
//         )

//         }
//         </div>
//     )
//     }
// }
// export default account;
