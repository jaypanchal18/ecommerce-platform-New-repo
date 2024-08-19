import React, { useEffect } from "react";

/* REACT BOOTSTRAP */
import { Carousel, Image } from "react-bootstrap";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* REACT ROUTER */
import { Link } from "react-router-dom";

/* COMPONENTS */
import Loader from "./Loader.jsx";
import Message from "./Message.jsx";

/* ACTION TYPES */
import { listTopProducts } from "../actions/productActions.jsx";

function ProductCarousel() {
  const dispatch = useDispatch();

  /* PULLING A PART OF STATE FROM THE ACTUAL STATE IN THE REDUX STORE */
  const productTopRated = useSelector((state) => state.productTopRated);
  const { error, loading, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return (
    <>
      
    </>
  );
};

export default ProductCarousel;
