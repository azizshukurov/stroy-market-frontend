import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Css/Mahsulotlar.css' // Keep your custom CSS if needed

function Mahsulotlar() {
  const navigate = useNavigate()
  const [activeIndex, setActiveIndex] = useState(null)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart')
    return savedCart ? JSON.parse(savedCart) : []
  })

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://qizildasturchi.uz/api/categories')
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const result = await response.json()
        setCategories(result.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const handleClick = (index) => {
    setActiveIndex(index)
  }

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id)
      const updatedCart = existingProduct
        ? prevCart.map((item) =>
            item.id === product.id ? { ...item, count: item.count + 1 } : item
          )
        : [...prevCart, { ...product, count: 1 }]

      localStorage.setItem('cart', JSON.stringify(updatedCart))
      navigate('/savatcha')
      return updatedCart
    })
  }

  if (loading) return <div>Yuklanmoqda...</div>
  if (error) return <div>Xato: {error}</div>

  return (
    <div className="mahsulot-wrapper flex h-screen bg-gray-100">
      {/* Modern Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-4">
        <h2 className="text-1xl font-bold text-gray-800 mb-6">Kategoriyalar</h2>
        <div className="space-y-3">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={`flex items-center p-4 rounded-lg cursor-pointer transition-colors duration-300 ${
                activeIndex === index
                  ? 'bg-green-500 text-white shadow'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              onClick={() => handleClick(index)}
            >
              <span className="material-icons mr-3"></span>
              <h3>{category.name}</h3>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-1">
        {activeIndex !== null && categories[activeIndex] ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories[activeIndex].products.length > 0 ? (
              categories[activeIndex].products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white p-2 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    src={`https://qizildasturchi.uz/image${product.image}`}
                    alt={product.name}
                    className="w-full h-48 object-cover mb-4 rounded-lg"
                  />
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-1">
                    Narxi: {product.price.toLocaleString()} so'm
                  </p>
                  <p className="text-gray-500 mb-4">
                    Qolgan: {product.count} ta
                  </p>
                  <button
                    className="bg-green-500 text-white w-full py-2 rounded hover:bg-green-600 transition-colors duration-300"
                    onClick={() => handleAddToCart(product)}
                  >
                    Savatga qo'shish
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                Bu kategoriya uchun mahsulot mavjud emas.
              </p>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-500">Kategoriya tanlang</p>
        )}
      </main>

      {/* Floating Cart Button */}
      <Link
        to="/savatcha"
        className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-transform transform hover:scale-105"
      >
        Savatchaga o'tish
      </Link>
    </div>
  )
}

export default Mahsulotlar
