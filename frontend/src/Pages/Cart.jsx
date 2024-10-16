import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Css/Cart.css'
import cartIcon from '../Components/Rasmlar/360_F_560176615_cUua21qgzxDiLiiyiVGYjUnLSGnVLIi6.jpg'
import kamaz from '../Components/Rasmlar/kamaz.jpg'

function Cart() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const handleCartIconClick = () => {
    navigate('/cart')
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3334/products') // Replace this with your actual API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const result = await response.json()
        setProducts(result.data.records) // Set the products from the API response
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) return <div>Yuklanmoqda...</div>
  if (error) return <div>Xato: {error}</div>

  return (
    <div className="Cart">
      <div className="search">
        <input
          className="input"
          type="search"
          placeholder="Toifalarni qidirish"
        />
        <button className="button">Qidirish</button>
      </div>
      <div className="h2">
        <h2>Barcha turdagi qurulish mollarni topishingiz mumkin</h2>
      </div>
      <div className="products">
        {products.map((product) => (
          <div className="product1" key={product.id}>
            <div className="box1">
              <img
                className="kamaz"
                src={product.image || kamaz}
                alt={product.name}
              />
            </div>
            <div className="t">
              <h2>
                {product.name} <br /> Narxi {product.price.toLocaleString()}{' '}
                so'm
              </h2>
              <img className="carticon" src={cartIcon} alt="Cart Icon" />
              <div className="button1">
                <button onClick={handleCartIconClick}>
                  {product.price.toLocaleString()} So'm
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="hr2"></div>
    </div>
  )
}

export default Cart
