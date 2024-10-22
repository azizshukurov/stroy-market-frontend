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
            className={menu === "Hisobim" ? "active" : ""}
            onClick={() => setMenu("Hisobim")}>
            <Link to="/hisobim" className="nav-link">
              Hisobim
            </Link>
          </li>
          <li
            className={menu === "Buyurtmalar" ? "active" : ""}
            onClick={() => setMenu("Buyurtmalar")}>
            <Link to="/buyurtmalar" className="nav-link">
              Buyurtmalar
            </Link>
          </li>
        </ul>
      </div>
      <div className="hr"></div>
    </div>

    // <div className="">
    //   <div className="Navbar flex items-center justify-between px-4 py-2 sm:px-6">
    //     <div className="flex items-center justify-between w-full sm:w-auto">
    //       <div className="nav-logo flex items-center">
    //         <img src={logo} alt="Logo" className="w-12 h-12 sm:w-16 sm:h-16" />
    //         <p className="ml-2 text-lg sm:text-xl font-bold">
    //           QURILISH MOLLARI
    //         </p>
    //       </div>
    //       <div
    //         className="menu-toggle sm:hidden cursor-pointer text-2xl"
    //         onClick={toggleMenu}>
    //         {isMenuActive ? "✖️" : "☰"}
    //       </div>
    //     </div>
    //     <ul
    //       className={`nav_menu flex-col sm:flex-row sm:flex sm:items-center gap-4 ${
    //         isMenuActive ? "flex" : "hidden"
    //       }`}>
    //       <li
    //         className={`nav-link ${menu === "Bosh sahifa" ? "active" : ""} `}
    //         onClick={() => setMenu("Bosh sahifa")}>
    //         <Link to="/" className="nav-link">
    //           Bosh sahifa
    //         </Link>
    //       </li>
    //       <div className="savat  items-center ">
    //         <li
    //           className={`nav-link ${menu === "Savatcha" ? "active" : ""}`}
    //           onClick={() => setMenu("Savatcha")}>
    //           <Link to="/savatcha" className="nav-link">
    //             Savatcha
    //           </Link>
    //         </li>
    //         <div className="nav-cart-count text-sm sm:text-base ml-2">
    //           <h2>{JSON.parse(localStorage.getItem("cart"))?.length || 0}</h2>
    //         </div>
    //       </div>
    //       <li
    //         className={`nav-link ${
    //           menu === "Mahsulot Turlari" ? "active" : ""
    //         } `}
    //         onClick={() => setMenu("Mahsulot Turlari")}>
    //         <Link to="/mahsulot-turlari" className="nav-link">
    //           Mahsulot Turlari
    //         </Link>
    //       </li>
    //       <li
    //         className={`nav-link ${menu === "Hisobim" ? "active" : ""}`}
    //         onClick={() => setMenu("Hisobim")}>
    //         <Link to="/hisobim" className="nav-link">
    //           Hisobim
    //         </Link>
    //       </li>
    //       <li
    //         className={`nav-link ${menu === "Buyurtmalar" ? "active" : ""} `}
    //         onClick={() => setMenu("Buyurtmalar")}>
    //         <Link to="/buyurtmalar" className="nav-link">
    //           Buyurtmalar
    //         </Link>
    //       </li>
    //     </ul>
    //   </div>
    //   <div className="hr my-2"></div>
    // </div>
  );
};

export default Navbar;
