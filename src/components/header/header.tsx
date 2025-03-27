import React from "react";
import "./header.scss";
import logo from '../../resources/logo.png';

const Header: React.FC = () => {
  return (
    <header className="header">
      <img src={logo} alt="Logo" className="header__logo" />
    </header>
  );
};

export default Header;
