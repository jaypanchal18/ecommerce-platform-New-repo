import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import CheckoutSteps from "../components/CheckoutSteps.jsx";
import Message from "../components/Message.jsx";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../actions/orderActions.jsx";
import { ORDER_CREATE_RESET } from "../constants/orderConstants.jsx";

function PlaceOrderScreen({ history }) {
  const dispatch = useDispatch();
  const orderCrate = useSelector((state) => state.orderCreate);
  const { order, error, success } = orderCrate;
  const cart = useSelector((state) => state.cart);

  // Price calculations
  cart.itemsPrice = cart.cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);

  cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 10).toFixed(2);
  cart.taxPrice = Number(0.082 * cart.itemsPrice).toFixed(2);
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  if (!cart.paymentMethod) {
    history.push("/payment");
  }

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [success, history, dispatch, order]);

  const placeorder = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <CheckoutSteps step1 step2 step3 step4 />

      <div className="max-w-screen-xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <Row className="gap-4">
          <Col md={8}>
            <Card className="mb-4 shadow-lg rounded-lg">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2 className="text-xl font-semibold mb-4">Shipping</h2>
                  <p className="text-gray-700">
                    <strong>Shipping Address: </strong>
                    {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                    {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                  </p>
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2 className="text-xl font-semibold mb-4">Payment</h2>
                  <p className="text-gray-700">
                    <strong>Payment Method: </strong>
                    {cart.paymentMethod}
                  </p>
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2 className="text-xl font-semibold mb-4">Order Items</h2>
                  {cart.cartItems.length === 0 ? (
                    <Message variant="info">Your cart is empty</Message>
                  ) : (
                    <ListGroup variant="flush">
                      {cart.cartItems.map((item, index) => (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={1}>
                              <Image
                                src={item.image}
                                alt={item.name}
                                fluid
                                rounded
                              />
                            </Col>
                            <Col>
                              <Link to={`/product${item.product}`}>
                                {item.name}
                              </Link>
                            </Col>
                            <Col md={4} className="text-right">
                              {item.qty} X ₹{item.price} = ₹
                              {(item.qty * item.price).toFixed(2)}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="shadow-lg rounded-lg">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Items:</Col>
                    <Col className="text-right">₹{cart.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping:</Col>
                    <Col className="text-right">₹{cart.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax:</Col>
                    <Col className="text-right">₹{cart.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total:</Col>
                    <Col className="text-right">₹{cart.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  {error && <Message variant="danger">{error}</Message>}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    disabled={cart.cartItems === 0}
                    onClick={placeorder}
                  >
                    Place Order
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default PlaceOrderScreen;
