import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Table, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions.jsx";
import Message from "../components/Message.jsx";
import Loader from "../components/Loader.jsx";

const RESTOCK_THRESHOLD = 5; // Define a threshold for restocking alerts

function InventoryManagementScreen() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [restockAlerts, setRestockAlerts] = useState([]);

  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  useEffect(() => {
    if (products) {
      const alerts = products.filter(product => product.countInStock <= RESTOCK_THRESHOLD);
      setRestockAlerts(alerts);
    }
  }, [products]);

  const handleRestockClick = (productId) => {
    history.push(`/admin/product/${productId}/edit`);
  };

  return (
    <div>
      <h1>Inventory Management</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold">Stock Levels</h2>
              <Table striped bordered hover responsive className="table-sm mt-8">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>STOCK</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>{product.name}</td>
                      <td>${product.price}</td>
                      <td>{product.countInStock}</td>
                      <td>
                        <Button 
                          variant="warning" 
                          className="btn-sm"
                          onClick={() => handleRestockClick(product._id)}
                        >
                          Restock
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

            {restockAlerts.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-bold">Restocking Alerts</h3>
                {restockAlerts.map((product) => (
                  <Alert key={product._id} variant="warning">
                    <strong>{product.name}</strong> is running low with only {product.countInStock} items left in stock.
                  </Alert>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default InventoryManagementScreen;
