import React from "react";
import { Link } from "react-router-dom";

const StorySummary = ({ title, intro }) => {
  return (
    <div className="story-summary">
      <div className="container">
        <h4 className="uppercase bold text-primary">{title}</h4>
        <p>{intro}</p>
        <Link to="/" className="btn-primary">
          Start from the beginning
        </Link>
      </div>
    </div>
  );
};

export default StorySummary;
