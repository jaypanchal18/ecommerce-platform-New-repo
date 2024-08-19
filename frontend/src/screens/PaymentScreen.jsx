import React, { useState } from "react";
import { Button, Form, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer.jsx";
import CheckoutSteps from "../components/CheckoutSteps.jsx";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions.jsx";
import stripeButtonLogo from './images.jpeg'; // Path to the Stripe button logo

function PaymentScreen({ history }) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [paymentMethod, setPaymentMethod] = useState("Stripe");

  if (!shippingAddress.address) {
    history.push("./shipping");
  }

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-screen-xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Progress Indicator */}
        <div>
          <h2 className="sr-only">Steps</h2>
          <div>
            <div className="overflow-hidden rounded-full bg-gray-200">
              <div className="h-2 w-2/3 rounded-full bg-blue-500"></div>
            </div>
            <ol className="mt-4 grid grid-cols-3 text-sm font-medium text-gray-500">
              <li className="flex items-center justify-start text-blue-600 sm:gap-1.5">
                <span className="hidden sm:inline">Details</span>
                <svg className="size-6 sm:size-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                </svg>
              </li>
              <li className="flex items-center justify-center text-blue-600 sm:gap-1.5">
                <span className="hidden sm:inline">Address</span>
                <svg className="size-6 sm:size-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </li>
              <li className="flex items-center justify-end sm:gap-1.5">
                <span className="hidden sm:inline">Payment</span>
                <svg className="size-6 sm:size-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </li>
            </ol>
          </div>
        </div>
        <CheckoutSteps step1 step2 step3 />
        <div className="max-w-screen-md mx-auto bg-white p-8 shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold mb-8 text-center">Payment Method</h1>
          
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label as="legend" className="mb-4 block text-lg">
                Select Method
              </Form.Label>
              <Col>
                <Form.Check
                  type="radio"
                  label="Pay with Stripe"
                  id="stripe"
                  name="paymentMethod"
                  value="Stripe"
                  checked={paymentMethod === "Stripe"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mb-3"
                ></Form.Check>
                {/* Add more payment methods if needed */}
              </Col>
            </Form.Group>
            <Button
              type="submit"
              variant="primary"
              className="w-full mt-4 py-2 d-flex align-items-center justify-center"
              style={{ backgroundColor: 'transparent', border: 'none',padding: 0, width: '700px' }}
            >
              <img src={stripeButtonLogo} alt="Stripe" style={{ width: '100%', height: 'auto' }} />
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default PaymentScreen;
