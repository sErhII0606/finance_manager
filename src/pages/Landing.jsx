import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <h2>Landing</h2>
      <Link to="/register" className="btn btn-hero">
        Login/Register
      </Link>
    </div>
  );
};

export default Landing;
