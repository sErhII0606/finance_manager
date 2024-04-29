import React from "react";
import Container from "react-bootstrap/Container";
import NavbarBootstrap from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearStore, logout } from "../feachers/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import useDeviceSize from "../util/useDeviceSize";
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((store) => store.user);
  const [width, height] = useDeviceSize();
  return (
    <NavbarBootstrap bg="primary" data-bs-theme="dark">
      <Container>
        {width < 900 ? (
          <NavbarBootstrap.Brand
            onClick={() => {
              navigate("/");
            }}
          >
            NavbarBootstrap
          </NavbarBootstrap.Brand>
        ) : (
          <>
            <NavbarBootstrap.Brand>NavbarBootstrap</NavbarBootstrap.Brand>
            <Nav className="me-auto">
              <Nav.Link
                onClick={() => {
                  navigate("/");
                }}
              >
                Home
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigate("/transactions");
                }}
              >
                Transactions
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigate("/creditCards");
                }}
              >
                Credit Cards
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigate("/reports");
                }}
              >
                Reports
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigate("/settings");
                }}
              >
                Settings
              </Nav.Link>
              <Button
                variant="danger"
                disabled={isLoading}
                onClick={() => dispatch(clearStore(user.accessToken))}
              >
                Logout
              </Button>
            </Nav>
          </>
        )}
      </Container>
    </NavbarBootstrap>
  );
};

export default Navbar;
