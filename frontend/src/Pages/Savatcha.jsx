import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom' // useNavigate for redirection
import './Css/Savatcha.css'

function Savatcha() {
  const [cartItems, setCartItems] = useState([])
  const [userId, setUserId] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate() // Use useNavigate for navigation

  useEffect(() => {
    // Retrieve the user token from localStorage or session
    const userToken = localStorage.getItem('userToken')

    // If the userToken is false or not available, redirect to '/hisobim'
    if (!userToken) {
      navigate('/hisobim')
    } else {
      // Optionally, set userId if needed
      const savedUserId = localStorage.getItem('userId')
      const savedUserToken = localStorage.getItem('userToken')
      if (savedUserId) {
        setUserId(savedUserId)
      }
    }

    // Retrieve cart data from localStorage
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
  }, [navigate]) // Dependency on navigate to trigger redirection

  const handlePurchase = async () => {
    setLoading(true)

    try {
      const orderData = cartItems.map((item) => ({
        product_id: item.id,
        count: item.count,
      }))
      const userToken = localStorage.getItem('userToken')
      const userId = localStorage.getItem('userId')
      console.log(userId)
      console.log(orderData)
      console.log(userToken)
      const response = await fetch('https://qizildasturchi.uz/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Ensure the server knows the content is JSON
          authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          user_id: userId,
          products: orderData,
        }),
      })
      console.log(response.data)
      const result = await response.json()
      if (result.success) {
        // If the order is successful, clear the cart and redirect to the orders page
        localStorage.removeItem('cart')
        setCartItems([])
        alert('Sotib olish muvaffaqiyatli amalga oshirildi!')
        navigate('/orders') // Navigate to /orders page after successful order
      } else {
        alert('Sotib olishda xato yuz berdi!')
      }
    } catch (error) {
      console.error('Error placing order:', error)
      alert("Tarmoq xatosi! Iltimos, qaytadan urinib ko'ring.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>Savatcha</h2>
      {cartItems.length === 0 ? (
        <p>Savatchangiz bo'sh.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} - {item.count} dona - {item.price * item.count} so'm
            </li>
          ))}
        </ul>
      )}
      <button onClick={handlePurchase} disabled={loading}>
        {loading ? 'Yuborilmoqda...' : 'Sotib olish'}
      </button>
    </div>
  )
}

export default Savatcha
