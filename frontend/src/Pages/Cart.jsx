import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Css/Cart.css";
import "../index.css";
import cartIcon from "../Components/Rasmlar/360_F_560176615_cUua21qgzxDiLiiyiVGYjUnLSGnVLIi6.jpg";

function Cart() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://qizildasturchi.uz/api/products"); // Replace this with your actual API endpoint
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setProducts(result.data.records); // Set the products from the API response
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle the cart icon click event
  const handleCartClick = (product) => {
    // Retrieve the current cart from local storage
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the product already exists in the cart
    const existingProduct = currentCart.find((item) => item.id === product.id);
    let updatedCart;

    if (existingProduct) {
      // If the product already exists, increase its count
      updatedCart = currentCart.map((item) =>
        item.id === product.id ? { ...item, count: item.count + 1 } : item
      );
    } else {
      // If it's a new product, add it to the cart with a count of 1
      updatedCart = [...currentCart, { ...product, count: 1 }];
    }

    // Save the updated cart to local storage
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Navigate to the cart page
    navigate("/savatcha");
  };

  if (loading) return <div>Yuklanmoqda...</div>;
  if (error) return <div>Xato: {error}</div>;

  return (
    <div className="Cart">
      <div className="search-col">
        <div className="h2">
          <h2>Barcha turdagi qurulish mollarni topishingiz mumkin</h2>
        </div>
        <div className="search">
          <input
            className="input"
            type="search"
            placeholder="Toifalarni qidirish"
          />
          <button className="button">Qidirish</button>
        </div>
      </div>
      <div className="products">
        {products.map((product) => (
          <div className="product1" key={product.id}>
            <div className="">
              <img
                className="product-img"
                src={product.image}
                alt={product.name}
                // style={{ width: "280px", height: "300px" }}
              />
            </div>
            <div className="t">
              <h2>
                {product.name} <br /> Narxi {product.price?.toLocaleString()}{" "}
                so'm
              </h2>
              <img
                className="carticon"
                src={cartIcon}
                alt="Cart Icon"
                onClick={() => handleCartClick(product)} // Pass the product to the handler
                style={{ cursor: "pointer" }}
              />
              {/* <div className="button1">
                  <button>{product.price?.toLocaleString()} So'm</button>
                </div> */}
            </div>
          </div>
        ))}
      </div>
      <div className="hr2"></div>
    </div>
  );
}

export default Cart;
