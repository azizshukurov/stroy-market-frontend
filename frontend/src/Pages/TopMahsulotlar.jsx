import React, { useEffect, useState } from 'react'
import './Css/TopMahsulotlar.css'
import kamaz from '../Components/Rasmlar/kamaz.jpg' // O'zingizning rasm manzilingiz
import { Link } from 'react-router-dom'
import carticon from '../Components/Rasmlar/360_F_560176615_cUua21qgzxDiLiiyiVGYjUnLSGnVLIi6.jpg' // O'zingizning rasm manzilingiz

function TopMahsulotlar() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/data3.json') // JSON fayl manzili
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const result = await response.json()
        setProducts(result)
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
    <div className="TopMahsulotlar">
      <div className="search">
        <input
          className="input"
          type="text"
          placeholder="           Toifalarni qidirish"
        />
        <button className="button3">Qidirish</button>
      </div>
      <h2 className="TopMahsulotlardagi_mahsulotlar_yozuvi">Top Mahsulotlar</h2>
      <div className="products">
        {products.map((product) => (
          <div className="product1" key={product.id}>
            <div className="TopMahsulotlar1">
              <button className="button">Top Mahsulotlar</button>
            </div>
            <div className="box1">
              <img
                className="kamaz"
                src={product.image || kamaz}
                alt={product.name}
              />
            </div>
            <div className="t">
              <h2>
                {product.name} <br /> Narxi {product.price?.toLocaleString()}{' '}
                so'm
              </h2>
              <img className="carticon" src={carticon} alt="" />
              <div className="button1">
                <button>{product.price?.toLocaleString()} So'm</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link to="/chegirmalar" className="li23">
        Chegirmalar
      </Link>
      <div className="hr"></div>
    </div>
  )
}

export default TopMahsulotlar
