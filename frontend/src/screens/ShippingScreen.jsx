import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import FormContainer from "../components/FormContainer.jsx";
import CheckoutSteps from "../components/CheckoutSteps.jsx";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions.jsx";

function ShippingScreen({ history }) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push("./payment");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-screen-xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div>
          <h2 className="sr-only">Steps</h2>
          <div>
            <div className="overflow-hidden rounded-full bg-gray-200">
              <div className="h-2 w-1/2 rounded-full bg-blue-500"></div>
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
        <FormContainer>
          <CheckoutSteps step1 step2 />
          <h1>Shipping</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control required type="text" placeholder="Enter Address" value={address ? address : ""} onChange={(e) => setAddress(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control required type="text" placeholder="Enter City" value={city ? city : ""} onChange={(e) => setCity(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="postalCode">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control required type="text" placeholder="Enter Postal Code" value={postalCode ? postalCode : ""} onChange={(e) => setPostalCode(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control required type="text" placeholder="Enter Country" value={country ? country : ""} onChange={(e) => setCountry(e.target.value)} />
            </Form.Group>
            <Button className="my-3" type="submit" variant="primary">
              Continue
            </Button>
          </Form>
        </FormContainer>
      </div>
    </div>
  );
}

export default ShippingScreen;
