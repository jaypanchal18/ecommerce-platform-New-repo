import React, { useState, useEffect} from "react";
import { Button, Form, Table, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listOrders } from "../actions/orderActions.jsx";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";

function CustomReportsScreen({ history }) {
  const dispatch = useDispatch();
  const [metric, setMetric] = useState("sales");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reportData, setReportData] = useState(null);

  const orderList = useSelector((state) => state.orderList);
  const { orders, loading, error } = orderList;

  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch]);

  const handleGenerateReport = () => {
    // Example report generation logic (mock data for demonstration)
    if (!startDate || !endDate) {
      alert("Please select start and end dates.");
      return;
    }

    const filteredOrders = orders.filter(order => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
    });

    let data = [];
    if (metric === "sales") {
      const totalSales = filteredOrders.reduce((acc, order) => acc + Number(order.totalPrice), 0);
      data = [{ name: "Total Sales", value: totalSales }];
    } else if (metric === "orders") {
      const totalOrders = filteredOrders.length;
      data = [{ name: "Total Orders", value: totalOrders }];
    }
    // Add more metrics as needed

    setReportData(data);
  };

  return (
    <div>
      <h1>Custom Reports</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <Form>
              <Form.Group controlId="metric">
                <Form.Label>Select Metric</Form.Label>
                <Form.Control
                  as="select"
                  value={metric}
                  onChange={(e) => setMetric(e.target.value)}
                >
                  <option value="sales">Total Sales</option>
                  <option value="orders">Total Orders</option>
                  {/* Add more options as needed */}
                </Form.Control>
              </Form.Group>
              <br/>
              <br/>
              

              <Form.Group controlId="dateRange">
                <Form.Label>Select Date Range</Form.Label>
                <Form.Row>
                  <Form.Control
                    type="date"
                    placeholder="Start Date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  <br/>
                  <br/>
                  <Form.Control
                    type="date"
                    placeholder="End Date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </Form.Row>
              </Form.Group>

              <br/>
              <br/>
              <br/>

              <Button variant="primary" onClick={handleGenerateReport}>
                Generate Report
              </Button>
            </Form>

            {reportData && (
              <div className="mt-8">
                <h3 className="text-xl font-bold">Report Results</h3>
                <Table striped bordered hover responsive className="table-sm mt-4">
                  <thead>
                    <tr>
                      <th>Metric</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>${item.value.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default CustomReportsScreen;
