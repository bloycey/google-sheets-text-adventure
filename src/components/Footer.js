import React from "react";
import StorySummary from "../components/StorySummary";

const Footer = ({ title, intro }) => {
  return (
    <>
      <div className="sm-only">
        <StorySummary title={title} intro={intro} />
      </div>
      <div className="footer">
        <div className="container">
          <a
            href="https://github.com/bloycey/google-sheets-text-adventure"
            target="_blank"
            rel="noopener noreferrer"
          >
            Make your own text adventure!
          </a>
        </div>
      </div>
    </>
  );
};

export default Footer;
