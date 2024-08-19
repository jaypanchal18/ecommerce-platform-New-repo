import React, { useEffect } from "react";

/* REACT ROUTER BOOTSTRAP */
import { LinkContainer } from "react-router-bootstrap";

/* REACT BOOTSTRAP */
import { Table, Button } from "react-bootstrap";

/* COMPONENTS */
import Message from "../components/Message.jsx";
import Loader from "../components/Loader.jsx";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import { listOrders } from "../actions/orderActions.jsx";

function OrderListScreen({ history }) {
  const dispatch = useDispatch();

  /* PULLING OUT STATE */
  const orderList = useSelector((state) => state.orderList);
  const { orders, loading, error } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    // WE DON'T WANT NON-ADMINS TO ACCESS THIS PAGE SO REDIRECT IF SOMEBODY TRIES TO

    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  /* HANDLER */

  return (
    <div>
      <h1>Orders</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.User && order.User.name}</td>
                  <td>{order.createdAt && order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>

                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>

                  <td>
                    {order.isDeliver ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>

                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant="dark" className="btn-sm">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Dashboard Section */}
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Dashboard</h2>

              <p className="mt-4 text-gray-500 sm:text-xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione dolores laborum labore
                provident impedit esse recusandae facere libero harum sequi.
              </p>
            </div>

            <dl className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
                <dt className="order-last text-lg font-medium text-gray-500">Total Sales</dt>
                <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">$4.8m</dd>
              </div>

              <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
                <dt className="order-last text-lg font-medium text-gray-500">Official Addons</dt>
                <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">24</dd>
              </div>

              <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
                <dt className="order-last text-lg font-medium text-gray-500">Total Addons</dt>
                <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">86</dd>
              </div>

              <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
                <dt className="order-last text-lg font-medium text-gray-500">Downloads</dt>
                <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">86k</dd>
              </div>
            </dl>
          </div>
        </>
      )}
    </div>
  );
}

export default OrderListScreen;
