/* REACT BOOTSTRAP */
import { Container } from "react-bootstrap";

/* COMPONENTS */
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
import ProductScreen from "./screens/ProductScreen.jsx";
import CartScreen from "./screens/CartScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import ShippingScreen from "./screens/ShippingScreen.jsx";
import PaymentScreen from "./screens/PaymentScreen.jsx";
import PlaceOrderScreen from "./screens/PlaceOrderScreen.jsx";
import OrderScreen from "./screens/OrderScreen.jsx";
import UserListScreen from "./screens/UserListScreen.jsx";
import UserEditScreen from "./screens/UserEditScreen.jsx";
import ProductListScreen from "./screens/ProductListScreen.jsx";
import ProductEditScreen from "./screens/ProductEditScreen.jsx";
import OrderListScreen from "./screens/OrderListScreen.jsx";

import IntroScreen from './screens/IntroScreen.jsx';
/* REACT ROUTER */
import { HashRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Container>
        <main className="py-3">
          
 
          <Route exact path="/" component={HomeScreen} />

          <Route path="/search" component={HomeScreen} exact />

          <Route path="/login" component={LoginScreen} />

          <Route path="/register" component={RegisterScreen} />

          <Route path="/profile" component={ProfileScreen} />

          <Route path="/shipping" component={ShippingScreen} />

          <Route path="/payment" component={PaymentScreen} />

          <Route path="/placeorder" component={PlaceOrderScreen} />

          <Route path="/order/:id" component={OrderScreen} />

          <Route path="/product/:id" component={ProductScreen} />

          <Route path="/cart/:id?" component={CartScreen} />

          <Route path="/admin/userlist" component={UserListScreen} />

          <Route path="/admin/user/:id/edit" component={UserEditScreen} />

          <Route path="/admin/product/:id/edit" component={ProductEditScreen} />

          <Route path="/admin/productlist" component={ProductListScreen} />

          <Route path="/admin/orderlist" component={OrderListScreen} />
        </main>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
