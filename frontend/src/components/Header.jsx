import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions.jsx";
import SearchBox from "./SearchBox.jsx";

function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header className="border-b border-dark-200 bg-dark-50 dark:border-dark-800 dark:bg-dark-900" style={{backgroundColor:"lightblue"}}>
      <Container className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <LinkContainer to="/">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white cursor-pointer">
                E-Commerce Platform
              </h1>
            </LinkContainer>
            <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
              Your favorite place to shop!
            </p>
          </div>

          <div className="flex items-center gap-4">
            <SearchBox />

            <LinkContainer to="/cart">
              <button
                className="inline-flex items-center justify-center gap-1.5 rounded border border-gray-200 bg-white px-5 py-3 text-gray-900 transition hover:text-gray-700 focus:outline-none focus:ring dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:hover:text-gray-200"
                type="button"
              >
                <span className="text-sm font-medium">Cart</span>
                <i className="fas fa-shopping-cart ms-2"></i>
              </button>
            </LinkContainer>

            {userInfo ? (
              <NavDropdown
                title={userInfo.name}
                id="username"
                className="inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
                style={{backgroundColor:"lightgreen"}}
              >
                <LinkContainer to="/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to="/login">
                <button
                  className="inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
                  type="button"
                >
                  <i className="fas fa-user"></i> Login
                </button>
              </LinkContainer>
            )}
            {userInfo && userInfo.isAdmin && (
                <NavDropdown title={userInfo.name} id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
          </div>
        </div>
      </Container>
    </header>
  );
}

export default Header;
