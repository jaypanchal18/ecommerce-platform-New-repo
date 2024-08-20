import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { listOrders } from "../actions/orderActions.jsx";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function UserBehaviorScreen({ history }) {
  const dispatch = useDispatch();
  const [mostViewedProducts, setMostViewedProducts] = useState([]);
  const [abandonedCarts, setAbandonedCarts] = useState([]);
  const [conversionRate, setConversionRate] = useState(0);

  const orderList = useSelector((state) => state.orderList);
  const { orders, loading, error } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  useEffect(() => {
    if (orders) {
      // Most Viewed Products (Most frequently ordered products)
      const productViews = {};
      orders.forEach(order => {
        order.orderItems.forEach(item => {
          productViews[item.name] = (productViews[item.name] || 0) + 1;
        });
      });

      const viewedProducts = Object.keys(productViews).map(name => ({
        name,
        count: productViews[name]
      }));
      setMostViewedProducts(viewedProducts);

      // Abandoned Carts (Orders created but not paid)
      const abandoned = orders.filter(order => !order.isPaid);
      setAbandonedCarts(abandoned);

      // Conversion Rate
      const totalCarts = orders.length;
      const completedPurchases = orders.filter(order => order.isPaid).length;
      const conversion = totalCarts > 0 ? (completedPurchases / totalCarts) * 100 : 0;
      setConversionRate(conversion.toFixed(2));
    }
  }, [orders]);

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">User Behavior Analytics</h1>

      <div className="mt-8">
        <h2 className="text-2xl font-bold">Most Viewed Products</h2>
        <BarChart width={600} height={300} data={mostViewedProducts}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold">Abandoned Carts</h2>
        <PieChart width={400} height={400}>
          <Pie
            data={abandonedCarts.length ? [{ name: 'Abandoned Carts', value: abandonedCarts.length }, { name: 'Other', value: 0 }] : [{ name: 'No Data', value: 1 }]}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#FF8042"
            label
          >
            {abandonedCarts.length ? <Cell fill={COLORS[0]} /> : null}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold">Conversion Rate</h2>
        <div className="text-3xl font-extrabold">{conversionRate}%</div>
      </div>
    </div>
  );
}

export default UserBehaviorScreen;
