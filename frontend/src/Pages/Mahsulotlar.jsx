import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Css/Mahsulotlar.css';

function Mahsulotlar() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState(() => {
    // Get cart items from localStorage on initial load
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3334/categories');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setCategories(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  const getClassName = (index) => {
    return activeIndex === index ? 'active' : '';
  };

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        const updatedCart = prevCart.map((item) =>
          item.id === product.id ? { ...item, count: item.count + 1 } : item
        );
        // Save updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        return updatedCart;
      } else {
        const updatedCart = [...prevCart, { ...product, count: 1 }];
        // Save updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        return updatedCart;
      }
    });
  };

  if (loading) return <div>Yuklanmoqda...</div>;
  if (error) return <div>Xato: {error}</div>;

  return (
    <div className='mahsulotlar'>
      <div className="div100">
        {categories.map((category, index) => (
          <div
            key={category.id}
            className={`div10 ${getClassName(index)}`}
            onClick={() => handleClick(index)}
          >
            <h2>{category.name}</h2>
          </div>
        ))}
      </div>

      {activeIndex !== null && categories[activeIndex] && (
        <div className="div101">
          {categories[activeIndex].products.map((product) => (
            <div key={product.id} className={`div13`}>
              <h2>{product.name}</h2>
              <p>Narxi: {product.price.toLocaleString()} so'm</p>
              <p>Qolgan: {product.count} ta</p>
              <button onClick={() => handleAddToCart(product)}>Buyurtma qilish</button>
            </div>
          ))}
        </div>
      )}

      <div className="hr5"></div>

      {/* Link to Cart Page */}
      <Link to={{ pathname: "/savatcha", state: cart }} className="li2">
        Savatchaga o’tish
      </Link>
    </div>
  );
}

export default Mahsulotlar;