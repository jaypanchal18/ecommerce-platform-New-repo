import React, { useEffect, useState } from "react";
import { Container, ListGroup, Row, Col } from "react-bootstrap";
import Product from "../components/Product.jsx";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
import Paginate from "../components/Paginate.jsx";
import ProductCarousel from "../components/ProductCarousel.jsx";
import SearchBox from "../components/SearchBox.jsx"; // Assuming SearchBox is in the components folder

import { useDispatch, useSelector } from "react-redux";
import { listProducts, listBrands, listCategories } from "../actions/productActions.jsx";

function HomeScreen({ history }) {
  const dispatch = useDispatch();

  // Pulling product list from Redux store
  const productList = useSelector((state) => state.productList || {});
  const { products, page, pages, loading, error } = productList;

  // State to track selected mobile brand
  const [selectedMobile, setSelectedMobile] = useState("");

  // Initialize keyword from URL search params
  let keyword = history.location.search;

  // Fetch products, brands, and categories
  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  // Mobile filter options (hardcoded for demonstration)
  const mobileBrands = [
    "Samsung",
    "Apple",
    "OnePlus",
    "Xiaomi",
    "Realme",
    "Oppo",
    "Poco",
  ];

  // Handle mobile brand filter selection
  const handleFilterSelect = (brand) => {
    setSelectedMobile(brand);
    history.push(`/?keyword=${brand}&page=1`);
  };

  return (
    <Container fluid>
      <div className="filter-container">
        {/* Sidebar Filter */}
        <h4>Filter by Mobile Brand</h4>
        <ListGroup>
          {mobileBrands.map((brand, index) => (
            <ListGroup.Item
              key={index}
              action
              onClick={() => handleFilterSelect(brand)}
              active={brand === selectedMobile}
            >
              {brand}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>

      <div className="content-container">
        {/* Main Content */}
        <SearchBox /> {/* Search box for keyword search */}
        {!keyword && <ProductCarousel />}
        <h1 className="my-4">Latest Products</h1>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <div key={product._id} className="product-item">
                <Product product={product} />
              </div>
            ))}
          </div>
        )}

        <Paginate page={page} pages={pages} keyword={keyword} />
      </div>

      <style jsx>{`
        .filter-container {
          position: fixed;
          top: 250px; /* Adjust based on your navbar height */
          left: 0;
          width: 250px;
          height: calc(100vh - 60px); /* Full height minus navbar height */
          padding: 20px;
          border-right: 1px solid #ddd;
          background-color: #f8f9fa;
          overflow-y: auto;
        }

        .content-container {
          margin-left: 270px; /* Space for the filter */
          padding: 20px;
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr); /* At least 6 items per row */
          gap: 25px; /* Space between items */
        }

        .product-item {
          background: #f8f9fa;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </Container>
  );
}

export default HomeScreen;
