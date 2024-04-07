import React from "react";
import Nav from "react-bootstrap/Nav";

const CategoryNavbar = ({ categories, setView, handleSearch, setCategory }) => {
  return (
    <Nav variant="tabs">
      {categories.map((c, i) => {
        return (
          <Nav.Item
            key={i}
            onClick={() => {
              setView(true);
              handleSearch(c);
              setCategory(c);
            }}
          >
            <Nav.Link>{c}</Nav.Link>
          </Nav.Item>
        );
      })}
      <Nav.Item
        key={categories.length}
        onClick={() => {
          setView(true);
          handleSearch("custom");
          setCategory("Custom");
        }}
      >
        <Nav.Link>Custom</Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default CategoryNavbar;
