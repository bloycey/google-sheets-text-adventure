import React from "react";

import logo from "../img/logo.svg";

const Header = ({ title }) => {
  return (
    <div className="header-wrapper white">
      <div className="container header">
        <div className="header-img">
          <img src={logo} alt="Text adventure logo" />
        </div>
        <h1 className="header-title">{title}</h1>
      </div>
    </div>
  );
};

export default Header;
