import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product.jsx";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
import Paginate from "../components/Paginate.jsx";
import ProductCarousel from "../components/ProductCarousel.jsx";

import { useDispatch, useSelector } from "react-redux";
import { listProducts, listBrands, listCategories } from "../actions/productActions.jsx";

function HomeScreen({ history }) {
  const dispatch = useDispatch();

  // Pulling product list from Redux store
  const productList = useSelector((state) => state.productList || {});
  const { products, page, pages, loading, error } = productList;

  

  // Initialize keyword from URL search params
  let keyword = history.location.search;

  // Fetch products, brands, and categories
  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <div>
      {!keyword && <ProductCarousel />}

      <h1>Latest Products</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>

         
          <Paginate page={page} pages={pages} keyword={keyword} />
        </div>
      )}
    </div>
  );
}

export default HomeScreen;
