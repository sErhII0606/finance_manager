import React from "react";
import Container from "react-bootstrap/Container";
import NavbarBootstrap from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { clearStore, logout } from "../feachers/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <NavbarBootstrap bg="primary" data-bs-theme="dark">
      <Container>
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
          <Button variant="danger" onClick={() => dispatch(clearStore("bye"))}>
            Logout
          </Button>
        </Nav>
      </Container>
    </NavbarBootstrap>
  );
};

export default Navbar;
