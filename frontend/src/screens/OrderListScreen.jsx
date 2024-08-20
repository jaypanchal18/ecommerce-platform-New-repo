import React, { useEffect,useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import Message from "../components/Message.jsx";
import Loader from "../components/Loader.jsx";
import UserBehaviorScreen from "./UserBehaviorScreen.jsx";
import { useDispatch, useSelector } from "react-redux";
import { listOrders } from "../actions/orderActions.jsx";
import { PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend } from "recharts";

/* Define chart colors */
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function OrderListScreen({ history }) {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const orderList = useSelector((state) => state.orderList);
  const { orders = [], loading, error } = orderList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  /* Calculate Metrics */
  const totalUsers = orders.reduce((acc, order) => acc.add(order.User?._id), new Set()).size || 0;
  const totalPayments = orders.reduce(
    (acc, order) => acc + (order.isPaid ? Number(order.totalPrice) || 0 : 0),
    0
  );
  const totalDelivered = orders.filter((order) => order.isDeliver).length || 0;
  const totalPending = orders.filter((order) => !order.isDeliver).length || 0;

  const paymentChartData = [
    { name: 'Paid', value: orders.filter(order => order.isPaid).length || 0 },
    { name: 'Unpaid', value: orders.filter(order => !order.isPaid).length || 0 },
  ];

  const userChartData = [
    { name: 'Users', value: totalUsers },
    { name: 'Other', value: 0 }, // Dummy data
  ];

  const deliveredChartData = [
    { name: 'Delivered', value: totalDelivered },
    { name: 'Pending', value: totalPending },
  ];

  const pendingChartData = [
    { name: 'Pending', value: totalPending },
    { name: 'Delivered', value: totalDelivered },
  ];

  /* Prepare Data for Sales Analytics */
  const salesData = orders.map(order => ({
    date: new Date(order.createdAt).toLocaleDateString(),
    totalSales: Number(order.totalPrice),
  }));

  const aggregateSalesData = salesData.reduce((acc, data) => {
    const date = data.date;
    if (!acc[date]) {
      acc[date] = { date, totalSales: 0 };
    }
    acc[date].totalSales += data.totalSales;
    return acc;
  }, {});

  const salesChartData = Object.values(aggregateSalesData);

  return (
    <div>
      <h1>Orders</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {/* Dashboard Section */}
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Dashboard</h2>
              <p className="mt-4 text-gray-500 sm:text-xl">
                Overview of orders and sales performance.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-8">
              <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
                <h3 className="text-lg font-medium text-gray-500">Total Users</h3>
                <div className="text-4xl font-extrabold text-blue-600 md:text-3xl">
                  {totalUsers}
                </div>
                <PieChart width={200} height={200}>
                  <Pie
                    data={userChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {userChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </div>

              <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
                <h3 className="text-lg font-medium text-gray-500">Total Payments</h3>
                <div className="text-4xl font-extrabold text-blue-600 md:text-3xl">
                  ₹{Number(totalPayments).toFixed(2)}
                </div>
                
                <PieChart width={200} height={200}>
                  <Pie
                    data={paymentChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#82ca9d"
                    label
                  >
                    {paymentChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </div>

              <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
                <h3 className="text-lg font-medium text-gray-500">Delivered Orders</h3>
                <div className="text-4xl font-extrabold text-blue-600 md:text-3xl">
                  {totalDelivered}
                </div>
                <PieChart width={200} height={200}>
                  <Pie
                    data={deliveredChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#FFBB28"
                    label
                  >
                    {deliveredChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </div>

              <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
                <h3 className="text-lg font-medium text-gray-500">Pending Orders</h3>
                <div className="text-4xl font-extrabold text-blue-600 md:text-3xl">
                  {totalPending}
                </div>
                <PieChart width={200} height={200}>
                  <Pie
                    data={pendingChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#FF8042"
                    label
                  >
                    {pendingChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </div>
            </div>
          </div>

          {/* Sales Analytics Section */}
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Sales Analytics</h2>
              <p className="mt-4 text-gray-500 sm:text-xl">
                Insights into total sales, revenue, and growth over time.
              </p>
            </div>

            <LineChart width={1000} height={400} data={salesChartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <RechartsTooltip />
              <Legend />
              <Line type="monotone" dataKey="totalSales" stroke="#8884d8" />
            </LineChart>
          </div>


          

          {/* Orders Section */}
          <div className="overflow-x-auto">
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Paid</th>
                  <th>Delivered</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.User?.name}</td>
                      <td>{order.createdAt?.substring(0, 10)}</td>
                      <td>{order.totalPrice}</td>
                      <td>
                        {order.isPaid ? (
                          order.paidAt?.substring(0, 10)
                        ) : (
                          <i className="fas fa-times" style={{ color: "red" }}></i>
                        )}
                      </td>
                      <td>
                        {order.isDeliver ? (
                          order.deliveredAt?.substring(0, 10)
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
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">No orders found</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
          
        </>
      )}
    </div>
  );
}

export default OrderListScreen;

