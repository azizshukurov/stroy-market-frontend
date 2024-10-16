import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../Rasmlar/logo.jpg";

const Navbar = () => {
  const [menu, setMenu] = useState("Bosh sahifa");
  const [isMenuActive, setIsMenuActive] = useState(false); // Menyu ko'rinishini boshqarish uchun holat

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive); // Menyu ko'rinishini o'zgartirish
  };

  return (
    <div className="Navbar">
      <div className="navbar">
        <div className="nav-logo">
          <img src={logo} alt="Logo" />
          <p>QURILISH MOLLARI</p>
        </div>
        <div className="menu-toggle" onClick={toggleMenu}>
          {isMenuActive ? '✖️' : '☰'} {/* Menyu tugmasi faqat 600px dan kichik ekranlarda ko'rinadi */}
        </div>
      </div>
      <ul className={`nav_menu ${isMenuActive ? 'active' : ''}`}>
        <li
          className={menu === "Bosh sahifa" ? "active" : ""}
          onClick={() => setMenu("Bosh sahifa")}
        >
          <Link to="/bosh-sahifa" className="nav-link">Bosh sahifa</Link>
        </li>
        <div className="savat">
          <li
            className={menu === "Savatcha" ? "active" : ""}
            onClick={() => setMenu("Savatcha")}
          >
            <Link to="/savatcha" className="nav-link">Savatcha</Link>
           
          </li>
          <div className="nav-cart-count"><h2>0</h2></div>
        </div>
        <li
          className={menu === "Mahsulot Turlari" ? "active" : ""}
          onClick={() => setMenu("Mahsulot Turlari")}
        >
          <Link to="/mahsulot-turlari" className="nav-link">Mahsulot Turlari</Link>
        </li>
        <li
          className={menu === "Hisobim" ? "active" : ""}
          onClick={() => setMenu("Hisobim")}
        >
          <Link to="/hisobim" className="nav-link">Hisobim</Link>
        </li>
      </ul>
      <div className="hr"></div>
    </div>
  );
};

export default Navbar;