import React, { useState, useEffect } from "react";
import { CardElement, PaymentRequestButtonElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button, Form } from "react-bootstrap";
import stripeButtonLogo from './images.jpeg'; // Path to the Stripe button logo

const CheckoutForm = ({ totalPrice, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentRequest, setPaymentRequest] = useState(null);

  useEffect(() => {
    if (!stripe) return;

    const pr = stripe.paymentRequest({
      country: 'US',
      currency: 'inr',
      total: {
        label: 'Total',
        amount: Math.round(totalPrice * 100),
      },
    });

    pr.canMakePayment().then((result) => {
      if (result) {
        setPaymentRequest(pr);
      }
    });
  }, [stripe, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      onSuccess(paymentMethod);
      setLoading(false);
    }
  };

  const handlePaymentRequest = async (event) => {
    event.preventDefault();
    setLoading(true);

    const { error, paymentIntent } = await stripe.confirmCardPayment(paymentRequest);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      onSuccess(paymentIntent);
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <style>
        {`
          .custom-stripe-button {
            background-color: transparent;
            border: none;
            padding: 0;
          }

          .stripe-button-logo {
            width: 100%; /* Adjust this as needed */
            height: auto;
            display: block;
            margin: 0 auto;
          }

          .error-message {
            color: red;
            margin-top: 10px;
          }
        `}
      </style>

      <Form.Group className="mb-3">
        <Form.Label>Card details</Form.Label>
        <CardElement 
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        {paymentRequest ? (
          <PaymentRequestButtonElement 
            options={{
              paymentRequest,
              style: {
                paymentRequestButton: {
                  type: 'default',
                  theme: 'dark',
                },
              },
            }}
          />
        ) : (
          <Button
            type="submit"
            variant="primary"
            disabled={!stripe || loading}
            className="w-100 custom-stripe-button"
          >
            <img src={stripeButtonLogo} alt="Stripe" className="stripe-button-logo" />
          </Button>
        )}
      </Form.Group>
      {error && <div className="error-message">{error}</div>}
    </Form>
  );
};

export default CheckoutForm;
