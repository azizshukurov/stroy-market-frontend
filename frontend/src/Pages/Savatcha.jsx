import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Css/Savatcha.css'

function Savatcha() {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Retrieve the user token and userId from localStorage or session
    const userToken = localStorage.getItem('userToken')
    const userId = localStorage.getItem('userId')

    // If the userToken or userId is not available, redirect to '/hisobim'
    if (!userToken || !userId) {
      navigate('/hisobim')
    }

    // Retrieve cart data from localStorage and set it to the state
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
  }, [navigate])

  const handlePurchase = async () => {
    setLoading(true)

    try {
      const orderData = cartItems.map((item) => ({
        product_id: item.id,
        count: item.count,
      }))
      const userToken = localStorage.getItem('userToken')
      const userId = localStorage.getItem('userId')

      const response = await fetch('https://qizildasturchi.uz/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          user_id: userId,
          products: orderData,
        }),
      })

      const result = await response.json()
      if (result.success) {
        // If the order is successful, clear the cart and redirect to the orders page
        localStorage.removeItem('cart')
        setCartItems([])
        alert('Sotib olish muvaffaqiyatli amalga oshirildi!')
        navigate('/orders')
      } else {
        alert(result.message || 'Sotib olishda xato yuz berdi!')
      }
    } catch (error) {
      console.error('Error placing order:', error)
      alert("Tarmoq xatosi! Iltimos, qaytadan urinib ko'ring.")
    } finally {
      setLoading(false)
    }
  }

  const updateCart = (id, newCount) => {
    // Update cart count or remove item if count is 0
    const updatedCart = cartItems
      .map((item) => (item.id === id ? { ...item, count: newCount } : item))
      .filter((item) => item.count > 0) // Remove items with count 0
    setCartItems(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart)) // Update localStorage
  }

  const increaseCount = (id) => {
    const item = cartItems.find((item) => item.id === id)
    if (item) {
      updateCart(id, item.count + 1) // Increase count by 1
    }
  }

  const decreaseCount = (id) => {
    const item = cartItems.find((item) => item.id === id)
    if (item && item.count > 1) {
      updateCart(id, item.count - 1) // Decrease count by 1
    } else if (item) {
      // Remove item if count goes to 0
      updateCart(id, 0)
    }
  }

  const calculateTotalSum = (cart) => {
    return cart.reduce((total, item) => {
      return total + item.price * item.count
    }, 0) // 0 is the initial value for the total sum
  }

  return (
    <div className="savatcha-container">
      <h2>Savatcha</h2>
      {cartItems.length === 0 ? (
        <p>Savatchangiz bo'sh.</p>
      ) : (
        <ul className="cart-list">
          {cartItems.map((item) => (
            <li key={item.id} className="cart-item">
              <img
                src={
                  item.image.startsWith('http')
                    ? `${item.image}`
                    : `https://qizildasturchi.uz/image${item.image}`
                }
                alt={item.name}
                className="cart-item-image"
              />

              <div className="cart-item-details">
                <span className="cart-item-name">{item.name}</span> {'  '}
                {item.count} dona - {item.price * item.count} so'm
              </div>
              <button onClick={() => decreaseCount(item.id)}>-</button>
              <button onClick={() => increaseCount(item.id)}>+</button>
            </li>
          ))}
        </ul>
      )}

      {cartItems.length === 0 ? (
        <div className="">
          <button onClick={() => navigate('/')}>Bosh sahifaga qaytish!</button>
          <button onClick={() => navigate('/buyurtmalar')}>
            Buyurtmalarni ko'rish!
          </button>
        </div>
      ) : (
        <div className="div">
          <h4>Jami summa: {calculateTotalSum(cartItems)} </h4>
          <button onClick={handlePurchase} disabled={loading}>
            {loading ? 'Yuborilmoqda...' : 'Sotib olish'}
          </button>
        </div>
      )}
    </div>
  )
}

export default Savatcha
