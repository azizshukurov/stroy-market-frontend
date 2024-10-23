import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../Rasmlar/logo.jpg";

const Navbar = () => {
  const [menu, setMenu] = useState("Bosh sahifa");
  const [isMenuActive, setIsMenuActive] = useState(false); // Menyu ko'rinishini boshqarish uchun holat

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive); // Menyu ko'rinishini o'zgartirish
  };

  const isAuthenticated = !!localStorage.getItem("userToken");

  return (
    <div className="">
      <div className="Navbar">
        <div className="flex-justify">
          <div className="nav-logo">
            <img src={logo} alt="Logo" />
            <p>QURILISH MOLLARI</p>
          </div>
          <div className="menu-toggle" onClick={toggleMenu}>
            {isMenuActive ? "✖️" : "☰"}{" "}
            {/* Menyu tugmasi faqat 600px dan kichik ekranlarda ko'rinadi */}
          </div>
        </div>
        <ul className={`nav_menu ${isMenuActive ? "active" : ""}`}>
          <li
            className={menu === "Bosh sahifa" ? "active" : ""}
            onClick={() => setMenu("Bosh sahifa")}>
            <Link to="/" className="nav-link">
              Bosh sahifa
            </Link>
          </li>
          <div className="savat">
            <li
              className={menu === "Savatcha" ? "active" : ""}
              onClick={() => setMenu("Savatcha")}>
              <Link to="/savatcha" className="nav-link">
                Savatcha
              </Link>
            </li>
            <div className="nav-cart-count">
              <h2>{JSON.parse(localStorage.getItem("cart"))?.length || 0}</h2>
            </div>
          </div>
          <li
            className={menu === "Mahsulot Turlari" ? "active" : ""}
            onClick={() => setMenu("Mahsulot Turlari")}>
            <Link to="/mahsulot-turlari" className="nav-link">
              Mahsulot Turlari
            </Link>
          </li>
          <li
            className={menu === "Buyurtmalar" ? "active" : ""}
            onClick={() => setMenu("Buyurtmalar")}>
            <Link to="/buyurtmalar" className="nav-link">
              Buyurtmalar
            </Link>
          </li>
          <li
            className={
              menu === (isAuthenticated ? "Profil" : "Hisobim") ? "active" : ""
            }
            onClick={() => setMenu(isAuthenticated ? "Profil" : "Hisobim")}>
            <Link to="/hisobim" className="nav-link">
              {isAuthenticated ? "Profil" : "Hisobim"}
            </Link>
          </li>
        </ul>
      </div>
      <div className="hr"></div>
    </div>
  );
};

export default Navbar;
