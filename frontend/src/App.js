import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import LoginSignup from "./Pages/LoginSignup";
import BoshSahifa from "./Pages/Boshsahifa";
// import Chegirmalar from "./Pages/Chegirmalar";
// import TopMahsulotlar from "./Pages/TopMahsulotlar";
import Savatcha from "./Pages/Savatcha";
import SotibOlish from "./Pages/SotibOlish";
import RoyhatdanOtish from "./Pages/Royhatdan_otish";
import Sotibolindi from "./Pages/SotibOlindi";
import Yetkazibberish from "./Pages/Yetkazib_Berish";
import Mahsulotlar from "./Pages/Mahsulotlar";
import Hisobim from "./Pages/Hisobim";
import Buyurtmalar from "./Pages/Buyurtmalar";

console.log(process.env.URL);

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<BoshSahifa />} />
          <Route path="/savatcha" element={<Savatcha />} />
          <Route path="/mahsulot-turlari" element={<Mahsulotlar />} />
          <Route path="/hisobim" element={<Hisobim />} />
          <Route path="/buyurtmalar" element={<Buyurtmalar />} />
          {/* <Route path="/product/:productid" element={<Product />} />
          <Route path="/loginsignup" element={<LoginSignup />} />
          <Route path="/chegirmalar" element={<Chegirmalar />} />
          <Route path="/top-mahsulotlar" element={<TopMahsulotlar />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/sotibOlish" element={<SotibOlish />} />
          <Route path="/royhatdan-otish" element={<RoyhatdanOtish />} />
          <Route path="/sotib-olindi" element={<Sotibolindi />} />
          <Route path="/yetkazib-berish" element={<Yetkazibberish />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
