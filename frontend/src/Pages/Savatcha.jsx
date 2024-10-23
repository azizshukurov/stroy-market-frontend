import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Css/Savatcha.css";

function Savatcha() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    const userId = localStorage.getItem("userId");

    // If the userToken or userId is not available, redirect to '/hisobim'
    if (!userToken || !userId) {
      navigate("/hisobim");
    }

    // Retrieve cart data from localStorage and set it to the state
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, [navigate]);

  const handlePurchase = async () => {
    setLoading(true);

    try {
      const orderData = cartItems.map((item) => ({
        product_id: item.id,
        count: item.count,
      }));
      const userToken = localStorage.getItem("userToken");
      const userId = localStorage.getItem("userId");

      const response = await fetch("https://qizildasturchi.uz/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          user_id: userId,
          products: orderData,
        }),
      });

      const result = await response.json();
      if (response.status === 401) {
        // If the token is expired or unauthorized, redirect to '/hisobim'
        alert("Token muddati tugagan. Iltimos, qayta kiring.");
        navigate("/hisobim");
      } else if (result.success) {
        // If the order is successful, clear the cart and redirect to the orders page
        localStorage.removeItem("cart");
        setCartItems([]);
        alert("Sotib olish muvaffaqiyatli amalga oshirildi!");
        navigate("/buyurtmalar");
      } else {
        alert(result.message || "Sotib olishda xato yuz berdi!");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Tarmoq xatosi! Iltimos, qaytadan urinib ko'ring.");
    } finally {
      setLoading(false);
    }
  };

  const updateCart = (id, newCount) => {
    // Update cart count or remove item if count is 0
    const updatedCart = cartItems
      .map((item) => (item.id === id ? { ...item, count: newCount } : item))
      .filter((item) => item.count > 0); // Remove items with count 0
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage
  };

  const increaseCount = (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      updateCart(id, item.count + 1); // Increase count by 1
    }
  };

  const decreaseCount = (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (item && item.count > 1) {
      updateCart(id, item.count - 1); // Decrease count by 1
    } else if (item) {
      // Remove item if count goes to 0
      updateCart(id, 0);
    }
  };

  const calculateTotalSum = (cart) => {
    return cart.reduce((total, item) => {
      return total + item.price * item.count;
    }, 0); // 0 is the initial value for the total sum
  };

  return (
    <div className="savatcha-container p-4">
      {cartItems.length === 0 ? (
        <h1 className="text-center text-lg text-gray-700">
          Savatchangiz bo'sh.
        </h1>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {cartItems.map((item) => (
            <li
              key={item.id}
              className="cart-item bg-white shadow-lg rounded-lg p-4 flex flex-col transition-shadow duration-300 hover:shadow-xl">
              <img
                src={
                  item.image.startsWith("http")
                    ? `${item.image}`
                    : `https://qizildasturchi.uz/image${item.image}`
                }
                alt={item.name}
                className="cart-item-image w-full h-32 object-cover rounded-md mb-4"
              />

              <div className="cart-item-details flex-grow">
                <span className="cart-item-name font-semibold text-lg text-gray-800">
                  {item.name}
                </span>
                <p className="text-gray-600">
                  {item.count} dona - {item.price * item.count} so'm
                </p>
              </div>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => decreaseCount(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-lg">
                  -
                </button>
                <button
                  onClick={() => increaseCount(item.id)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-lg">
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {cartItems.length === 0 ? (
        <div className="savat-buttonlar mt-4 flex justify-center space-x-4">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 text-lg">
            Bosh sahifaga qaytish!
          </button>
          <button
            onClick={() => navigate("/buyurtmalar")}
            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 text-lg">
            Buyurtmalarni ko'rish!
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center mt-4">
          <h4 className="font-semibold text-lg">
            Jami summa: {calculateTotalSum(cartItems)} so'm
          </h4>
          <button
            onClick={handlePurchase}
            disabled={loading}
            className={`mt-2 px-6 py-3 rounded ${
              loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
            } text-white text-lg`}>
            {loading ? "Yuborilmoqda..." : "Sotib olish"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Savatcha;
