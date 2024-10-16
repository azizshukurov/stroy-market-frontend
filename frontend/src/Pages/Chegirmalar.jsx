import React, { useEffect, useState } from 'react';
import './Css/Chegirmalar.css';
import kamaz from '../Components/Rasmlar/kamaz.jpg'; // O'zingizning rasm manzilingiz
import cartIcon from '../Components/Rasmlar/360_F_560176615_cUua21qgzxDiLiiyiVGYjUnLSGnVLIi6.jpg'; // O'zingizning rasm manzilingiz
import { Link } from 'react-router-dom';

function Chegirmalar() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/data2.json'); // JSON fayl manzili
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setProducts(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Yuklanmoqda...</div>;
  if (error) return <div>Xato: {error}</div>;

  return (
    <div className='chegirmalar'>
      <div className="search">
        <input className='input' type="text" placeholder='           Toifalarni qidirish' />
        <button className='button'>Qidirish</button>
      </div>
      <h2 className='chegirmadagi_mahsulotlar_yozuvi'>Chegirmadagi Mahsulotlar</h2>
      <div className="products">
        {products.map((product) => (
          <div className="product1" key={product.id}>
            <div className="chegirma">
              <button>{product.discount}% Chegirma</button>
            </div>
         
            <div className="box1">
              <img className='kamaz' src={product.image || kamaz} alt={product.name} />
            </div>
            <div className="t">
            <h2>{product.name} <br /> Narxi {product.price} so'm</h2>
            <img className="carticon" src={cartIcon} alt="" />
            <div className="button1">
              <button>{product.price} So'm</button>
            </div>
            </div>
            </div>
        
        ))}
      </div>
      <Link to="/top-mahsulotlar" className="li22">Top mahsulotlar</Link>
      <div className="hr"></div>
    </div>
  );
}

export default Chegirmalar;
